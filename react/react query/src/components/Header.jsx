import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {

  const navigate=useNavigate()
  return (
    
      <div>
      <header>
			<a onClick={()=>navigate('/')} ><img src="./sunflower.jpg" alt="fa" id="logo" /></a>
			<h1>Nevenincs Bt.</h1>
			<h2>Vetőmagok - Mindenféle, minden mennyiségben</h2>
		</header>
    </div>
    
  )
}
