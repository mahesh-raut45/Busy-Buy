import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h2 className={styles.login_title}>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email..."
          className={styles.login_input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password..."
          className={styles.login_input}
        />
        <button className={styles.login_btn}>Sign In</button>
        <Link to="/signUp" className={styles.link}>
          <p> Or SignUp instead</p>
        </Link>
      </form>
    </div>
  );
};

export { SignIn };
