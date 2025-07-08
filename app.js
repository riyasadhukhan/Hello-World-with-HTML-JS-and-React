const innerDiv = React.createElement("div", { id: "reactChild" }, [
  React.createElement("h1", {}, "Hello World from React1!"),
  React.createElement("h2", {}, "Hello World from React2!"),
]);

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(innerDiv);
