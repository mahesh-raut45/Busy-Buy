import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        <h2 className={styles.login_title}>Sign Up</h2>
        <input
          type="name"
          name="name"
          placeholder="Enter name..."
          className={styles.login_input}
        />
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
        <button className={styles.login_btn}>Sign Up</button>
        {/* <Link to="/" className={styles.link}>
          <p> Or SignUp instead</p>
        </Link> */}
      </form>
    </div>
  );
};

export { SignUp };
