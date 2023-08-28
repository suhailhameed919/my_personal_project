import { createBrowserRouter, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./components/LoginPage.jsx";
import HomePage from "./components/HomePage.jsx";
import CalculatorPage from "./components/CalculatorPage.jsx";
import PredictionsPage from "./components/PredictionsPage.jsx";
import Error404Page from "./components/Error404Page";
import SignupPage from "./components/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/calculator",
        element: <CalculatorPage />,
      },
      {
        path: "/predictions",
        element: <PredictionsPage />,
      },
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },
]);



export default router;
