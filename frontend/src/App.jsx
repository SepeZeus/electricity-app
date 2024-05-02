import "./App.css";
import { CurrentPrice, SixHourData } from "./apis/ElectricityAPIHelper.jsx";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import React, { useContext } from "react";

function App() {
  return (
    <>
      <div className="content-container">
        <div className="content-sub-container">
          <h1>Sähkövahti</h1>
          <br></br>
          <div style={{ padding: "0px", margin: "0px" }} className="content">
            <p style={{ fontSize: "42px", fontWeight: "600", margin: "0px" }}>
              Nyky hinta:
            </p>
          </div>
          <div className="center-container">
            <div className="price-container">
              <CurrentPrice />
            </div>
          </div>

          <div className="content">
            <SixHourData />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
