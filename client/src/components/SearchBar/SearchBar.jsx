import React, { useState } from "react";
import Style from "./SearchBar.module.css";

function SearchBar() {
  const [searchBook, setSearchBook] = useState("");
  console.log(searchBook);

  const handleInput = (e) => {
    e.preventDefault();
    setSearchBook(e.target.value);
  };

  return (
    <div className={Style.container}>
      <input
        className={Style.input}
        type="text"
        onChange={handleInput}
        placeholder="Search..."
      />
      <button className={Style.btn} type="submit">
        Submit
      </button>
    </div>
  );
}

export default SearchBar;
