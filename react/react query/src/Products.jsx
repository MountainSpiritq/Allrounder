import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import { getProducts } from './utils'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
const Products = () => {
  const url='http://localhost:8000/api/flowers'

  const navigate=useNavigate()
  const {data,isLoading,isError,error}=useQuery({queryKey:['products',url],queryFn:getProducts})
  if(isLoading) return <div>loading</div>
  if(isError)return <div>error: {error.message}</div>
  


  data&&console.log(data);
  

  return (
    <>
    <Header/>
   
    <main className="container">  
			<div className="row">
				<h2>Vetőmagjaink:</h2>
    {data&&data.map(obj=>
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