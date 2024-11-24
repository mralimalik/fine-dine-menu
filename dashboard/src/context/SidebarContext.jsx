import { useState, useEffect, createContext, useRef } from "react";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const [showVeneueSwitchPopUp, setSwitch] = useState(false);

  const venueSwitchRef = useRef(null); 

  const selectSidebarItem = (index)=>{
    setSelectedItemIndex(index);
    
  }

  const handleVenuePopUp = ()=>{
    setSwitch(!showVeneueSwitchPopUp) 
    console.log("showing pop up",showVeneueSwitchPopUp);
    
  }
  return (
    <SidebarContext.Provider value={{
      selectedItemIndex,
      setSelectedItemIndex,
      selectSidebarItem,
      showVeneueSwitchPopUp,
      handleVenuePopUp,
      setSwitch,
      venueSwitchRef,
      


    }}>{children}</SidebarContext.Provider>
  );
};
