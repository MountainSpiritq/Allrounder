import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getNovenyek } from '../utils';

export default function SearchedPlant() {
    const { plant } = useParams();
    const navigate=useNavigate();
    const url = `http://localhost:8000/api/search/${plant}`
    const [novenyek, setNovenyek] = useState([]);
    const [msg, setMsg] = useState(null);
    useEffect(() => {
        getNovenyek(url, setNovenyek, setMsg)

    }, []);

    console.log(msg);
    
    return (
        <>
            
            <div className="novenyek">
                <div className="title">

                    <p onClick={() => navigate('/')} className='goHome'>🏠</p>
                    
                    
                    
                    <h3>{ msg? msg : "talalatok a(z) "+plant+" -re"}</h3>
                </div>
                <div className="cardContainer">
                    {novenyek.map(noveny => {
                            console.log(noveny);
                            
                        return (

                            <div key={noveny.id} className="novenyCard">
                                <img className='novenyPhoto' src={noveny.photo} alt="" />
                                <div className="cardDesc">
                                    <h3>{noveny.name}</h3>
                                    <p>{noveny.descr}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
