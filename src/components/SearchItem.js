import { IoIosSearch } from "react-icons/io";

const SearchItem = ({ value, placeholder, onChange }) => {
  return (
    <div className="search-container">
      <IoIosSearch
        style={{ position: "absolute", right: "197px", top: "19px" }}
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="searchBar"
      />
      <button className="close-btn" onClick={(e) => onChange("")}>
        &times;
      </button>
    </div>
  );
};

export default SearchItem;
