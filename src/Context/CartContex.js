import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { useUser } from "./UserContext";
import { db } from "../firebase";
import { toast } from "react-toastify";

const CartContext = createContext();

// Custom Hook
function useCart() {
  const cart = useContext(CartContext);
  return cart;
}

// for cart realted functions

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { currentUser } = useUser();

  //  Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsCollection = collection(db, "Products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Products:", productList);
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // fetch products by name
  const getProductsByName = async (name) => {
    const q = query(collection(db, "Products"), where("name", "==", name));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  //  adding cart items to firebase
  const addToCartInFirebase = async (userId, product) => {
    try {
      const userDocRef = doc(db, "carts", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // fetch the current cart
        const userCart = userDocSnap.data().userCart;

        // check if the product is exists already
        const existingproductIndex = userCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingproductIndex !== -1) {
          // update existing product qty by 1
          userCart[existingproductIndex].qty += 1;
          userCart[existingproductIndex].isInCart = true;
          userCart[existingproductIndex].date = Date();
        } else {
          //  add new product with qty 1
          userCart.push({ ...product, qty: 1, isInCart: true, date: Date() });
        }

        // update the cart
        await updateDoc(userDocRef, { userCart });
      } else {
        // if document do not exists, create it and initialize it
        await setDoc(userDocRef, {
          userCart: [{ ...product, qty: 1, isInCart: true, date: Date() }],
        });
      }

      //  Fetch updated cart
      const updatedSnap = await getDoc(userDocRef);
      return updatedSnap.data().userCart;
    } catch (error) {
      console.error("Error adding product to cart in Firebase:", error);
      throw error;
    }
  };

  // handle cart increment
  const handleCart = async (prod) => {
    // console.log("Cart item: ", prod);
    // chek if user is looged-in or not
    if (currentUser) {
      try {
        const updatedCart = await addToCartInFirebase(currentUser.uid, prod);
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }

      // find the prod present inside cart or not
      const index =
        cartItems && cartItems.findIndex((item) => item.id === prod.id);
      // prod.isInCart = true;

      const fetchProdId = products.findIndex((item) => item.id === prod.id);
      //   console.log("fetch Prod Id: ", fetchProdId);
      products[fetchProdId].isInCart = true;

      if (index === -1) {
        // id not present the add property qty to 1
        setCartItems([...cartItems, { ...prod, qty: 1 }]);
        // setIsInCart(true);
      } else {
        cartItems && cartItems[index].qty++;
      }
    } else {
      //   alert("Please login first!");
      toast.warning("Please login first!", {
        position: "top-center",
      });
    }
    console.log("Cart Items: ", cartItems);
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;
      const userDocRef = doc(db, "carts", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setCartItems(userDocSnap.data().userCart);
      } else {
        console.log("No cart data found for this user.");
      }
    };

    fetchCart();
  }, [currentUser]);

  //handle cart decrement
  const handleCartDecrement = async (prod) => {
    const index = cartItems.findIndex((item) => item.id === prod.id);

    const fetchProdId = products.findIndex((item) => item.id === prod.id);
    // console.log("fetch Prod Id: ", fetchProdId);
    products[fetchProdId].isInCart = false;
    cartItems[index].qty--;
  };

  //Removing single cart item
  const handleClear = async (prod) => {
    console.log("clear prod: ", prod);

    try {
      const userDocRef = doc(db, "carts", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // fecth current cart
        const userCart = userDocSnap.data().userCart;

        // find product index in userCart
        const existingproductIndex = userCart.findIndex(
          (item) => item.id === prod.id
        );

        // check if product exists
        if (existingproductIndex !== -1) {
          // update qty to 0, isInCart = false
          userCart[existingproductIndex].qty = 0;
          userCart[existingproductIndex].isInCart = false;

          // remove the product from cart
          userCart.splice(existingproductIndex, 1);
          console.log("userCart ", userCart);
        } else {
          console.log("Product does not exists in userCart: ", prod);
        }

        // update the cart
        await updateDoc(userDocRef, { userCart });
      }

      //   fetch updated cart
      const updatedSnap = await getDoc(userDocRef);
      const updatedCart = updatedSnap.data().userCart;
      setCartItems(updatedCart);
    } catch (error) {
      console.log("Error in removing product form cart firebase: ", error);
    }
  };

  // handle onPurchase
  // create collection of orders for the usrid
  // add provided cart items to order collection
  const handlePurchase = async (purchasedItems, totalAmount) => {
    try {
      const userDocRef = doc(db, "Orders", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        // fetch the current order
        const userOrder = userDocSnap.data().userOrder;

        // push all the purchased item in userOrder
        userOrder.push(...purchasedItems);
        // update the order
        await updateDoc(userDocRef, { userOrder });

        // clear the cart items.
        const userCartDocRef = doc(db, "carts", currentUser.uid);
        const userCartDocSnap = await getDoc(userCartDocRef);
        console.log(userCartDocSnap.data().userCart);

        // pass each product to handleClear(prod)
        const userCart = userCartDocSnap.data().userCart;
        // clearCartItems(currentUser.uid);
        // userCart.map((prod) => {
        //   handleClear(prod);

        // });

        userCart.length = 0;
        // update the cart
        const updatedCart = await updateDoc(userCartDocRef, { userCart });
        setCartItems(updatedCart);
      } else {
        // if doc doesn't exists, create it
        await setDoc(userDocRef, { userOrder: purchasedItems });
      }
    } catch (error) {
      console.error("Error adding purchased products in Firebase:", error);
      throw error;
    }
    toast.success(
      `Order placed successfully! The amount is ${totalAmount} only. `
    );
  };

  // const clearCartItems = async (userId) => {
  //   try {
  //     const db = getFirestore();
  //     const userCartDoc = doc(db, "carts", userId);
  //     await deleteDoc(userCartDoc);
  //     console.log(`Cart removed for user:  ${userId}`);
  //   } catch (error) {
  //     console.log("Error while removing cart for ", userId);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        handleCart,
        handleCartDecrement,
        handleClear,
        fetchProducts,
        handlePurchase,
        getProductsByName,

        products,
        cartItems,
        loading,
        setOrders,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
