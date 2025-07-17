import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.5769763&lng=88.3673359&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const jsonData = await response.json();

      setMenu(
        jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
          ?.card?.card?.itemCards || []
      );
      console.log(
        jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
          ?.card?.card?.itemCards
      );
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu-text-container">
          <h2 className="heading">Our Menu</h2>
          <p className="menu-description">
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>
        </div>
      </div>
      <div className="menu-list-container">
        {menu.map((item) => {
          const { id, name, defaultPrice, price, description, imageId } =
            item?.card?.info;
          const { ratings } = item?.card?.info;
          const rating = ratings?.aggregatedRating?.rating;
          const ratingCount = ratings?.aggregatedRating?.ratingCountV2;

          return (
            <div className="menu-list-child-container" key={id}>
              <div className="description-menu-list">
                <p className="menu-name">{name}</p>
                <p className="menu-price">
                  Rs.{price ? price / 100 : defaultPrice / 100}
                  <span className="menu-rating">
                    {rating && ratingCount
                      ? ` ★ ${rating} (${ratingCount})`
                      : " "}
                  </span>
                </p>

                <p className="menu-desc">{description}</p>
              </div>
              <div className="menu-list-img">
                <img
                  className="menu-img"
                  alt="menu-img"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
