import { useState, useEffect, createContext, useRef } from "react";
import { useParams } from "react-router-dom";
export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <MenuContext.Provider
      value={{
        menuItems,
        setMenuItems,
        formatDate,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
