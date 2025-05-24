import React, { useEffect, useState } from 'react'
import { getNovenyek } from '../utils';
import { useNavigate, useParams } from 'react-router-dom';

export default function Plants() {

     const navigate=useNavigate();

    const { id } = useParams();
    const url = `http://localhost:8000/api/plants/${id}`

    const [novenyek, setNovenyek] = useState([]);
    const [msg, setMsg] = useState("");
    useEffect(() => {
        getNovenyek(url, setNovenyek, setMsg)

    }, []);

    const nevUrl = "http://localhost:8000/api/categories"
    const [categs, setCategs] = useState([]);
    const [msgCtg, setMsgCtg] = useState("");

    useEffect(() => {
        getNovenyek(nevUrl, setCategs, setMsgCtg)
    }, []);


    return (
        <>
            <div className="novenyek">
                <div className="title">
                <p onClick={()=>navigate('/')} className='goHome'>🏠</p>
                {categs.map(ctg=>{
                    if(ctg.id==id){
                        return(
                            <h3>{ctg.name}</h3>
                        )
                    }
                })}
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
