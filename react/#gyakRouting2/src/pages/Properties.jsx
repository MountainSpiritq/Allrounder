import React, { useEffect, useState } from 'react'
import { getStuff } from '../utils';
import { useNavigate } from 'react-router-dom';

export default function Properties() {
    const [msg, setMsg] = useState(null);
    const [data, setData] = useState([]);
    const [ctgMsg, setCtgMsg] = useState(null);
    const [categs, setCategs] = useState([]);
    const url = "http://localhost:8000/api/property"
     const url_categories = "http://localhost:8000/api/categories"
    const navigate=useNavigate();
    useEffect(() => {
        getStuff(url, setData, setMsg)
        getStuff(url_categories,setCategs,setCtgMsg)
    }, [])

    console.log(data);
    console.log(categs);
    

    return (
        <div className='propertiesHome'>
            <div className="title">
                <p onClick={()=>navigate("/")} className='goHome'>🏠</p>
                <h1>Aktualis ajanlataink</h1>
            </div>
            <div className="cardContainer">
                {data.map((house) => (
                    <div className="card">
                            {categs.map((categ)=>{
                                if (categ.id==house.kategoriaId) {
                                    return <h4>{categ.nev}</h4>
                                }
                            })}
                        <p>{(new Date(house.hirdetesDatuma)).toLocaleDateString("hu")}</p>
                        <img className='cardImg' src={house.kepUrl} alt="" />
                        <button onClick={(e)=>navigate("/house/"+e.target.value)} value={house.id}>Reszletek</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
