import {
  FaPhoneAlt,
  FaRegEnvelope,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="top-container">
      <div className="contact-container">
        <div className="phn-container">
          <FaPhoneAlt style={{ color: "white", width: "12px" }} />
          <p className="phno">(999)999-0999</p>
        </div>
        <div className="email-container">
          <FaRegEnvelope style={{ color: "white", width: "12px" }} />
          <p className="email">yummy@dropdine</p>
        </div>
      </div>
      <div className="icon-container">
        <FaTwitter
          style={{
            color: "white",
            height: "18px",
            width: "18px",
            backgroundColor: "grey",
            padding: "3px",
            borderRadius: "50%",
          }}
        />
        <FaFacebook
          style={{
            color: "white",
            height: "18px",
            width: "18px",
            backgroundColor: "grey",
            padding: "3px",
            borderRadius: "50%",
          }}
        />
        <FaInstagram
          style={{
            color: "white",
            height: "18px",
            width: "18px",
            backgroundColor: "grey",
            padding: "3px",
            borderRadius: "50%",
          }}
        />
        <FaGithub
          style={{
            color: "white",
            height: "18px",
            width: "18px",
            backgroundColor: "grey",
            padding: "3px",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};

export default TopHeader;
