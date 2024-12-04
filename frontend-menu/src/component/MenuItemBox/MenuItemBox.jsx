import React from "react";
import "./MenuItemBox.css";
const MenuItemBox = ({item}) => {
  return (
    <div>
      <div className="menu-item-box bg-white  shadow-md rounded-lg px-4 py-4 my-4 flex justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-medium">{item?item.itemName:''}</h4>
          <h3>Spinach, romain lettuce</h3>
          <h2 className="text-red-400">${item?item.price[0].price:''}</h2>
        </div>
        <div className="bg-red-400 h-[100px] w-[100px] rounded-xl"></div>
      </div>
    </div>
  );
};

export default MenuItemBox;
