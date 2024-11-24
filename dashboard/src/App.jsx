import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main/Main.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MenuManagement from "./pages/MenuManagement/MenuManagement.jsx";
import MenuEditor from "./pages/MenuEditor/MenuEditor.jsx";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";
import { VenueContextProvider } from "./context/VenueContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <SidebarContextProvider>
          <VenueContextProvider>
            <Routes>
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Login Page */}
              <Route path="login" element={<Login />} />

              {/* Protected Routes */}
              <Route path="venue/:venueId?" element={<Main />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="menu-management" element={<MenuManagement />}>
                  <Route path=":menuId" element={<MenuEditor />} />
                </Route>
              </Route>

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </VenueContextProvider>
        </SidebarContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
