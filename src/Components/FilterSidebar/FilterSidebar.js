import { useState } from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ setRange, setCategories, categories }) => {
  const [value, setValue] = useState(99991);
  const [mens, setMens] = useState(false);
  const [womens, setWomens] = useState(false);
  const [jewelery, setJewelery] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories({
      mens: mens ? "Men's Clothing" : "",
      womens: womens ? "Women's Clothing" : "",
      jewelery: jewelery ? "Jewelery" : "",
      electronics: electronics ? "Electronics" : "",
    });
    setRange(value);
    // console.log("setCategories :", categories);
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={styles.toggle_btn}
      >
        {isSidebarOpen ? "Close Filters" : "Open Filters"}
      </button>
      <aside
        className={`${styles.filter_caintainer} ${
          isSidebarOpen ? styles.active : ""
        }`}
      >
        <h2>Filter</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="price"> Price: {value}</label>
          <input
            type="range"
            id="price"
            name="price"
            min={1}
            max={100000}
            value={value}
            className={styles.price_range}
            onChange={(e) => setValue(e.target.value)}
          />
          <h2>Category</h2>
          <div className={styles.category_container}>
            <div>
              <input
                type="checkbox"
                id="mensFashion"
                name="mensFashion"
                // ref={mensRef}
                onChange={(e) => setMens(e.target.checked)}
              />
              <label htmlFor="mensFashion">Men's Clothing</label>
            </div>
            <div>
              <input
                // ref={womensRef}
                type="checkbox"
                id="womensFashion"
                name="womensFashion"
                onChange={(e) => setWomens(e.target.checked)}
              />
              <label htmlFor="womensFashion">Women's Clothing</label>
            </div>
            <div>
              <input
                // ref={jeweleryRef}
                type="checkbox"
                id="jewelery"
                name="jewelery"
                onChange={(e) => setJewelery(e.target.checked)}
              />
              <label htmlFor="jewelery">Jewelery</label>
            </div>
            <div>
              <input
                // ref={electronicsRef}
                type="checkbox"
                id="electronics"
                name="electronics"
                onChange={(e) => setElectronics(e.target.checked)}
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
          <button className={styles.filter_btn}>Apply</button>
        </form>
      </aside>
    </>
  );
};

export { FilterSidebar };
