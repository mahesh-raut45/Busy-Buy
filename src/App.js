import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Nav } from "./Components/Nav/Nav";
import { SignIn } from "./Pages/SignIn/SignIn";
import Page404 from "./Pages/Page404";
import { Hero } from "./Components/Hero/Hero";
import { SignUp } from "./Pages/SignUp/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./Components/Cart/CartPage";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  //  Fetch Products
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "Products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Products:", productList);
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // handle cart
  const handleCart = (prod) => {
    console.log("Cart item: ", prod);
    // find the prod present inside cart or not
    const index = cartItems.findIndex((item) => item.id === prod.id);
    // prod.isInCart = true;

    const fetchProdId = products.findIndex((item) => item.id === prod.id);
    console.log("fetch Prod Id: ", fetchProdId);
    products[fetchProdId].isInCart = true;

    if (index === -1) {
      // id not present the add property qty to 1
      setCartItems([...cartItems, { ...prod, qty: 1 }]);
      // setIsInCart(true);
    } else {
      cartItems[index].qty++;
    }
    console.log("Cart Items: ", cartItems);
  };

  // handle Clear
  const handleClear = (prod) => {
    console.log("clear prod: ", prod);
    // clearing the item fron cart
    const updatedCart = cartItems.filter((item) => item.id !== prod.id);

    const fetchProdId = products.findIndex((item) => item.id === prod.id);
    console.log("fetch Prod Id: ", fetchProdId);
    products[fetchProdId].isInCart = false;

    setCartItems(updatedCart);
    console.log(cartItems);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        // { index: true, element: <Search /> },
        {
          index: true,
          element: (
            <Hero
              handleCart={handleCart}
              fetchProducts={fetchProducts}
              products={products}
            />
          ),
        },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        {
          path: "/cartPage",
          element: <CartPage cartItems={cartItems} handleClear={handleClear} />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
