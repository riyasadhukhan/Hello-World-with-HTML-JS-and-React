import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import FoodCardList from "./components/FoodCardList";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FoodCardList />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "restaurants/:resId",
        element: <Menu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<RouterProvider router={router} />);
