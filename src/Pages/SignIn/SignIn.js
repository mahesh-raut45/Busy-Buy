import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUser } from "../../Context/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser, setCurrUserData } = useUser();

  // sign in with creds and if success, navigate to home page
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCreds = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      // Retrive info from firebase
      const user = userCreds.user;
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const loggedUserData = userDoc.data();
        setCurrUserData(loggedUserData);
        console.log("Looged user Name: ", loggedUserData.firstName);
      } else {
        console.log("No userdata found in database");
      }

      // setting logged-in user in Context
      setCurrentUser(userCreds.user);
      toast.success("User Logged In successfully!", {
        position: "top-right",
      });

      navigate("/");
    } catch (error) {
      console.log(error.message);

      toast.error(`Failed to login user!, ${error.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.login_title}>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email..."
          onChange={(e) =>
            setUserData({ email: e.target.value, password: userData.password })
          }
          className={styles.login_input}
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password..."
          onChange={(e) =>
            setUserData({ email: userData.email, password: e.target.value })
          }
          className={styles.login_input}
        />
        <p
          className={styles.show_Password}
          onClick={() => setShowPassword((showPassword = !showPassword))}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </p>
        <button className={styles.login_btn}>Sign In</button>
        <Link to="/signUp" className={styles.link}>
          <p> Or SignUp instead</p>
        </Link>
      </form>
    </div>
  );
};

export { SignIn };
