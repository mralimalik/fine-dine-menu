import React, { useState, useEffect, useContext } from "react";
import "./MenuList.css";
import ToggleMenu from "../ToggleMenu/ToggleMenu.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { selectedVenue } = useContext(AuthContext);
  const [isMenuActive, setMenuActive] = useState(false);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    const updatedItems = [...menuItems]; // Create a shallow copy of the array
    const draggedItem = updatedItems[draggedIndex]; // Get the dragged item

    // Remove the dragged item from the array
    updatedItems.splice(draggedIndex, 1);

    // Insert the dragged item at the target position
    updatedItems.splice(targetIndex, 0, draggedItem);

    // Update the state
    setMenuItems(updatedItems);
    setDraggedIndex(null); // Reset dragged index
  };

  // Fetch menus
  const fetchMenus = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`http://localhost:3000/menu/${selectedVenue._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(response.data.data || []);

      console.log("response", response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleMenuActive = async (index) => {
    const updatedMenus = [...menuItems];
    updatedMenus[index].isActive = !updatedMenus[index].isActive; // Toggle isActive
    setMenuItems(updatedMenus);
  };
  useEffect(() => {
    fetchMenus();
  }, [selectedVenue]);

  return (
    <div>
      {menuItems.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <p>No Menu Created</p>
        </div>
      ) : (
        menuItems.map((data, index) => (
          <div
            className="card-div my-2"
            draggable
            key={index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div className="card-left-div">
              <div className="menu-drag-handle-nograb">---</div>
              <div className="menu-card-list">
                <div className="title-row">
                  <p className="menu-title">{data.menuName}</p>
                  {data.isActive && <div className="active-menu-div">Live</div>}
                  <div className="active-order-menu-div">Ordering Enabled</div>
                </div>
                <div className="availability-text">Availability: Always</div>
                <div className="menu-info-row">
                  <p>4 Sections, 7 Items - Last updated on Nov 22, 2024 - </p>
                  <p>Dine-in QR -</p>
                  <p>Pick-up -</p>
                  <p>Delivery</p>
                </div>
              </div>
            </div>
            <ToggleMenu
              isMenuActive={data.isActive}
              onToggle={() => {
                handleMenuActive(index);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MenuList;