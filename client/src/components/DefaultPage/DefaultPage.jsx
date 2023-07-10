import "./DefaultPage.css"
import NavBar from "../Navbar/Navbar";

const DefaultPage = () => {
  return (
    <div className="DefaultPage Container">
      <NavBar />
      <div className="Default-msg">
        <h1>This Page Doesn't Exist</h1>
      </div>
    </div>
  )
}

export default DefaultPage;