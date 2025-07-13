Coding Assignment: 1

● Set up all the tools in your laptop
○ VS Code
○ Chrome
○ Extensions of Chrome
● Create a new Git repo
● Build your first Hello World program using,
○ Using just HTML
○ Using JS to manipulate the DOM
○ Using React
■ use CDN Links
■ Create an Element
■ Create nested React Elements
■ Use root.render
● Push code to Github

Coding Assignment: 2

- In your existing project
  ● - intialize `npm` into your repo
  ● - install `react` and `react-dom`
  ● - remove CDN links of react
  ● - install parcel
  ● - ignite your app with parcel
  ● - add scripts for “start” and “build” with parcel commands
  ● - add `.gitignore` file
  ● - add `browserlists`
  ● - build a production version of your code using `parcel build`

Coding Assignment: 3

● Create a Nested header Element using React.createElement(h1,h2,h3 inside a
div with class “title”)
○ Create the same element using JSX
○ Create a functional component of the same with JSX
○ Pass attributes into the tag in JSX
○ Composition of Component(Add a component inside another)
○ {TitleComponent} vs {<TitleComponent/>} vs
{<TitleComponent></TitleComponent>} in JSX
● Create a Header Component from scratch using Functional Components with
JSX
○ Add a Logo on left
○ Add a search bar in middle
○ Add User icon on right
○ Add CSS to make it look nice

Coding Assignment: 4

● Build a Food Ordering App
○ Think of a cool name for your app
○ Build a AppLayout
○ Build a Header Component with Logo & Nav Items & Cart
○ Build a Body Component
○ Build RestaurantList Component
○ Build RestaurantCard Component
○ Use static data initially
○ Make your card dynamic(pass in props)
○ Props - passing arguments to a function - Use Destructuring & Spread
operator
○ Render your cards with dynamic data of restaurants
○ Use Array.map to render all the restaurants

Coding Assignment: 5

● Clean up your code
● Create a Folder Structure for your app
● Make different files for each Components
● Create a config file
● Use all types of import and export
● Create a Search Box in your App
● Use useState to create a variable and bind it to the input box
● Try to make your search bar work

// const innerDiv = React.createElement("div", { id: "reactChild" }, [
// React.createElement("h1", {}, "Hello World from React1!"),
// React.createElement("h2", {}, "Hello World from React2!"),
// ]);

// //JSX element
// const headerElement = (
// <div className="title">
// <h1>H1 Heading</h1>
// <h2>H2 Heading</h2>
// <h3>H3 Heading</h3>
// </div>
// );

// const ChildHeaderComponent = () => {
// return <p>I am from child component.</p>;
// };

// //Functional Component
// const HeaderComponent = () => {
// return (
// <div className="title">
// <ChildHeaderComponent />
// <h1>H1 Heading form component</h1>
// <h2>H2 Heading form component</h2>
// <h3>H3 Heading form component</h3>
// </div>
// );
// };

// const HeaderComponent = () => {
// return (
// <div className="header">
// <img
// src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/creative-logo-or-icon-design-template-d6cdd0b35fc4b69ddc3288a7abd52ff3_screen.jpg?ts=1578260767"
// alt="Logo"
// />
// <div className="inputGroup">
// <FaSearch
// style={{
//             position: "absolute",
//             top: "30%",
//             left: "5%",
//             color: "#5b5956",
//           }}
// />
// <input type="text" placeholder="Search here..." />
// <FaUserCircle
// style={{ width: "40px", height: "40px", color: "#5f6363" }}
// />
// </div>
// </div>
// );
// };
