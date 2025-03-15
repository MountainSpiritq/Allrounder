import React from 'react'
import { useState } from 'react';
import { getDate } from '../utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function FindDate() {
      let navigate = useNavigate();
         let honapok = [
           "January",
           "February",
           "March",
           "April",
           "May",
           "June", 
           "July",
           "August",
           "September",
           "October",
           "November",
           "December",
         ];

    let url_base = "http://localhost:8000/api/";
    const [name, setName] = useState("");
    const [data, setData] = useState(null);
    const [desc, setDesc] = useState(null);
        const [msg, setMsg] = useState(null);

    
   function handleSearch() {
    console.log(name);
    if(name){
      getDate(url_base+`dates/${name}`,setData,setMsg)
      getDate(url_base+`info/${name}`,setDesc,setMsg)
    }
   }
    console.log(data);
    
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
                value={name}
                onChange={(e)=>setName(e.target.value)}
              ></input>
            </div>
            <div onClick={handleSearch} className="button">
              <p>Keresés név szerint </p>
            </div>
            <div className="adat">
              {data &&
                data.map((obj) => (
                  <p key={obj.name}>
                    {honapok[obj.month-1]} - {obj.day}
                  </p>
                ))}
              {desc &&
                desc.map((obj) => (
                  <p key={obj.name}>
                    {obj.descr}
                  </p>
                ))}
              <p className="message">
                {msg}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
