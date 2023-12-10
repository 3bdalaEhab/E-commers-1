import React from 'react'
import { CounterContext } from '../CounterContext/CounterContext';
import { useContext, useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { CartContext } from '../CounterContext/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Wishlist() {
const [getProductInWish, setGetProductInWish] = useState([])
const [sLoading, setIsLoading] = useState(true)

const {getWishlist,removeInWishlist} = useContext(CounterContext)
const {addToCart,setNumOfCartItems} = useContext(CartContext)






 async function removeProductFromWishlist(id){
   await removeInWishlist(id)
   await getInWishlist()


  }
 async function addtoCart(id){
   let data = await addToCart(id)
   if(data.data.status === "success"){
    toast.success(`Product added successfully at your cart`,{  duration: 2000})
    setNumOfCartItems(data?.data?.numOfCartItems)

    }else{
      toast.error(`Error adding item to cart`,{  duration: 2000})
    
    }
  }
 async function getInWishlist(){
   let {data} = await getWishlist()
   setGetProductInWish(data)
   setIsLoading(false)
  }

  useEffect(()=>{
    getInWishlist()
  },[])



  return <>

  {sLoading?
   <div className='d-flex justify-content-center align-items-center h-75'>

   <BallTriangle
  height={150}
  width={150}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
   </div>
:

<div className="container w-75 m-auto bg-light pt-5">
<div className='my-3'>
<h2>Wishlist Products</h2>

{getProductInWish==false?<div className='py-5'>
  <Link to={"/"} className=' text-main d-block text-center fw-bold h2 p-2 '>Go To Home</Link>
  <i class="fa-regular h3 text-center d-block rating-color  m-auto fa-hand-point-up"></i>
 </div>:""}

 </div>  




 
  <> {getProductInWish?.map((ele,indx)=><div key={indx} className="row p-2">
      <div className="col-md-2">
          <img className='w-100  rounded-2' src={ele.imageCover} alt="" />
      </div>
      <div className="col-md-10 d-flex align-items-center justify-content-between">
          <div className='mx-3  p-0'>
            <h3>{ele.title.split(" ").slice(0,2).join(" ")}</h3>
            <h5 className='text-main '>{ele.price} EGP</h5>
            <button onClick={()=>removeProductFromWishlist(ele.id)}   className='p-0 text-danger btn fw-bold'><i class="fa-solid fa-trash-can"></i> Remove</button>
          </div>
    <div className="d-flex align-items-center ">
  
        <button onClick={()=>addtoCart(ele.id)} className='btn bg-main text-white'>Add To Cart</button>
        
      </div>
  </div>
  </div>)}
  </> 
 

  
  
  




  </div>}



  </>
  
  
   
  
}
