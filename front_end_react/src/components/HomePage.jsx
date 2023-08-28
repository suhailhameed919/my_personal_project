import React, { useState, useEffect } from "react";
import { api } from "../utilities";

export default function HomePage() {
  const [cerealData, setCerealData] = useState([]);
  const [inflationData, setInflationData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("predictions/homepagedata/"); 
        const data = response.data;

        setInflationData(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Welcome!</h2>
      <p>Can we agree that your $20 bill is not nearly worth as much as it was a few years ago?</p>

      <p>As of the previous month on your calendar, inflation is at {inflationData.monthly_rate_pct}% for the month, and {inflationData.yearly_rate_pct}% for the year</p>  

      <p>We can't control the world around us, but we can improve our own finances.</p>
      <p>The goal with this app is to help you visualize your future finances.</p>
      <p>If you can set up your financial future, that inflation won't bother you as much</p>
      <p>Please Go to the predictions calculator to get started.</p>
    </div>
  );
}
