import React from "react";
import "./MenuManagement.css";
import MenuList from "../../component/MenuList/MenuList";
import CreateMenuForm from "../../component/CreateMenuForm/CreateMenuForm.jsx";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
const MenuManagement = () => {
  const [showCreateMenuForm, setShowMenuForm] = useState(false);
  const { selectedVenue } = useContext(AuthContext);
  const handleOpenCreateMenuForm = () => {
    setShowMenuForm(true);
  };
  const handleCloseCreateMenuForm = () => {
    setShowMenuForm(false);
  };

  return (
    <div className="main-menu-div">
      <div className="menu-heading-row">
        <h2 className="text-xl">Menu Management</h2>
        {selectedVenue && (
          <button className="create-menu-button" onClick={handleOpenCreateMenuForm}>
            Create Menu
          </button>
        )}
        {/* <button className="create-menu-button" onClick={handleOpenCreateMenuForm}>Create Menu</button> */}
      </div>
      <MenuList />
      <CreateMenuForm isOpen={showCreateMenuForm} onClose={handleCloseCreateMenuForm} />
    </div>
  );
};

export default MenuManagement;
