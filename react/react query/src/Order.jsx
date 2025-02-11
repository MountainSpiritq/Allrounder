import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProducts, updateProducts } from './utils';
import { useQuery } from 'react-query';

const Order = () => {
  
  const url='http://localhost:8000/api/flowers/'
  const navigate=useNavigate()

  const {id}=useParams()
  
  const[product,setProduct]=useState(null)
  const[amount,setAmount]=useState(0)
  const {data,isLoading,isError,error}=useQuery({queryKey:['products',url+id],queryFn:getProducts})
  if(isLoading) return <div>loading</div>
  if(isError)return <div>error: {error.message}</div>
  
  data&&console.log(data)
  
  function handleOrder(e){
    e.preventDefault()
    console.log(amount);
    if(data[0].keszlet<amount){
      alert('nincs eleg mennyiseg raktaron')
      navigate('/products')
    }else{
      const updatedProduct={...data[0],keszlet:data[0].keszlet-amount}
     updateProducts(url+data[0].id,updatedProduct)
     alert("siker")
    }
  }

  return (
    <>
    <Header></Header>
    {data && <main className="container"> 
				<h2>{data[0].nev} (Kerti virág)</h2>   
				<div className="row">         
					<div className="col-md-6">
						<img src={data[0].kepUrl} alt={data[0].nev} className="img-thumbnail"/>                    
					</div>
					<div className="col-md-6">
						<p>{data[0].leiras}</p>
            {data[0].keszlet>0 ?
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