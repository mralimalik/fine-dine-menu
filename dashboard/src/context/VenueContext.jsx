import { useState, useEffect, createContext, useRef } from "react";
import { useParams } from "react-router-dom";
export const VenueContext = createContext();

export const VenueContextProvider = ({ children, venueId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const venueModalRef = useRef(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Function running again as venueId changed");
  }, [venueId]);

  
  return (
    <VenueContext.Provider
      value={{
        isModalOpen,
        venueModalRef,
        handleModalOpen,
        handleModalClose,
        setIsModalOpen,
        venueId,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};
