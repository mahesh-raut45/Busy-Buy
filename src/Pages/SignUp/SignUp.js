import styles from "./SignUp.module.css";
import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   "Name: ",
    //   nameRef.current.value,
    //   " ",
    //   "Email: ",
    //   emailRef.current.value,
    //   " ",
    //   "Password: ",
    //   passwordRef.current.value
    // );

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fistName: nameRef.current.value,
          password: passwordRef.current.value,
        });
      }
      toast.success("User Registered Successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log("Error: ", error.message);
      toast.error(`Failed to register! ${error.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.login_title}>Sign Up</h2>
        <input
          type="name"
          name="name"
          placeholder="Enter name..."
          ref={nameRef}
          className={styles.login_input}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email..."
          ref={emailRef}
          className={styles.login_input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password..."
          ref={passwordRef}
          className={styles.login_input}
        />
        <button className={styles.login_btn}>Sign Up</button>
        {/* <Link to="/" className={styles.link}>
          <p> Or SignUp instead</p>
        </Link> */}
      </form>
    </div>
  );
};

export { SignUp };
