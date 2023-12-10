import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function SpecificCategory() {
  const [specific, setSpecific] = useState({})
let param = useParams()

async function SpecificCategory(){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${param.id}`)
  setSpecific(data)
}

useEffect(()=>{
  SpecificCategory()
},[])



  return <>
  <div className="container py-5">
    <div className="row g-3 justify-content-between align-items-center">
      <div className="col-md-4">
        <img className='w-100 rounded-3' src={specific?.data?.image} alt="" />
      </div>
      <div className="col-md-8 text-center">
        <div>
          <h2 className='fw-bold '>Catgory Name</h2>
          <h2 className='text-main'>{specific?.data?.name}</h2>
        </div>
      </div>
    </div>
  </div>
  
  </>
}
