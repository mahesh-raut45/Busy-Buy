import styles from "./ProdCard.module.css";

const Card = ({ item, name, img, price, handleCart }) => {
  // console.log("Item: ", item);
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
            <p>{price}</p>
          </div>
          {item.isInCart ? (
            <div className={styles.btn_pair}>
              <button
                className={styles.add_btn}
                onClick={() => handleCart(item)}
              >
                +
              </button>
              <button className={styles.add_btn}>-</button>
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
