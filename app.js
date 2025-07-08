const innerDiv = React.createElement(
  "div",
  { id: "reactChild" },
  React.createElement("h1", {}, "Hello World from React!")
);

const root = ReactDOM.creatRoot(document.getElementById("reactRoot"));
root.render(innerDiv);
