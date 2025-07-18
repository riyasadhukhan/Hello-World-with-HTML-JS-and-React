import React from "react";

const ShimmerMenu = () => {
  return (
    <div className="menu-list-child-container">
      <div className="description-menu-list">
        <p className="shimmer-menu-name"></p>
        <p className="shimmer-menu-price">
          <span className="shimmer-menu-rating"></span>
        </p>

        <p className="menu-desc"></p>
      </div>
      <div className="shimmer-menu-list-img"></div>
    </div>
  );
};

export default ShimmerMenu;
