import { useState, useEffect, createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userVenues, setUserVenues] = useState([]);
  const [token, setToken] = useState("");
  // const selectedVenue = useRef(null);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const navigate = useNavigate();

  const setUserDataLocal = (currentUserData) => {
    setToken(currentUserData.token);
    localStorage.setItem("Token", currentUserData.token);
    setUserData(currentUserData.data.user);
    setUserVenues(currentUserData.data.venues);
    // Set selected venue after venues have been updated
    if (currentUserData.data.venues && currentUserData.data.venues.length > 0) {
      // selectedVenue.current = currentUserData.data.venues[0];
      setSelectedVenue(currentUserData.data.venues[0]);
    } else {
      // selectedVenue.current = null;
    }
  };

  const getUserDataLocal = async () => {
    try {
      const userToken = localStorage.getItem("Token");
      if (userToken) {
        setToken(userToken);
        await fetchUserData(userToken);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error retrieving user token:", error);
      navigate("/login");
    }
  };

  const fetchUserData = async (userToken) => {
    try {
      const response = await axios.get("http://localhost:3000/user/", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setUserData(response.data.data.user);

        setUserVenues(response.data.data.venues);
        // Set the selected venue after userVenues are updated
        if (response.data.data.venues && response.data.data.venues.length > 0) {
          // selectedVenue.current = response.data.data.venues[0];
          setSelectedVenue(response.data.data.venues[0]);
        } else {
          // selectedVenue.current = null;
        }

        // Do not navigate until selectedVenue is set
        if (selectedVenue) {
          navigate(`/venue/${selectedVenue.venueId}/dashboard`);
        } else {
          navigate(`/venue/dashboard`);
        }

        console.log("navigating to dashaoad after getting");
      }
    } catch (err) {
      console.error(
        "Error fetching user data:",
        err.response?.data?.message || err
      );
      localStorage.removeItem("Token");
      navigate("/login");
    }
  };

  // Sign in function to call the API
  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });
      if (response.status === 200) {
        const currentUserData = response.data;
        console.log(currentUserData.data);

        setUserDataLocal(currentUserData);
        if (selectedVenue) {
          navigate(`/venue/${selectedVenue.venueId}/dashboard`);
        } else {
          navigate(`/venue/dashboard`);
        }
      }
    } catch (err) {
      console.error("Error signing in:", err.response?.data?.message || err);
    }
  };

  useEffect(() => {
    getUserDataLocal();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        userVenues,
        setUserVenues,
        selectedVenue,
        userData,
        setSelectedVenue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
