import { Outlet, useParams } from "react-router-dom";
import { VenueContextProvider } from "../../context/VenueContext.jsx";
import { MenuContextProvider } from "../../context/MenuContext";
function VenueLayout() {
  const { venueId } = useParams(); // Access venueId from the URL

  return (
    <div>
      <VenueContextProvider>
        <MenuContextProvider>
          <Outlet />
        </MenuContextProvider>
      </VenueContextProvider>
    </div>
  );
}

export default VenueLayout;
