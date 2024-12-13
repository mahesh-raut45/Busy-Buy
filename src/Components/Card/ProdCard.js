import styles from "./ProdCard.module.css";
import { useCart } from "../../Context/CartContex";

const Card = ({ item, name, img, price }) => {
  // console.log("Item: ", item);
  const { handleCart, handleCartDecrement } = useCart();
  return (
    <>
      <div className={styles.product_container}>
        <div className={styles.image_container}>
          <img src={img} alt="Product" width="100%" height="100%" />
        </div>
        <div className={styles.prod_details}>
          <div className={styles.prod_name}>
            <p>{name}</p>
          </div>
          <div className={styles.prod_price}>
            <p>₹{price}</p>
          </div>
          {item.isInCart ? (
            <div className={styles.btn_pair}>
              <button
                className={styles.add_btn}
                onClick={() => handleCart(item)}
              >
                +
              </button>
              <button
                className={styles.add_btn}
                onClick={() => handleCartDecrement(item)}
              >
                -
              </button>
            </div>
          ) : (
            <button className={styles.add_btn} onClick={() => handleCart(item)}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export { Card };
