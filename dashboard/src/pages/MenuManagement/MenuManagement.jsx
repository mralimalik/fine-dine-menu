import React from "react";
import "./MenuManagement.css";
import MenuList from "../../component/MenuList/MenuList";
const MenuManagement = () => {
  return (
    <div className="main-menu-div">
      <div className="menu-heading-row">
        <h2 className="text-xl">Menu Management</h2>
        <button className="create-menu-button">Create Menu</button>
      </div>
      <MenuList />
    </div>
  );
};

export default MenuManagement;
