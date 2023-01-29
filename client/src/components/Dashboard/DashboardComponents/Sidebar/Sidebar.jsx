import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../DashboardImages/logo.png";
import { SidebarData } from "../../Data/Data.js";
import { BsList } from "react-icons/bs";
import { motion } from "framer-motion";
import "./Sidebar.css";

const Sidebar = () => {

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
        <BsList />
      </div>
      <motion.div className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="logo"></img>
          <span>
            Sh<span>o</span>ps
          </span>
        </div>
        {/* Menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? 'menuItem dashboard-active' : 'menuItem'}
                key={index}
                onClick={() => setSelected(index)}
              >
                <Link to={item.link}>
                  <div>
                    <item.icon />
                  </div>
                  <span>{item.heading}</span>
                </Link>
              </div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar;