import React from "react";
import ReactDOM from "react-dom/client";

const innerDiv = React.createElement("div", { id: "reactChild" }, [
  React.createElement("h1", {}, "Hello World from React1!"),
  React.createElement("h2", {}, "Hello World from React2!"),
]);

//JSX element
const headerElement = (
  <div className="title">
    <h1>H1 Heading</h1>
    <h2>H2 Heading</h2>
    <h3>H3 Heading</h3>
  </div>
);

const ChildHeaderComponent = () => {
  return <p>I am from child component.</p>;
};

//Functional Component
const HeaderComponent = () => {
  return (
    <div className="title">
      <ChildHeaderComponent />
      <h1>H1 Heading form component</h1>
      <h2>H2 Heading form component</h2>
      <h3>H3 Heading form component</h3>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<HeaderComponent />);
