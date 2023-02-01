import "./DashboardBooks.css";
import Sidebar from "../Sidebar/Sidebar";
import BookCard from "./BookCards/BookCards";
import DashboardFilters from "./DashboardFilters/DashboardFilters.jsx";

const DashboardBooks = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardBooksGlass">
        <Sidebar />
        <BookCard />
        <DashboardFilters />
      </div>
    </div>
  )
}

export default DashboardBooks;