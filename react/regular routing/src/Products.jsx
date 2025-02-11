import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import { getProducts } from './utils'
import { useNavigate } from 'react-router-dom'
const Products = () => {
  const url='http://localhost:8000/api/flowers'

  const navigate=useNavigate()

  const [products,setProducts]=useState([])

  useEffect(()=>{
    getProducts(url,setProducts)
  },[])

  products&&console.log(products);
  

  return (
    <>
    <Header/>
   
    <main className="container">  
			<div className="row">
				<h2>Vetőmagjaink:</h2>
    {products&&products.map(obj=>
      <div key={obj.id} className="col-lg-4 mt-4 arukep">
					<h4>{obj.nev}</h4>
				<a onClick={()=>navigate('/order/'+obj.id)}>	<img src={obj.kepUrl} alt="Dália" className="img-fluid"/></a>
				</div>
    )}
     </div>
    </main>

    <Footer></Footer>
    </>

  )
}

export default Products