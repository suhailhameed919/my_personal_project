import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
    

  const handleLogin = async (e) => {
    console.log("handlelogin function called")
    e.preventDefault();
  
    try {
      const response = await api.post("users/login/", { email: username, password });
      console.log(response)
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);




  
        // Set the token in axios headers for future requests
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        // console.log("if statement")
        // onLogin(username);
        navigate("/home")


      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid username or password");
    }

  };

  return (
    <div>
      <h1>Invest4Tomorrow</h1>
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">Register here</Link> 
      </p>
    </div>
  );
}



async function login(email, password) {
  try {
    const response = await axios.post("/login/", { email, password });

    if (response.status === 200) {
      const token = response.data.token;

      // Set the token in axios headers for future requests
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      return true; // Return success flag
    } else {
      return false; // Return failure flag
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return false; // Return failure flag
  }
}

