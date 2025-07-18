import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard"; // Assume this is memoized with React.memo
import ShimmerUI from "./ShimmerUI";
import SearchItem from "./SearchItem";
import Restaurants from "./Restaurants";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [nextOffSet, setNextOffSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const controllerRef = useRef(null);
  const debounceTimeout = useRef(null);

  const fetchSwiggyData = useCallback(async () => {
    if (loading || !hasMore) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);

    try {
      const lat = 22.5726;
      const lng = 88.3639;
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&offset=${nextOffSet}&sortBy=RELEVANCE&page_type=DESKTOP_WEB_LISTING`,
        { signal: controller.signal }
      );

      const jsonData = await response.json();
      const cards = jsonData?.data?.cards || [];

      const restaurantCard = cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      const next = jsonData?.data?.pageOffset?.nextOffset || null;

      if (restaurants.length === 0 || !next || next === nextOffSet) {
        setHasMore(false);
      } else {
        setFoodData((prev) => {
          const existingId = new Set(prev.map((res) => res.info.id));
          const newUnique = restaurants.filter(
            (res) => !existingId.has(res.info.id)
          );
          return [...prev, ...newUnique];
        });
        setNextOffSet(next);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch Swiggy data:", error.message);
      }
    }

    setLoading(false);
  }, [loading, hasMore, nextOffSet]);

  useEffect(() => {
    if (nextOffSet === null) {
      fetchSwiggyData();
    }
  }, [nextOffSet, fetchSwiggyData]);

  const lastCardRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
              fetchSwiggyData();
            }, 100); // Debounce trigger
          }
        },
        {
          rootMargin: "300px", // Start fetching earlier
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchSwiggyData]
  );

  const filteredItems = foodData.filter((item) =>
    item.info.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const itemsToShow = searchItem ? filteredItems : foodData;

  return (
    <>
      <Restaurants />
      <SearchItem
        value={searchItem}
        placeholder="Search here..."
        onChange={setSearchItem}
      />

      <div className="grid-container">
        {itemsToShow.length === 0 && loading
          ? Array.from({ length: 8 }).map((_, i) => <ShimmerUI key={i} />)
          : itemsToShow.map((item, i) => {
              const isLast = i === itemsToShow.length - 1;
              return (
                <div
                  className="grid-item"
                  key={item.info.id}
                  ref={isLast ? lastCardRef : null}
                >
                  <Link className="link" to={`/restaurants/${item.info.id}`}>
                    <FoodCard item={item} />
                  </Link>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default FoodCardList;
