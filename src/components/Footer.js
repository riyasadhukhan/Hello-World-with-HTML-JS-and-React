import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { data } from "../utils/mockData";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-col1">
          <div className="logo-container">
            <img
              className="logo"
              style={{ mixBlendMode: "multiply" }}
              alt="logo"
              src="https://st3.depositphotos.com/4398873/12574/v/450/depositphotos_125746758-stock-illustration-organic-food-logo.jpg"
            />
            <h2 className="logo-name" style={{ color: "#dcdbdb" }}>
              DropDine
            </h2>
          </div>
          <p style={{ color: "white", fontSize: "14px" }}>
            In the new era of technology we look a in the future with certainty
            and pride to for our company and.
          </p>
          <div className="icon-container">
            <FaTwitter
              style={{
                color: "white",
                height: "22px",
                width: "22px",
                backgroundColor: "brown",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
            <FaFacebook
              style={{
                color: "white",
                height: "22px",
                width: "22px",
                backgroundColor: "brown",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
            <FaInstagram
              style={{
                color: "white",
                height: "22px",
                width: "22px",
                backgroundColor: "brown",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
            <FaGithub
              style={{
                color: "white",
                height: "22px",
                width: "22px",
                backgroundColor: "brown",
                padding: "3px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div className="footer-col2">
          <p style={{ color: "white" }}>Pages</p>
          <ul>
            <li className="col2-list-item">Home</li>
            <li className="col2-list-item">About</li>
            <li className="col2-list-item">Menu</li>
            <li className="col2-list-item">Pricing</li>
            <li className="col2-list-item">Blog</li>
            <li className="col2-list-item">Contact</li>
            <li className="col2-list-item">Delivery</li>
          </ul>
        </div>
        <div className="footer-col3">
          <p style={{ color: "white", fontSize: "16px", whiteSpace: "nowrap" }}>
            Utility Pages
          </p>
          <ul>
            <li className="col2-list-item">Home</li>
            <li className="col2-list-item">About</li>
            <li className="col2-list-item">Menu</li>
            <li className="col2-list-item">Pricing</li>
            <li className="col2-list-item">Blog</li>
            <li className="col2-list-item">Contact</li>
            <li className="col2-list-item">Delivery</li>
          </ul>
        </div>
        <div className="footer-col4">
          <p style={{ color: "white", fontSize: "16px", textAlign: "center" }}>
            Follow Us On Instagram
          </p>
          <ul>
            {data
              .filter((item) => item.rating > 4.6)
              .map((item) => (
                <img
                  className="col4-list-img"
                  key={item.id}
                  src={item.image_url}
                />
              ))}
          </ul>
        </div>
      </div>
      <p
        style={{
          color: "white",
          backgroundColor: "grey",
          textAlign: "center",
          padding: "5px",
        }}
      >
        Copyright © 2023 Hashtag Developer. All Rights Reserved
      </p>
    </>
  );
};

export default Footer;
