import { useEffect, useState } from "react";
import styles from "./CheckoutPge.module.css";
import { countryData } from "../../Data/CountryData/CountryData";
import { Products } from "../../Data/ProductsData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { useCart } from "../../Context/CartContex";

const CheckoutPage = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { cartItems, handlePurchase } = useCart();
  const shippingCharge = 60;

  useEffect(() => {
    if (cartItems.length > 0) {
      // setting discount for more than 2 products
      if (cartItems.length > 2) {
        setDiscount(100);
      }
      // calculating subtotal
      const total = cartItems.reduce((acc, item) => {
        console.log("acc: ", acc, " price: ", item.price, " qty: ", item.qty);
        return acc + item.price * item.qty;
      }, 0);
      setSubTotal(total);
    }
  }, [cartItems]);

  useEffect(() => {
    // Calculate grandTotal when subTotal, discount, or shippingCharge changes
    setGrandTotal(subTotal + shippingCharge - discount);
  }, [subTotal, discount]);

  return (
    <>
      <div className={styles.checkout_page}>
        <div className={styles.left_container}>
          <div className={styles.container}>
            <h1 className={styles.heading}>Checkout</h1>
            <h4 className={styles.small_heading}>Shipping Information</h4>
            <form className={styles.shipping_form}>
              <div className={styles.inputs}>
                <label htmlFor="name" className={styles.labels}>
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g John Snow"
                  required
                />
              </div>

              <div className={styles.inputs}>
                <label htmlFor="email" className={styles.labels}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g John@gamil.com"
                  required
                />
              </div>

              <div className={styles.inputs}>
                <label htmlFor="number" className={styles.labels}>
                  Number
                </label>
                {/* <select className={styles.country_code}>
                  <option selected>+1</option>
                  {countryData.map((country, index) => (
                    <option key={index}>{country.code}</option>
                  ))}
                </select> */}
                <input
                  type="tel"
                  placeholder="425 151 2318"
                  // style={{ , width: "136%" }}
                />
              </div>

              <div className={styles.inputs}>
                <label htmlFor="country" className={styles.labels}>
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className={styles.country_name}
                >
                  <option selected>India</option>
                  {countryData.map((country, index) => (
                    <option key={index}>{country.country}</option>
                  ))}
                </select>
              </div>

              <div className={styles.state_city_pincode}>
                <div className={styles.small_inputs}>
                  <label htmlFor="city" className={styles.labels}>
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Enter city"
                    className={styles.small_input}
                    required
                  />
                </div>
                <div className={styles.small_inputs}>
                  <label htmlFor="state" className={styles.labels}>
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="Enter state"
                    className={styles.small_input}
                    required
                  />
                </div>

                <div className={styles.small_inputs}>
                  <label htmlFor="pin" className={styles.labels}>
                    Zip code
                  </label>
                  <input
                    id="pin"
                    type="number"
                    placeholder="zip code"
                    className={styles.small_input}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.container}>
            <h4 className={styles.small_heading}>Review your cart</h4>
            <div className={styles.cart_container}>
              {/* show cart items here */}
              {cartItems.map((item, index) => (
                <div className={styles.product_card} key={index}>
                  <div className={styles.card_left}>
                    <img src={item.src} alt="prod img" />
                  </div>
                  <div className={styles.card_right}>
                    <p>{item.name}</p>
                    <p
                      style={{
                        fontSize: "small",
                        color: "lightgrey",
                        fontWeight: "600",
                      }}
                    >
                      {item.qty}
                    </p>
                    <p>₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.disc_code}>
              {/* disc icon */}
              <div
                style={{
                  gap: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <FontAwesomeIcon
                  icon={faTicket}
                  color="lightgrey"
                  width={"20px"}
                />
                <p className={styles.gray_text}>Discount Code</p>
              </div>
              <button className={styles.apply_btn}>Apply</button>
            </div>
            <div className={styles.total}>
              <p className={styles.subTotal_container}>
                <span className={styles.color_gray}>Subtotal</span>{" "}
                <span>₹{subTotal}</span>
              </p>
              <p className={styles.subTotal_container}>
                <span className={styles.color_gray}>Shipping</span>{" "}
                <span>₹{shippingCharge}</span>
              </p>
              <p className={styles.subTotal_container}>
                <span className={styles.color_gray}>Discount</span>{" "}
                <span>₹{discount}</span>
              </p>
              <p className={styles.subTotal_container}>
                <span>Toatal</span> <span>₹{grandTotal}</span>
              </p>
            </div>

            <button
              className={styles.pay_btn}
              onClick={() => handlePurchase(cartItems, grandTotal)}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CheckoutPage };
