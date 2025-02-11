import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

	const navigate=useNavigate()

  return (
   <>
   <div id="nyito">
		<header>
			<a><img src="./sunflower.jpg" alt="fa" id="logo" /></a>
			<h1>Nevenincs Bt.</h1>
			<h2>Vetőmagok - Mindenféle, minden mennyiségben</h2>
		</header>
		<main onClick={()=>navigate('/products')}>        
			<a>Válasszon vetőmagjainkból!</a>
		</main>
		
	</div>
   </>
  )
}

export default Home