import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import MenuHeroSection from "./components/MenuHeroSection";
import FoodCardList from "./components/FoodCardList";
import DeliveryPartner from "./components/DeliveryPartner";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <MenuHeroSection />
      <FoodCardList />
      <DeliveryPartner />
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<App />);
