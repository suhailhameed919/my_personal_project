import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";



export default function CalculatorPage() {
  const { savedPredictions, setSavedPredictions } = useOutletContext();
  
  const [state, setState] = useState("NC");
  const [filing_status, setfiling_status] = useState("single");
  const [annual_income, setannual_income] = useState(1);
  const [avg_monthly_expenses, setavg_monthly_expenses] = useState(0);
  const [current_net_worth, setcurrent_net_worth] = useState(0);
  const [prediction_name, setprediction_name] = useState("your prediction");


  const tax_rate = 0.22; //based on average tax bracket 
  const growth_rate = 0.08; 
  const years = 20; 
  const net_income = annual_income * (1 - tax_rate);


  

  const handleAddPrediction = async (e) => {
    e.preventDefault();

    try {
      console.log(filing_status)
      const future_net_worth = current_net_worth * Math.pow(1 + growth_rate, years); 
      const response = await api.post("predictions/createprediction/", { state, filing_status, annual_income, avg_monthly_expenses, current_net_worth, prediction_name, future_net_worth });

      if (response.status === 201) {
        console.log("Post request successful, prediction created");
        
      } 
    } catch (error) {
      console.log(error)
      console.error("Error during prediction creation:", error.message);
      // setErrorMessage("user already exists");

    }
  };




  return (
    <div>
      <h2>Net Worth Calculator</h2>
      <form onSubmit = {handleAddPrediction}>
          <p>
          This is a very simple calculator giving you a rough estimate of where you stand financially, assuming you are a filing a w2. 
          </p>
          
        <div>
          <label htmlFor="name">State:</label>
          <input
            type="text"
            id="state"
            value = {state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Filing Status:</label>
          <input
            type="text"
            id="filing_status"
            value = {filing_status}
            onChange={(e) => setfiling_status(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Taxable household income:</label>
          <input
            type="text"
            id="annual_income"
            value = {annual_income}
            onChange={(e) => setannual_income(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Average Monthly expenses:</label>
          <input
            type="text"
            id="averagemonthlyExpenses"
            value = {avg_monthly_expenses}
            onChange={(e) => setavg_monthly_expenses(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name">Current Net Worth:</label>
          <input
            type="text"
            id="current_net_worth"
            value = {current_net_worth}
            onChange={(e) => setcurrent_net_worth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Prediction Name:</label>
          <input
            type="text"
            id="prediction_name"
            value = {prediction_name}
            onChange={(e) => setprediction_name(e.target.value)}
          />
          </div>

        <button variety = "primary" type = "submit">
          Save to Predictions Page

        </button>

      </form>
      
    </div>
  );
}


