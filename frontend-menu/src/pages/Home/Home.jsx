import React from "react";
import "./Home.css";
import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VenueContext } from "../../context/VenueContext";
import SelectMenuDialog from "../../component/SelectMenuDialog/SelectMenuDialog.jsx";
const Home = () => {
  const { venueData, menus, setSelectedMenu, selectedMenu } = useContext(VenueContext);

  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuDialogClose = () => {
    setIsMenuDialogOpen(false);
  };
  const handleMenu = () => {
    if (menus.length === 1) {
      setSelectedMenu(menus[0]);
      if (menus[0]) {
        navigate(`/${venueData.venueId}/menu/${menus[0]._id}`);
      } else {
        console.log("No selected menu");
      }
    } else if (menus.length > 1) {
      setIsMenuDialogOpen(true);
    }
  };
   
  return (
    <div className="h-screen w-full flex flex-col relative">
      <div className="bg-red-400 text-white text-base py-2 px-4 flex justify-end">
        <button className="login-button">Login</button>
      </div>
      <div className="h-full flex flex-col justify-center gap-20 px-2">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium my-4">{venueData ? venueData.venueName : ""}</h1>
          <button
            className="text-md bg-red-600 py-2  text-white w-80 rounded-md"
            onClick={ handleMenu}
          >
            Go to Menu
          </button>
        </div>
        <div className=" border-y-2 py-4 px-2">
          <p>📄 Give Feedback</p>
        </div>
      </div>
      {isMenuDialogOpen && <SelectMenuDialog menus={menus} onClose={handleMenuDialogClose} />}
    </div>
  );
};

export default Home;
