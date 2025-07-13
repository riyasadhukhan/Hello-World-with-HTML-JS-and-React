import FoodCard from "./FoodCard";
import { data } from "../utils/mockData";

const FoodCardList = () => {
  return (
    <div className="card-list-container">
      {data.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FoodCardList;
