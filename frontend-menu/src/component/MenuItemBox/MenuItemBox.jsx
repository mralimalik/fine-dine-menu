import React, { useContext } from "react";
import "./MenuItemBox.css";
import { VenueContext } from "../../context/VenueContext.jsx";
import { Venue } from "../../../../backend/src/models/venue.model";
import { useNavigate,useParams } from "react-router-dom";
const MenuItemBox = ({ item }) => {
  const { orderSettings,tableData} = useContext(VenueContext);
  const { venueId,menuId } = useParams(); // Get the venueId from the route parameters

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${venueId}/menu/${menuId}/item/${item._id}`); // Navigate to the item detail page
  };

  return (
    <div>
      <div className="menu-item-box bg-white  shadow-md rounded-lg px-4 py-4 my-4 flex justify-between" onClick={handleClick}>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-medium">{item ? item.itemName : ""}</h4>
          <h3>Spinach, romain lettuce</h3>
          <h2 className="text-red-400">${item ? item.price[0].price : ""}</h2>
        </div>
        <div className="flex flex-col gap-2 items-end ">
          <div className="bg-red-400 h-[90px] w-[100px] rounded-xl"></div>
          {
          orderSettings && (
            (tableData && orderSettings.settings.dineIn.orderEnabled === true) || 
            orderSettings.settings.delivery.orderEnabled === true ||
            orderSettings.settings.pickup.orderEnabled === true ? (
              <div className="bg-violet-500 px-2 rounded-md flex justify-center items-center cursor-pointer">
                <h3 className="text-white text-lg">+</h3>
              </div>
            ) : (
              ""
            )
          )
       }
        </div>
      </div>
    </div>
  );
};

export default MenuItemBox;
