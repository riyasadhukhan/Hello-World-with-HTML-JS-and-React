import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import ShimmerUI from "./ShimmerUI";
import SearchItem from "./SearchItem";
import Restaurants from "./Restaurants";

const FoodCardList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [nextOffset, setNextOffset] = useState("0");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null);
  const controllerRef = useRef(null);
  const seenOffsets = useRef(new Set());
  const retryCount = useRef(0);
  const maxRetries = 3;
  const widgetOffsetCounter = useRef(9); // Start with 9, Swiggy default

  const fetchSwiggyData = useCallback(async () => {
    if (loading || !hasMore || searchItem) return;

    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);

    try {
      const lat = 22.5726;
      const lng = 88.3639;

      const widgetOffset = {
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: String(
          widgetOffsetCounter.current
        ),
      };

      const queryParams = new URLSearchParams({
        lat,
        lng,
        offset: nextOffset,
        sortBy: "RELEVANCE",
        page_type: "DESKTOP_WEB_LISTING",
        widgetOffset: JSON.stringify(widgetOffset),
      });

      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?${queryParams.toString()}`,
        {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const jsonData = await response.json();
      const cards = jsonData?.data?.cards || [];

      const restaurantCard = cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      const newNextOffset = jsonData?.data?.pageOffset?.nextOffset;

      console.log("API Response Debug: ", {
        newNextOffset,
        restaurantsCount: restaurants.length,
        totalRestaurants: foodData.length + restaurants.length,
        widgetOffsetUsed: widgetOffsetCounter.current,
      });

      if (!newNextOffset || seenOffsets.current.has(newNextOffset)) {
        console.log("No new offset. Stopping fetch.");
        setHasMore(false);
        return;
      }

      seenOffsets.current.add(newNextOffset);
      setFoodData((prev) => [...prev, ...restaurants]);
      setNextOffset(newNextOffset);
      widgetOffsetCounter.current += 15; // Increment by 15 on each scroll
      retryCount.current = 0;
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
  }, [loading, hasMore, nextOffset, searchItem, foodData]);

  useEffect(() => {
    fetchSwiggyData();
    return () => {
      if (observer.current) observer.current.disconnect();
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const lastCardRef = useCallback(
    (node) => {
      if (loading || !hasMore || searchItem) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("Last card visible, triggering fetch");
            fetchSwiggyData();
          }
        },
        {
          root: null,
          rootMargin: "500px",
          threshold: 0.5,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchSwiggyData, searchItem]
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
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card-item">
                  <ShimmerUI />
                </div>
              ))}
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
                    key={`${item.info.id}-${globalIndex}`}
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
              {Array.from({ length: 4 }).map((_, i) => (
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
        {!searchItem && hasMore && (
          <div ref={lastCardRef} style={{ height: "1px" }} />
        )}
      </div>
    </>
  );
};

export default FoodCardList;
