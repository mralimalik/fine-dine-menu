import React, { useState } from "react";
import SwitchButton from "../SwitchButton/SwitchButton.jsx";

const MenuItemList = ({ menuItemData }) => {
  const [price, setPrice] = useState(menuItemData.price);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setPrice(value);
    }
  };

  return (
    <div
      className="menu-item-list bg-white rounded-md p-3 mx-8 my-4 flex justify-between items-center"
      draggable
    >
      {/* Left Section */}
      <div className="menu-item-left flex items-center gap-3">
        <div className="menu-drag-handle-nograb">---</div>

        <p>{menuItemData.itemName}</p>
      </div>

      {/* Right Section */}
      <div className="menu-item-right flex gap-5 items-center">
        {/* Price Input */}
        <div className="price-input flex items-center border border-gray-300 rounded-md p-1">
          <span className="text-gray-500 px-2">$</span>
          <input
            type="number"
            value={price[0].price}
            onChange={handlePriceChange}
            className="w-16 text-center outline-none"
          />
        </div>

        {/* Switch Button */}
        <SwitchButton isActive={menuItemData.isActive} />
      </div>
    </div>
  );
};

export default MenuItemList;
