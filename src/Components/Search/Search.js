import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ setSearchText }) => {
  // const searchRef = useRef();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSearchText(searchRef.current.value);
    setSearchText(value);
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
