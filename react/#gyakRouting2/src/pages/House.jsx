import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getStuff } from '../utils';

export default function House() {
    const [msg, setMsg] = useState(null);
    const [data, setData] = useState([]);
    const [ctgMsg, setCtgMsg] = useState(null);
    const [categs, setCategs] = useState([]);
    const url_categories = "http://localhost:8000/api/categories"
    const { id } = useParams()
    const url = "http://localhost:8000/api/property/" + id
    const navigate=useNavigate();
    console.log(id);
    useEffect(() => {
        getStuff(url, setData, setMsg)
        getStuff(url_categories, setCategs, setCtgMsg)
    }, [])

    
    return (
        <div className="propertiesHome">
             <p onClick={()=>navigate("/")} className='goHome'>🏠</p>
                {data.map((obj) => (
                    <div className='houseCard'>

                        {categs.map((categ) => {
                            if (categ.id == obj.kategoriaId) {
                                return <h4>{categ.nev}</h4>
                            }
                        })}
                        <img src={obj.kepUrl} alt="" />
                        <p>{obj.leiras}</p>
                        <p><b>Ara:</b> {obj.ar}</p>
                        <button onClick={()=>navigate("/properties")} className='homeButton'>Vissza a fooldalra</button>
                    </div>
                        
                ))}

            
        </div>
    )
}
