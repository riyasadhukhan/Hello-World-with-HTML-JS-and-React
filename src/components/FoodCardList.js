import FoodCard from "./FoodCard";
import { data } from "../utils/mockData";
import SearchItem from "./SearchItem";
import { useState } from "react";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");

  const filteredItems = data.filter((dataItem) =>
    dataItem.meal_name.toLowerCase().startsWith(searchItem.toLowerCase())
  );
  const itemsToRender = searchItem ? filteredItems : data;

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
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      }
    </>
  );
};

export default FoodCardList;
