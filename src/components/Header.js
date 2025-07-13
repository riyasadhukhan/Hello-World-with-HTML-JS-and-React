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
            <li className="nav-item">Menu</li>
            <li className="nav-item">Pages</li>
            <li className="nav-item">Contact</li>
          </ul>
        </div>
        <div className="btn-container">
          <button className="btn">Book A Table</button>
        </div>
      </div>
    </>
  );
};

export default Header;
