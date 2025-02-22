import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Nav } from "./Components/Nav/Nav";
import { SignIn } from "./Pages/SignIn/SignIn";
import Page404 from "./Pages/Page404";
import { Hero } from "./Components/Hero/Hero";
import { SignUp } from "./Pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "./Components/Cart/CartPage";
import { UserProvider } from "./Context/UserContext";
import { CartProvider } from "./Context/CartContex";
import OrdersPage from "./Components/Cart/Orders";
import { CheckoutPage } from "./Components/Cart/CheckoutPage";
import { ThemeProvider } from "./Context/ThemeContex";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <Hero />,
        },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
        { path: "/userCart/:userId/myCart", element: <CartPage /> },
        { path: "/checkout", element: <CheckoutPage /> },
        { path: "userOrders/:userId/orders", element: <OrdersPage /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <div className="App">
        <ThemeProvider>
          <UserProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
