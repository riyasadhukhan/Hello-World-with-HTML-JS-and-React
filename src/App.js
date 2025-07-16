import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import FoodCardList from "./components/FoodCardList";

const App = () => {
  return (
    <>
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<RouterProvider router={router} />);
