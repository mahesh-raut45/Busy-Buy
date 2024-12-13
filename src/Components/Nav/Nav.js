import { Link, Outlet } from "react-router-dom";
import styles from "./Nav.module.css";
import homeLogo from "../../Data/Logo/home.png";
import singIn from "../../Data/Logo/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons"; // Replace 'faIconName' with the icon you're using
import { useUser } from "../../Context/UserContext";

const Nav = () => {
  const { currentUser } = useUser();
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
            <li className={styles.nav_item}>
              <Link
                to={`/userCart/${
                  currentUser ? currentUser.uid : "userId"
                }/myCart`}
                className={styles.nav_links}
              >
                <span>
                  {/* <img className={styles.icon_styles} src={singIn} /> */}
                  <FontAwesomeIcon
                    className={styles.icon_styles}
                    icon={faShoppingCart}
                    style={{ color: "#B197FC" }}
                  />
                </span>
                Cart
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to={`userOrders/${
                  currentUser ? currentUser.uid : "userId"
                }/orders`}
                className={styles.nav_links}
              >
                <span>
                  {/* <img className={styles.icon_styles} src={singIn} /> */}
                  <FontAwesomeIcon
                    className={styles.icon_styles}
                    icon={faShoppingBag}
                    style={{ color: "#B197FC" }}
                  />
                </span>
                Orders
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
