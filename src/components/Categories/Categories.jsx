import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Catgories() {
const [getCatgories, setGetCatgories] = useState([])

async function getCatgory(){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  setGetCatgories(data.data)
  console.log(data.data);
}

useEffect(()=>{
  getCatgory()
},[])



  return <>
  
  <div className="container h-100 ">
    <div className="row gx-3">
      {getCatgories.map((ele,indx)=><Link to={"/SpecificCategory/" + ele._id} key={indx} className="col-md-3">
        <div  className='border text-center  mb-4 border-1 shadow rounded-2'>
          <img height={350} className='w-100' src={ele?.image} alt="" />
          <h3 className='fw-bold py-1'>{ele.name}</h3>
        </div>
      </Link>)}
    </div>
  </div>
  
  
  </>
}
