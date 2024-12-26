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
    mens: "",
    womens: "",
    jewelery: "",
    electronics: "",
  });
  const { currentUser } = useUser();
  const { handleCart, fetchProducts, products, loading } = useCart();

  console.log("range: ", range);

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

  // filter items according to category
  const category = products.filter(
    (item) =>
      categories.mens === item.category ||
      categories.womens === item.category ||
      categories.jewelery === item.category ||
      categories.electronics === item.category
  );
  // console.log("category: ", category);
  console.log(typeof range);
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
        {/* If category selected  */}
        {category.length > 0
          ? category.map((item, index) =>
              // filtering based on price range
              item.price <= range ? (
                <Card
                  key={index}
                  item={item}
                  img={item.src}
                  name={item.name}
                  price={item.price}
                  handleCart={handleCart}
                />
              ) : null
            )
          : // otherwise searched products
          searchedProd.length > 0
          ? searchedProd.map((item, index) =>
              // filtering based on price range
              item.price <= range ? (
                <Card
                  key={index}
                  item={item}
                  img={item.src}
                  name={item.name}
                  price={item.price}
                  handleCart={handleCart}
                />
              ) : null
            )
          : loading && (
              <div className={styles.loader}>
                <GridLoader color="#776be6" />
              </div>
            )}
      </div>
    </>
  );
};

export { Hero };
