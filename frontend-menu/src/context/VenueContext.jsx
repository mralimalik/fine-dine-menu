import { useState, useEffect, createContext, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MenuContext } from "./MenuContext.jsx";
export const VenueContext = createContext();

export const VenueContextProvider = ({ children }) => {
  const { venueId } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchVenueData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/venue/qr/${venueId}`);
      if (response.status === 200) {
        setVenueData(response.data.venue);
        setMenus(response.data.menus);
      }
    } catch (err) {
      console.error("Error fetching venue data:", err.response?.data?.message || err);
    }
  };
  useEffect(() => {
    fetchVenueData();
  }, []);

  return (
    <VenueContext.Provider
      value={{
        fetchVenueData,
        venueData,
        setVenueData,
        menus,
        selectedMenu,
        setSelectedMenu,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};
