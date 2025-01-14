import { useEffect, useState } from "react";
import styles from "./CheckoutPge.module.css";
import { countryData } from "../../Data/CountryData/CountryData";

const CheckoutPage = () => {
  //   useEffect(() => {
  //   setCountries(countryData);
  //   }, []);

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
                <select className={styles.country_code}>
                  <option selected>+1</option>
                  {countryData.map((country, index) => (
                    <option key={index}>{country.code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="425 151 2318"
                  style={{ paddingLeft: "77px", width: "136%" }}
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
            <h3>Review your cart</h3>
            <div className={styles.cart_container}>
              {/* show cart items here */}
              <p>Cart items will be here</p>
            </div>
            <div className={styles.disc_code}>
              {/* disc icon */}
              <p className={styles.gray_text}>Discount Code</p>
              <button>Apply</button>
            </div>
            <div className={styles.total}>total: 100</div>
            <button className={styles.pay_btn}>Pay Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CheckoutPage };
