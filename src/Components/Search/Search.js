import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { useCart } from "../../Context/CartContex";

const Search = ({ setSearchText }) => {
  // const searchRef = useRef();
  const [value, setValue] = useState("");

  const { getProductsByName } = useCart();

  useEffect(() => {
    // console.log("Searched text: ", value);
    setSearchText(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSearchText(searchRef.current.value);
    // getProductsByName(value);
    // setSearchText(value);
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.search_input}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
};

export { Search };
