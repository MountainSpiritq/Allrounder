import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate=useNavigate();
    return (
        <div className='homeMain'>
            <p className='goHome'>🏠</p>
            <h1 className="homeTitle">
                Igatlan ugynokseg
            </h1>
            <div className="homeButtons">
                <input onClick={()=>navigate("/properties")} className='homeButton' type="button" value="Nezze meg kinalatunkat" />
                <input onClick={()=>navigate("/property")}className='homeButton' type="button" value="Hirderssen nalunk" />
            </div>
        </div>
    )
}
