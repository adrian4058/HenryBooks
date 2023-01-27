import React from "react";
import { cardsData } from "../../Data/Data";
import Card from "../DashboardCard/DashboardCard";
import './DashboardCards.css';

const DashboardCards = () => {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div key={id} className="parentContainer">
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCards;