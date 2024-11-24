import React, { useState, useContext } from "react";
import "./CreateMenuForm.css";

const CreateMenuForm = ({ isOpen, onClose,}) => {
 
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" >
        <div className="modal-header">
          <h2>How would you like to setup your menu?
          </h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default CreateMenuForm;
