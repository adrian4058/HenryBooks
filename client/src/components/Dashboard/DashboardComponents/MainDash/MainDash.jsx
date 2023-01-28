import React from "react";
import DashboardCards from "../DashboardCards/DashboardCards";
import Table from "../Table/Table";
import "./MainDash.css";

const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <DashboardCards />
      <Table />
    </div>
  )
}

export default MainDash;