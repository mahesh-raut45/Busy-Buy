import React, { useState, useEffect } from "react";
import styles from "./CartPage.module.css";
import { useCart } from "../../Context/CartContex";
import { Link } from "react-router-dom";

const CartPage = () => {
  // console.log(cartItems);
  const [grandTotal, setGrandTotal] = useState(0);
  const { cartItems, handleClear, handlePurchase } = useCart();

  // Calculate the grand total whenever the cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => {
        console.log("acc: ", acc, " price: ", item.price, " qty: ", item.qty);
        return acc + item.price * item.qty;
      }, 0);
      setGrandTotal(total);
    }
  }, [cartItems]);

  // const handlePurchase = () => {
  //   alert(`Purchase Successful! ${grandTotal}`);
  //   // onPurchase(); // Clear the cart or take any purchase-related actions
  // };

  // console.log("cartItems in CarPage: ", cartItems);
  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>My Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                {console.log("Rendering cart item:", item)}
                <div className={styles.image}>
                  <img src={item.src} alt={item.name} />
                </div>
                <div className={styles.details}>
                  <p>{item.name}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.qty}</p>
                  <p>Subtotal: ₹{item.price * item.qty}</p>
                </div>
                <div className={styles.clr_btn}>
                  <button onClick={() => handleClear(item)}>Clear</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <h2>Grand Total: ₹{grandTotal}</h2>
            <Link to={`/checkout`}>
              <button
                className={styles.purchaseButton}
                // onClick={() => handlePurchase(cartItems, grandTotal)}
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <p>Please add products in cart!</p>
      )}
    </div>
  );
};

export default CartPage;
