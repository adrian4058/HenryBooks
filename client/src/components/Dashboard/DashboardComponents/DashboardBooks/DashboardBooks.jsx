import "./DashboardBooks.css";
import Sidebar from "../Sidebar/Sidebar";
import BookCard from "./BookCards/BookCards";

const DashboardBooks = () => {
  return (
    <div className="Dashboard">
      <div className="DashboardBooksGlass">
        <Sidebar />
        <BookCard />
      </div>
    </div>
  )
}

export default DashboardBooks;