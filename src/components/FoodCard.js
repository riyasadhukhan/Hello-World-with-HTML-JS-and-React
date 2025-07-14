const FoodCard = ({ item }) => {
  const { cloudinaryImageId, costForTwo, name, cuisines } = item.info;
  return (
    <div className="card-container">
      <img
        alt="food img"
        className="foodimg"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`}
      />
      <div className="food-description">
        <h3 className="price">{costForTwo}</h3>
        <h2 className="item-name">{name}</h2>
        <p className="cuisine">{cuisines.join(" | ")}</p>
      </div>
    </div>
  );
};

export default FoodCard;
