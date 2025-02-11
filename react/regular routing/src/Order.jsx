import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSingleProduct, updateProducts } from './utils';

const Order = () => {
  
  const url='http://localhost:8000/api/flowers/'
  const navigate=useNavigate()

  const {id}=useParams()
  const[product,setProduct]=useState(null)
  const[amount,setAmount]=useState(0)
  const [msg,setMsg]=useState(null)
  useEffect(()=>{
    getSingleProduct(url+id,setProduct)
  },[])
useEffect(()=>{
  if(product&&product[0].keszlet>0){
    setAmount(1)}
},[product])

useEffect(()=>{
  if(msg){
    alert(msg?.msg)
    navigate('/products')
  }

},[msg])

  console.log(id);
  console.log(product);
  
  function handleOrder(e){
    e.preventDefault()
    console.log(amount);
    if(product[0].keszlet<amount){
      alert('nincs eleg mennyiseg raktaron')
      navigate('/products')
    }else{
      const updatedProduct={...product[0],keszlet:product[0].keszlet-amount}
     updateProducts(url+product[0].id,updatedProduct,setMsg)
    }
  }

  return (
    <>
    <Header></Header>
   {product && <main className="container"> 
				<h2>{product[0].nev} (Kerti virág)</h2>   
				<div className="row">         
					<div className="col-md-6">
						<img src={product[0].kepUrl} alt={product[0].nev} className="img-thumbnail"/>                    
					</div>
					<div className="col-md-6">
						<p>{product[0].leiras}</p>
            {product[0].keszlet>0 ?
						<form>
							<p className="text-center"><span id="ar">Ár: 356 Ft</span>
								<label for="mennyiseg">Mennyiség: </label>
								<input onChange={(e)=>setAmount(e.target.value)} type="number" name="mennyiseg" id="mennyiseg" min="1" max="999" value={amount} />
							</p>
							<p className="text-center"><button onClick={handleOrder} className="btn btn-warning btn-lg">Megrendelem</button></p>
						</form>:<p>
              nincs</p>}
					</div>
				</div>
		   
		</main>}
    <Footer></Footer>
    </>
  )
}

export default Order