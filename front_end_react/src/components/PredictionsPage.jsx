import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PredictionCard from "./PredictionCard"; 
import { api } from "../utilities";

export default function PredictionsPage() {
  const { savedPredictions, setSavedPredictions } = useOutletContext();
  const [data, setData] = useState([]);

  console.log("Saved Predictions:", savedPredictions)


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await api.get("predictions/viewpredictions/", {
          headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
          }
        }); 
        setData(response.data);
      } catch (error) {
        console.error("Error getting the saved predictions:", error);
      }
    };

    fetchData();
  }, []);


 

  return (
    <div>
      <h2>Predictions</h2>
      {data.length === 0 ? (
        <p>No predictions saved yet.</p>
      ) : (
        <div>
          {data.map((prediction, index) => (
            <PredictionCard key={index} prediction={prediction}  />
          ))}
        </div>

      )}
    </div>
  );
}
