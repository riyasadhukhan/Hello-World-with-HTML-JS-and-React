import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <>
      <TopHeader />
      <div className="header-container">
        <div className="logo-container">
          <img
            className="logo"
            alt="logo"
            src="https://st3.depositphotos.com/4398873/12574/v/450/depositphotos_125746758-stock-illustration-organic-food-logo.jpg"
          />
          <h2 className="logo-name">DropDine</h2>
        </div>
        <div className="nav-container">
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">About</li>
            <Link to="/" className="link-item">
              <li className="nav-item">Restaurants</li>
            </Link>
            <Link to="/menu" className="link-item">
              <li className="nav-item">Menu</li>
            </Link>
            <li className="nav-item">Contact</li>
          </ul>
        </div>
        <div className="btn-container">
          <button className="btn">Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default Header;
