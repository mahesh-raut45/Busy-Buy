import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Nav } from "./Components/Nav/Nav";
import { SignIn } from "./Pages/SignIn/SignIn";
import Page404 from "./Pages/Page404";
import { Hero } from "./Components/Hero/Hero";
import { SignUp } from "./Pages/SignUp/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Hero /> },
        { path: "/signIn", element: <SignIn /> },
        { path: "/signUp", element: <SignUp /> },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
