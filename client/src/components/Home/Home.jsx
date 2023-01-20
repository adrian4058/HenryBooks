import React from "react";
import Card from "../Card/Card";
import Style from "./Home.module.css";

function Home(props) {
  return (
    <div className={Style.home_container}>
      <h1>Welcome to HenryBooks!</h1>
      <h3>Here you can find your favorite books</h3>
      {/* *aqui iria la searchbar* */}
      <ul className={Style.filter_container}>
        <li>
          Filter
          <select>
            <option disabled>select gender</option>
            <option value="terror">Horror</option>
          </select>
        </li>

        <li>
          Order:
          <select>
            <option disabled>select order</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
            <option value="PD">Price(higher-smaller)</option>
            <option value="PA">Price(smaller-higher)</option>
          </select>
        </li>
      </ul>
      <div className={Style.card_container}>
        <Card />
      </div>
    </div>
  );
}

export default Home;
