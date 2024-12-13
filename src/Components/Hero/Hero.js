import { useEffect, useState } from "react";
import { Card } from "../Card/ProdCard";
import { FilterSidebar } from "../FilterSidebar/FilterSidebar";
import { Search } from "../Search/Search";
import styles from "./Hero.module.css";
import { GridLoader } from "react-spinners";
import { useUser } from "../../Context/UserContext";
import { useCart } from "../../Context/CartContex";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const [range, setRange] = useState(99991);
  const [categories, setCategories] = useState({
    mens: "off",
    womens: "off",
    jewelery: "off",
    electronics: "off",
  });
  const { currentUser } = useUser();
  const { handleCart, fetchProducts, products, loading } = useCart();

  // console.log("Logged-in User: ", currentUser.email);

  // fetching products list on rendering.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter fetched products based on search
  const searchedProd = searchText.trim()
    ? products.filter((prod) =>
        prod.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : products; // Show all products when the search field is empty

  return (
    <>
      <p>{currentUser ? `Welcome ${currentUser.email}!` : "Please Login"}</p>
      <Search setSearchText={setSearchText} />
      <FilterSidebar
        setRange={setRange}
        categories={categories}
        setCategories={setCategories}
      />

      <div className={styles.prod_grid}>
        {searchedProd.length > 0
          ? searchedProd.map((item, index) => (
              <Card
                key={index}
                item={item}
                img={item.src}
                name={item.name}
                price={item.price}
                handleCart={handleCart}
                // isInCart={isInCart}
              />
            ))
          : // <p>Product not found</p>
            loading && <GridLoader color="#776be6" />}
      </div>
    </>
  );
};

export { Hero };
