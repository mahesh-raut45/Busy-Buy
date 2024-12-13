import { useEffect } from "react";
import { useCart } from "../../Context/CartContex";
import styles from "./Orders.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "../../Context/UserContext";

const OrdersPage = () => {
  const { orders, setOrders } = useCart();
  const { currentUser } = useUser();

  const getOrders = async () => {
    setOrders([]);
    const userDocRef = doc(db, "Orders", currentUser.uid);
    const orderSnap = await getDoc(userDocRef);
    setOrders(orderSnap.data().userOrder);
  };

  useEffect(() => {
    if (currentUser) {
      getOrders();
    }
  }, []);

  console.log("Orders: ", orders);
  return (
    <>
      <h1 className={styles.heading}>My Orders</h1>
      <div className={styles.container}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h2>Order ID: {order.id}</h2>
              <p className={styles.orderDate}>
                Order Date:{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className={styles.itemsContainer}>
              {/* {order.items.map((item, index) => ( */}
              <div className={styles.itemCard}>
                <img
                  src={order.src}
                  alt={order.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{order.name}</h3>
                  <p className={styles.itemPrice}>Price: ₹{order.price}</p>
                  <p className={styles.itemQty}>Quantity: {order.qty}</p>
                  <p className={styles.itemSubtotal}>
                    Subtotal: ₹{order.price * order.qty}
                  </p>
                </div>
              </div>
              {/* ))} */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;
