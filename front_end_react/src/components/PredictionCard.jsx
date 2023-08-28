import React from "react";
import { api } from "../utilities";

export default function PredictionCard({ prediction }) {
  // const { name, annual_income, monthlyExpenses, incomeIncrease, years, futureNetWorth } = prediction;
  console.log("Prediction data:", prediction);
  const { prediction_name, state, filing_status, annual_income, avg_monthly_expenses, current_net_worth, future_net_worth, user_id } = prediction;


  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await api.delete(`predictions/deleteprediction/${prediction.id}/`, {
        headers: {
          "Authorization": `Token ${token}`
        }
      });

      if (response.status === 204) {
        console.log("prediction deleted")
        window.location.reload();

      }
    } catch (error) {
      console.error("Error deleting prediction:", error);
    }
  };






  return (
    <div className="prediction-card">
      <h3>Prediction: {prediction_name}</h3>
      <p>state: {state}</p>
      <p>Filing Status: {filing_status}</p> 
      <p>Annual Income: {annual_income}</p> 
      <p>Average Monthly Expenses: {avg_monthly_expenses}</p>
      <p>Current Net Worth: {current_net_worth}</p>
      <p>This is what 20 years of compounding at 8% looks like</p>
      <p>This doesn't even include your contribitions.</p>

      <p>Future Net Worth: {future_net_worth}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
