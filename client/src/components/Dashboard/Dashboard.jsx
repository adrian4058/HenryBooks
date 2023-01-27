import "./Dashboard.css";
import MainDash from "./DashboardComponents/MainDash/MainDash";
import RightSide from "./DashboardComponents/RightSide/RightSide";
import Sidebar from "./DashboardComponents/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardGlass">
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  )
}

export default Dashboard;