import React from "react";
import { useNavigate } from "react-router-dom";
import { getDate } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

export default function FindName() {
  let navigate = useNavigate();
  const [date, setDate] = useState("");
    const [msg, setMsg] = useState(null);

  const [data, setData] = useState([]);


  function handleSearch() {
    console.log(date);
    let dates = date.split("-");
    getDate(
      `http://localhost:8000/api/names/${dates[2]}/${dates[1]}`,
      setData,
      setMsg
    );
  }

  return (
    <div className="home">
      <div className="shade">
        <div className="navigation">
          <div onClick={() => navigate("/")} className="homeButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
          </div>
          <div className="findName">
            <div className="">
              <input
               value={date}
                id="date"
                onChange={(e)=>setDate(e.target.value)}
                type="date"
              ></input>
            </div>
            <div onClick={handleSearch} className="button">
              <p>Keresés név szerint </p>
            </div>
            <div className="list">
              <h1>Névnapok:</h1>
              <ul>{data && data.map((obj) => <li key={obj.name} >{obj.name}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
