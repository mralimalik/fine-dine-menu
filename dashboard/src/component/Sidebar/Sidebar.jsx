import React from "react";
import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { VenueContext } from "../../context/VenueContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Logo from "../../assets/finedinemenu.svg";
const Sidebar = () => {
  let items = ["Dashboard", "Menu Management"];
  const { selectedVenue } = useContext(AuthContext);

  const { selectedItemIndex, setSelectedItemIndex, handleVenuePopUp } =
    useContext(SidebarContext);

  const navigate = useNavigate();

  const handleItemClick = (index, item) => {
    setSelectedItemIndex(index);
    let venuePath;
    if(selectedVenue){
       venuePath = `/venue/${selectedVenue.venueId}`;
    }else{
       venuePath = `/venue`;
    }
    if (item === "Dashboard") {
      navigate(`${venuePath}/dashboard`);
    } else if (item === "Menu Management") {
      navigate(`${venuePath}/menu-management`);
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (selectedVenue) {
      const venuePath = `/venue/${selectedVenue.venueId}`;

      // Check the current URL and map it to the correct sidebar item
      if (location.pathname.includes(`${venuePath}/dashboard`)) {
        setSelectedItemIndex(0); // Set "Dashboard" as selected
      } else if (location.pathname.includes(`${venuePath}/menu-management`)) {
        setSelectedItemIndex(1); // Set "Menu Management" as selected
      }
    }
  }, [location.pathname, setSelectedItemIndex, selectedVenue?.venueId]);

  return (
    <div className="sidebar">
      <img src={Logo} alt="" className="logo-img h-5 m-3" />

      <div className="venue-switch" onClick={handleVenuePopUp}>
        <p>{selectedVenue ? selectedVenue.venueName : "Create Venue Here"}</p>
      </div>
      {
      
      items.map((item, index) => (
        <div
          className={`sidebar-item ${
            selectedItemIndex === index ? "sidebar-item-selected" : ""
          } `}
          key={index}
          onClick={() => handleItemClick(index, item)}
        >
          <p className="font-normal font-sans">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
