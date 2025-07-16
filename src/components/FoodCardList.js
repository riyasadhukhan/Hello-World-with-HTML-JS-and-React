import FoodCard from "./FoodCard";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import { SWIGGY_URL } from "../utils/constants";
import ShimmerUI from "./ShimmerUI";
import Restaurants from "./Restaurants";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [foodData, setFoodData] = useState([]);

  const fetchSwiggyData = async () => {
    try {
      const response = await fetch(SWIGGY_URL);
      const jsonData = await response.json();
      const cards = jsonData?.data?.cards[4] || [];
      const restaurants =
        cards?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setFoodData(restaurants);
    } catch (error) {
      console.error("Failed to fetch swiggy data: ", error.message);
    }
  };

  useEffect(() => {
    fetchSwiggyData();
  }, []);

  const filteredItems = foodData.filter((dataItem) =>
    dataItem.info.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const itemsToRender = searchItem ? filteredItems : foodData;

  return (
    <>
      <Restaurants />
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        value={searchItem}
        placeholder="Search here..."
        onChange={setSearchItem}
      />
      <div className="card-list-container">
        {foodData.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <ShimmerUI key={index} />
            ))
          : itemsToRender.map((item) => (
              <FoodCard key={item.info.id} item={item} />
            ))}
      </div>
    </>
  );
};

export default FoodCardList;
