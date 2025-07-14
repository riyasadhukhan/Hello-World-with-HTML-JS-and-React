import FoodCard from "./FoodCard";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import { SWIGGY_URL } from "../utils/constants";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [foodData, setFoodData] = useState([]);

  const fetchSwiggyData = async () => {
    const response = await fetch(SWIGGY_URL);
    const jsonData = await response.json();
    const cards = jsonData?.data?.cards[4] || [];
    const restaurants =
      cards?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setFoodData(restaurants);
  };

  useEffect(() => {
    fetchSwiggyData();
  }, []);

  const filteredItems = foodData.filter((dataItem) =>
    dataItem.info.name.toLowerCase().startsWith(searchItem.toLowerCase())
  );
  const itemsToRender = searchItem ? filteredItems : foodData;

  return (
    <>
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        value={searchItem}
        placeholder="Search here..."
        onChange={setSearchItem}
      />
      {
        <div className="card-list-container">
          {itemsToRender.map((item) => (
            <FoodCard key={item.info.id} item={item} />
          ))}
        </div>
      }
    </>
  );
};

export default FoodCardList;
