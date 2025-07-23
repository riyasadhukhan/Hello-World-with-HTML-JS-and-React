import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard"; // Assume memoized with React.memo
import ShimmerUI from "./ShimmerUI";
import SearchItem from "./SearchItem";
import Restaurants from "./Restaurants";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [nextOffSet, setNextOffSet] = useState("0");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const controllerRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

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
        {
          signal: controller.signal,
          headers: { "User-Agent": "Mozilla/5.0" }, // Add header to mimic browser
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      const cards = jsonData?.data?.cards || [];

      const restaurantCard = cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        jsonData?.data?.restaurants ||
        [];

      const next = jsonData?.data?.pageOffset?.nextOffset || null;

      console.log("API Response:", {
        restaurantsCount: restaurants.length,
        nextOffset: next,
        totalRestaurants: foodData.length + restaurants.length,
      });

      if (restaurants.length === 0 || next === null) {
        console.log("No more data to fetch or nextOffset is null");
        setHasMore(false);
      } else {
        setFoodData((prev) => {
          const existingIds = new Set(prev.map((res) => res.info.id));
          const newUnique = restaurants.filter(
            (res) => !existingIds.has(res.info.id)
          );
          console.log("New restaurants added:", newUnique.length);
          return [...prev, ...newUnique];
        });
        setNextOffSet(next);
        retryCount.current = 0;
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      console.error("Fetch error:", error.message);
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        console.log(`Retrying fetch... Attempt ${retryCount.current}`);
        setTimeout(() => fetchSwiggyData(), 1000 * retryCount.current);
      } else {
        console.error("Max retries reached. Stopping fetch.");
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextOffSet]);

  useEffect(() => {
    if (nextOffSet === "0") {
      console.log("Initial fetch triggered");
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
            console.log("Last card visible, triggering fetch");
            fetchSwiggyData(); // Remove debounce for faster fetching
          }
        },
        {
          root: null,
          rootMargin: "500px", // Fetch earlier
          threshold: 0.5, // Trigger when 50% of last card is visible
        }
      );

      if (node) {
        console.log("Observing last card:", node);
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchSwiggyData]
  );

  const filteredItems = useMemo(
    () =>
      foodData.filter((item) =>
        item.info.name.toLowerCase().includes(searchItem.toLowerCase())
      ),
    [foodData, searchItem]
  );

  const itemsToShow = searchItem ? filteredItems : foodData;

  const chunkArray = useCallback((array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }, []);

  const rows = useMemo(
    () => chunkArray(itemsToShow, 4),
    [itemsToShow, chunkArray]
  );

  return (
    <>
      <Restaurants />
      <SearchItem
        value={searchItem}
        placeholder="Search here..."
        onChange={setSearchItem}
      />

      <div className="cards-container">
        {itemsToShow.length === 0 && loading ? (
          <div className="shimmer-rows">
            <div className="card-row">
              {Array.from({ length: 2 }).map(
                (
                  _,
                  i // Reduced shimmer cards
                ) => (
                  <div key={i} className="card-item">
                    <ShimmerUI />
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          rows.map((row, rowIndex) => (
            <div key={rowIndex} className="card-row">
              {row.map((item, columnIndex) => {
                const globalIndex = rowIndex * 4 + columnIndex;
                const isLast = globalIndex === itemsToShow.length - 1;

                return (
                  <div
                    className="card-item"
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
          ))
        )}
        {loading && itemsToShow.length > 0 && (
          <div className="shimmer-rows">
            <div className="card-row">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="card-item">
                  <ShimmerUI />
                </div>
              ))}
            </div>
          </div>
        )}
        {!hasMore && itemsToShow.length > 0 && (
          <div className="no-more-data">No more restaurants to load.</div>
        )}
      </div>
    </>
  );
};

export default FoodCardList;
