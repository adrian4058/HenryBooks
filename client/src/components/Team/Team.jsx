import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { members } from "../../utils/members";
import "./Team.css";

const Team = () => {
  return (
    <div className="team">
      <Navbar />
      {window.scrollTo(0, 0)}
      <div className="team-content">
        <div className="team-title">
          <h1>Team Members</h1>
        </div>
        <div className="team-cards">
          {members.map((data) => {
            return (
              <div className="member-card" key={data.id}>
                <div className="member-fullname">
                  <div className="member-name">{data.name}</div>
                  <div>{data.lastname}</div>
                </div>
                <div className="member-contact">
                  <a className="icon-color-github" href={data.github} target="_blank">
                    <i className="fa-brands fa-github fa-2x contact"></i>
                  </a>
                  <a className="icon-color-linkedin" href={data.linkedin} target="_blank">
                    <i className="fa-brands fa-linkedin fa-2x contact"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
