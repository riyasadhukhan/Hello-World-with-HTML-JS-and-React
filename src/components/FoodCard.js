const FoodCard = ({ item }) => {
  const { image_url, price, meal_name, tags } = item;
  return (
    <div className="card-container">
      <img alt="food img" className="foodimg" src={image_url} />
      <div className="food-description">
        <h3 className="price">$ {price}</h3>
        <h2 className="item-name">{meal_name}</h2>
        <p className="cuisine">{tags.join(" | ")}</p>
      </div>
    </div>
  );
};

export default FoodCard;
