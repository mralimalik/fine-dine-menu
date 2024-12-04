import { useState, useEffect, createContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  // all menu data
  const [menuItems, setMenuItems] = useState([]);
  // all menu items and section data
  const [menuData, setMenuSectionsData] = useState([]);

  //hold data to edit of that section on which i tap
  const [editSectionData, setEditSectionData] = useState(null);

  // show add new section sheet
  const [showSectionSheet, setShowSectionSheet] = useState(false);

  //select parent section id
  const [sectionParentId, setSectionParentId] = useState(null);

  // to add new sheet
  const toggleSectionSheet = (sectionId) => {
    setEditSectionData(null);
    setSectionParentId(sectionId);
    setShowSectionSheet(true);
  };
  const closeSectionSheet = () => {
    setShowSectionSheet(false);
  };

  // Open the sheet to edit the section
  const openEditSectionSheet = (sectionData) => {
    setEditSectionData(null);
    setEditSectionData(sectionData);
    setSectionParentId(sectionData.parentId);
    setShowSectionSheet(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getMenuesItemsandSections = async (menuId) => {
    // Get the token from localStorage
    const token = localStorage.getItem("Token");

    try {
      console.log(menuId);

      const response = await axios.get(
        `http://localhost:3000/menu/menuitems/${menuId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Handle the response after successfully creating a venue
      if (response.data) {
        console.log("Data of items and secitons", response.data);
        setMenuSectionsData(response.data);
      }
    } catch (err) {
      console.log("Error creating menu with no item:", err);
    }
  };

  // updating section data in backend
  const updateActiveSection = async (isActive) => {
    const sectionId = editSectionData._id;
    const apiUrl = `http://localhost:3000/menu/menusection/${sectionId}`;
    const token = localStorage.getItem("Token");
    try {
      const body={
        isActive:isActive
      }
      // Send the PUT request
      const response = await axios.put(apiUrl, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data.data);

      closeSectionSheet();
    } catch (error) {
      console.error("Error updating section:", error.response || error.message);
    } finally {
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        setMenuItems,
        formatDate,
        menuData,
        setMenuSectionsData,
        getMenuesItemsandSections,
        showSectionSheet,
        toggleSectionSheet,
        sectionParentId,
        closeSectionSheet,
        setSectionParentId,
        openEditSectionSheet,
        editSectionData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
