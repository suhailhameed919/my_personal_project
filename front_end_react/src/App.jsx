//need use effect that sends request requiring auth, if fails, you'll know you don't have token (in curriculum)



import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "./utilities";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [savedPredictions, setSavedPredictions] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    whoAmI();
  }, []);
  

  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/info/");
      // Check if the response contains the user data (email field exists)
      if (response.data.username) {
        // Set the user data in the context or state (assuming `setUser` is a state update function)
        setUser(response.data);
        navigate("/home");
        
      }
    } else {
      // If no token is found, navigate to the login page
      navigate("/login");
    }
  };







  
  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
    
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setSavedPredictions([]); // Clearing saved predictions when log out
  };

  const handleSavePrediction = (prediction) => {
    setSavedPredictions([...savedPredictions, prediction]);
  };

  return (
    <>
      <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} />
      <Outlet
        context={{
          loggedIn,
          username,
          savedPredictions,
          // handleLogin,
          // handleSavePrediction,
        }}
      />
    </>
  );
}


