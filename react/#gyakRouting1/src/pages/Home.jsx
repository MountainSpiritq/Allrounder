import React, { useEffect, useState } from 'react'
import { getNovenyek } from '../utils'
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const url = "http://localhost:8000/api/categories"
    const [categs, setCategs] = useState([]);
    const [msg, setMsg] = useState("");
      const [query, setQuery] = useState("");
    useEffect(() => {
        getNovenyek(url, setCategs, setMsg)

    }, []);

    const navigate=useNavigate();

    return (
        <>
            <div className="homeContainer">
                <p onClick={()=>navigate('/')} className='goHome'>🏠</p>
                <div className="homeLeft">
                    <div className="centerLeft">
                    <p className='plant'>🌿</p>
                    <h1>Termeszet Kezikonyve</h1>
                    <h4>Fedezd fel a novenyek gyumolcsok es fuszerek vilagat!</h4>
                    <div className="search">
                        <input onChange={(e)=>setQuery(e.target.value)} type="text" value={query}/>
                        <input onClick={()=>navigate(`/searchedplants/${query}`)} type="button" value="🔍" />
                    </div>
                    </div>
                </div>

                <div className="homeRight">
                    {categs.map(categ => {
                        console.log(categ.photo);
                        return (
                            <div onClick={()=>navigate(`/plants/${categ.id}`)} className="card" key={categ.id}>
                                <img className='cardImage' src={categ.photo} alt="Avatar" />
                                <div className="container">
                                    <p>{categ.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    )
}
