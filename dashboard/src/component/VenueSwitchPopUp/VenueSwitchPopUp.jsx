import React from "react";
import "./VenueSwitchPopUp.css";
import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import AddVenueModal from "../../component/AddVenueModal/AddVenueModal.jsx";
import { VenueContext } from "../../context/VenueContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const VenueSwitchPopUp = () => {
  const { showVeneueSwitchPopUp, venueSwitchRef } = useContext(SidebarContext);
  const { handleModalOpen, handleModalClose, isModalOpen } =
    useContext(VenueContext);
  const { userVenues, setUserVenues, selectedVenue, setSelectedVenue } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // const venues = ["Ali", "Mr"];

  return (
    <div
      ref={venueSwitchRef}
      className={`venue-pop-up ${
        showVeneueSwitchPopUp === true ? "venue-pop-up-open" : ""
      }`}
    >
      <input
        className="w-full p-1 border outline-none rounded-[10px] my-2 "
        type="search"
        id="search"
        placeholder="Search"
        required
      />

      <div className="venue-add">
        <p className="venue-add text-slate-400">Venue</p>
        <p className="venue-add" onClick={handleModalOpen}>
          Add
        </p>
      </div>
      {userVenues.length === 0 ? (
        <div className=" h-[200px] flex items-center justify-center">
          No Venue
        </div>
      ) : (
        userVenues.map((item, index) => (
          <div
            className={`venue-pop-up-item rounded-md ${
              selectedVenue && selectedVenue.venueId === item.venueId
                ? "bg-violet-100"
                : ""
            } cursor-pointer`}
            onClick={() => {
              setSelectedVenue(item);
              navigate(`/venue/${item.venueId}/dashboard`);
            }}
            key={index}
          >
            {item.venueName}
          </div>
        ))
      )}
      <AddVenueModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default VenueSwitchPopUp;
