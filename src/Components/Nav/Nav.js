import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import homeLogo from "../../Data/Logo/home.png";
import singIn from "../../Data/Logo/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faShoppingBag,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons"; // Replace 'faIconName' with the icon you're using
import { useUser } from "../../Context/UserContext";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContex";

const Nav = () => {
  // let [userDetails, setUserDetails] = useState(false);
  const { currentUser, currUserData, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log("Current User", currentUser);
  // console.log("User Details", userDetails);

  // signOut
  const logOut = async () => {
    try {
      await signOut(auth);
      // setting current user to null
      setCurrentUser(null);
      navigate("/");

      toast.success("User has been logged out successfully.", {
        position: "top-right",
      });
      console.log("User has been logged out successfully.");
    } catch (error) {
      toast.error("Failed to logout user", {
        position: "top-right",
      });
      console.log("Failed to logout user", error.message);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <Link to="/" className={styles.navbar_logo}>
            <h1>Busy Buy</h1>
          </Link>
          <ul className={styles.nav_menu}>
            <li className={styles.nav_item}>
              <Link to="/" className={styles.nav_links}>
                <span>
                  <img
                    className={styles.icon_styles}
                    src={homeLogo}
                    alt="home logo"
                  />
                </span>
                Home
              </Link>
            </li>
            {/* Remove if user signed in */}
            {!currentUser && (
              <li className={styles.nav_item}>
                <Link to="/signIn" className={styles.nav_links}>
                  <span>
                    <img
                      className={styles.icon_styles}
                      src={singIn}
                      alt="sign in"
                    />
                  </span>
                  {currentUser ? "Logout" : "SignIn"}
                </Link>
              </li>
            )}
            {/* dipslay only if user logged in */}
            {currentUser && (
              <>
                <li
                  className={`${styles.nav_item} ${styles.user} `}
                  // onClick={() => setUserDetails((userDetails = !userDetails))}
                >
                  <span>
                    <FontAwesomeIcon
                      className={styles.icon_styles}
                      icon={faUser}
                      style={{ color: "#B197FC" }}
                    />
                  </span>
                  {currUserData.firstName}

                  {/* {userDetails ? ( */}
                  <div>
                    <ul className={styles.cart_and_orders}>
                      <li>
                        <Link
                          to={`/userCart/${
                            currentUser ? currentUser.uid : "userId"
                          }/myCart`}
                          className={styles.nav_links}
                        >
                          <span>
                            {/* <img className={styles.icon_styles} src={singIn} /> */}
                            <FontAwesomeIcon
                              className={styles.cart_and_orders_icon}
                              icon={faShoppingCart}
                              style={{ color: "#B197FC" }}
                            />
                          </span>
                          Cart
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`userOrders/${
                            currentUser ? currentUser.uid : "userId"
                          }/orders`}
                          className={styles.nav_links}
                        >
                          <span>
                            {/* <img className={styles.icon_styles} src={singIn} /> */}
                            <FontAwesomeIcon
                              className={styles.cart_and_orders_icon}
                              icon={faShoppingBag}
                              style={{ color: "#B197FC" }}
                            />
                          </span>
                          Orders
                        </Link>
                      </li>
                      <li className={styles.nav_links} onClick={logOut}>
                        <span>
                          {/* <img className={styles.icon_styles} src={singIn} /> */}
                          <FontAwesomeIcon
                            className={styles.cart_and_orders_icon}
                            icon={faSignOut}
                            style={{ color: "#B197FC" }}
                          />
                        </span>
                        Logout
                      </li>
                    </ul>
                  </div>
                  {/* ) : null} */}
                </li>
                {/* */}
              </>
            )}
            <li>
              <button className={styles.nav_links} onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export { Nav };
