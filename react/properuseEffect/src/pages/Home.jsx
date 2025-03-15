import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    let navigate=useNavigate()


  return (
    <div className="home">
      <div className="shade">
        <div className="navigation">
          <h1>NÉVNAPKERESŐ</h1>
          <div className="buttons">
            <div onClick={() => navigate("/FindName")} className="button">
              <p>Keresés dátum szerint</p>
            </div>
            <div onClick={() => navigate("/FindDate")} className="button">
              <p>Keresés név szerint </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
