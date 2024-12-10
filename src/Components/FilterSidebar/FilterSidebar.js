import { useEffect, useRef, useState } from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ setRange, setCategories, categories }) => {
  const [value, setValue] = useState(99991);
  const mensRef = useRef();
  const womensRef = useRef();
  const jeweleryRef = useRef();
  const electronicsRef = useRef();

  //   set the range agter the value(range) is changed
  useEffect(() => {
    setRange(value);
    // setCategories({
    //   mens: mensRef.current.value,
    //   womens: womensRef.current.value,
    //   jewelery: jeweleryRef.current.value,
    //   electronics: electronicsRef.current.value,
    // });
  }, [value]);

  return (
    <>
      <aside className={styles.filter_caintainer}>
        <h2>Filter</h2>
        <form>
          <label htmlFor="price"> Price: {value}</label>
          <input
            type="range"
            id="price"
            name="price"
            min="1"
            max="100000"
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
                ref={mensRef}
                onChange={(e) =>
                  setCategories({
                    mens: e.target.value,
                    womens: categories.womens,
                    jewelery: categories.jewelery,
                    electronics: categories.electronics,
                  })
                }
              />
              <label for="mensFashion">Men's Clothing</label>
            </div>
            <div>
              <input
                ref={womensRef}
                type="checkbox"
                id="womensFashion"
                name="womensFashion"
                onChange={(e) =>
                  setCategories({
                    mens: categories.mens,
                    womens: e.target.value,
                    jewelery: categories.jewelery,
                    electronics: categories.electronics,
                  })
                }
              />
              <label for="womensFashion">Women''s Clothing</label>
            </div>
            <div>
              <input
                ref={jeweleryRef}
                type="checkbox"
                id="jewelery"
                name="jewelery"
                onChange={(e) =>
                  setCategories({
                    mens: categories.mens,
                    womens: categories.womens,
                    jewelery: e.target.value,
                    electronics: categories.electronics,
                  })
                }
              />
              <label for="jewelery">Jewelery</label>
            </div>
            <div>
              <input
                ref={electronicsRef}
                type="checkbox"
                id="electronics"
                name="electronics"
                onChange={(e) =>
                  setCategories({
                    mens: categories.mens,
                    womens: categories.womens,
                    jewelery: categories.jewelery,
                    electronics: e.target.value,
                  })
                }
              />
              <label for="electronics">Electronics</label>
            </div>
          </div>
        </form>
      </aside>
    </>
  );
};

export { FilterSidebar };
