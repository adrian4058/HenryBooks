import "./DashboardUsers.css";
import Sidebar from "../Sidebar/Sidebar";
import Usuarios from "../../../Admin/Usuario";

const DashboardUsers = () => {
  return (
    <div className="DashboardUsers">
      <div className="DashboardUsersGlass">
        <Sidebar />
        <Usuarios />
      </div>
    </div>
  )
}

export default DashboardUsers;