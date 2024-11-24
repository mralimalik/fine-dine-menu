import React from 'react'

const MenuItemList = ({ menuItemData }) => {
  return (
    <div className="menu-item-list bg-white rounded-md p-3 mx-8 my-4" draggable>
      <div className="menu-item-left">
        <p>{menuItemData.itemName}</p>
      </div>
      <div className="menu-item-right">
        <p>Price: {menuItemData.price}</p>
      </div>
    </div>
  );
};

export default MenuItemList;
