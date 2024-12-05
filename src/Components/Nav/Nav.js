import { Link, Outlet } from "react-router-dom";
import styles from "./Nav.module.css";
import homeLogo from "../../Data/Logo/home.png";
import singIn from "../../Data/Logo/login.png";

const Nav = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <Link to="/" className={styles.navbar_logo}>
            Busy Buy
          </Link>
          <ul className={styles.nav_menu}>
            <li className={styles.nav_item}>
              <Link to="/" className={styles.nav_links}>
                <span>
                  <img className={styles.icon_styles} src={homeLogo} />
                </span>
                Home
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link to="/signIn" className={styles.nav_links}>
                <span>
                  <img className={styles.icon_styles} src={singIn} />
                </span>
                SignIn
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export { Nav };
