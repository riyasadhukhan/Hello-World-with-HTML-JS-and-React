import React from "react";
import ReactDOM from "react-dom/client";
import { FaUserCircle, FaSearch } from "react-icons/fa";

// const innerDiv = React.createElement("div", { id: "reactChild" }, [
//   React.createElement("h1", {}, "Hello World from React1!"),
//   React.createElement("h2", {}, "Hello World from React2!"),
// ]);

// //JSX element
// const headerElement = (
//   <div className="title">
//     <h1>H1 Heading</h1>
//     <h2>H2 Heading</h2>
//     <h3>H3 Heading</h3>
//   </div>
// );

// const ChildHeaderComponent = () => {
//   return <p>I am from child component.</p>;
// };

// //Functional Component
// const HeaderComponent = () => {
//   return (
//     <div className="title">
//       <ChildHeaderComponent />
//       <h1>H1 Heading form component</h1>
//       <h2>H2 Heading form component</h2>
//       <h3>H3 Heading form component</h3>
//     </div>
//   );
// };

const HeaderComponent = () => {
  return (
    <div className="header">
      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/creative-logo-or-icon-design-template-d6cdd0b35fc4b69ddc3288a7abd52ff3_screen.jpg?ts=1578260767"
        alt="Logo"
      />
      <div className="inputGroup">
        <FaSearch
          style={{
            position: "absolute",
            top: "30%",
            left: "5%",
            color: "#5b5956",
          }}
        />
        <input type="text" placeholder="Search here..." />
        <FaUserCircle
          style={{ width: "40px", height: "40px", color: "#5f6363" }}
        />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<HeaderComponent />);
