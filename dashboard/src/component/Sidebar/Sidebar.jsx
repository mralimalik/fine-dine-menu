import React from "react";
import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { VenueContext } from "../../context/VenueContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Logo from "../../assets/finedinemenu.webp";
const Sidebar = () => {
  let items = ["Dashboard", "Menu Management", "Operations"];

  // getting current venue data
  const { selectedVenue } = useContext(AuthContext);

  //getting selected item (route) index , handle venue switch pop up from sidebar context
  const { selectedItemIndex, setSelectedItemIndex, handleVenuePopUp } = useContext(SidebarContext);

  // to navigate to any route
  const navigate = useNavigate();

  // to get location of current link
  const location = useLocation();

  const handleItemClick = (index, item) => {
    setSelectedItemIndex(index);
    let venuePath;
    //if selectedVenue(current) is not null then navigate with param of venueId else no param
    if (selectedVenue) {
      venuePath = `/venue/${selectedVenue.venueId}`;
    } else {
      venuePath = `/venue`;
    }
    if (item === "Dashboard") {
      navigate(`${venuePath}/dashboard`);
    } else if (item === "Menu Management") {
      navigate(`${venuePath}/menu-management`);
    } else if (item === "Operations") {
      navigate(`${venuePath}/operations`);
    }
  };

  useEffect(() => {
    if (selectedVenue) {
      const venuePath = `/venue/${selectedVenue.venueId}`;
      // Check the current URL and map it to the correct sidebar item
      if (location.pathname.includes(`${venuePath}/dashboard`)) {
        setSelectedItemIndex(0); // Set "Dashboard" as selected
      } else if (location.pathname.includes(`${venuePath}/menu-management`)) {
        setSelectedItemIndex(1); // Set "Menu Management" as selected
      } else if (location.pathname.includes(`${venuePath}/operations`)) {
        setSelectedItemIndex(2); // Set "Menu Management" as selected
      }
      console.log("Side bar item");
    }
  }, [location.pathname, setSelectedItemIndex, selectedVenue]);

  return (
    <div className="sidebar">
      <div className="image-log ">
        <img src={Logo} alt="" className="logo-img h-14 m-3" />
      </div>

      <div className="venue-switch" onClick={handleVenuePopUp}>
        <p>{selectedVenue ? selectedVenue.venueName : "Create Venue Here"}</p>
      </div>
      {items.map((item, index) => (
        <div
          className={`sidebar-item ${selectedItemIndex === index ? "sidebar-item-selected" : ""} `}
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
