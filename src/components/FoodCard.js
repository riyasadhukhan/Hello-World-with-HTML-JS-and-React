import React from "react";

const FoodCard = ({ item }) => {
  const { cloudinaryImageId, costForTwo, name, cuisines } = item.info;
  return (
    <div className="card-container">
      <img
        loading="lazy"
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

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.item.info.id === nextProps.item.info.id &&
    JSON.stringify(prevProps.item.info) === JSON.stringify(nextProps.item.info)
  );
};

export default React.memo(FoodCard, areEqual);
