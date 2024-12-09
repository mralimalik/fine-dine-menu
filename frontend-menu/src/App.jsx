import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import MenuHome from "./pages/MenuHome/MenuHome.jsx";
import VenueLayout from "./pages/Layout/Layout.jsx";
import ItemDetail from "./pages/ItemDetailPage/ItemDetail.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route with a dynamic parameter */}
        <Route path="/:venueId" element={<VenueLayout />} >
          {/* Nested routes */}
          <Route path="" element={<Home />} /> {/* Default nested route */}
          <Route path="menu/:menuId" element={<MenuHome />} />
          <Route path="menu/:menuId/item/:itemId" element={<ItemDetail />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
