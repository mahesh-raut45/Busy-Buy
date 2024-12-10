import React, { useState, useEffect } from "react";
import styles from "./CartPage.module.css";

const CartPage = ({ cartItems, handleClear }) => {
  // console.log(cartItems);
  const [grandTotal, setGrandTotal] = useState(0);

  // Calculate the grand total whenever the cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setGrandTotal(total);
  }, [cartItems]);

  //   const handlePurchase = () => {
  //     alert("Purchase Successful!");
  //     onPurchase(); // Clear the cart or take any purchase-related actions
  //   };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.heading}>Your Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
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
            <button className={styles.purchaseButton}>Purchase</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
