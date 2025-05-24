import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getStuff, sendAdat } from '../utils';

export default function Property() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);
    const [data, setData] = useState([]);
    const url = "http://localhost:8000/api/categories"
    const url_post = "http://localhost:8000/api/property"
    const [kategoriaId, setCategory] = useState(0);
    const [leiras, setDescription] = useState('');
    const [hirdetesDatuma, setDate] = useState('');
    const [kepUrl, setPhotoUrl] = useState('');
    const ar = 100000;
    const [tehermentes, setIsTehermentes] = useState(false);
    const jsonData={}
    useEffect(() => {
        getStuff(url, setData, setMsg)
    }, [])

    const handleSubmit = () => {
        const jsonData = {
            kategoriaId,
            leiras,
            hirdetesDatuma,
            tehermentes,
            ar,
            kepUrl
        }
        console.log(jsonData);
        
        sendAdat(url_post,jsonData) 
    }

    return (
        <div className="homeMain">
            <p onClick={() => navigate("/")} className='goHome'>🏠</p>
            <div className="orderForm">
                <h2>Új hirdetés elküldése</h2>

                <p>Ingatlan kategóriája:</p>
                <select
                    value={kategoriaId}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Válassz kategóriát</option>
                    {data.map((categ) => (
                        <option key={categ.id} value={categ.id}>
                            {categ.nev}
                        </option>
                    ))}
                </select>

                <p>Hirdetés dátuma</p>
                <input
                    type="date"
                    value={hirdetesDatuma}
                    onChange={(e) => setDate(e.target.value)}
                />

                <p>Ingatlan leírása</p>
                <textarea
                    value={leiras}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <p>A fotó URL-je</p>
                <input
                    type="text"
                    value={kepUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <p>Tehermentes ingatlan</p>
                <input
                    type="checkbox"
                    checked={tehermentes}
                    onChange={(e) => setIsTehermentes(e.target.checked)}
                />

                <input
                    className='homeButton'
                    type="button"
                    value="Küldés"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}
