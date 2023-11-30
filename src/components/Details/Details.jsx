import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick/lib/slider';
import { CartContext } from '../CounterContext/CartContext';
import toast from 'react-hot-toast';
import Footer from '../Footer/Footer';
export default function Details() {
const [ProductData, setProductData] = useState([])
const [isLoading, setIsLoading] = useState(true)
let idProduct = useParams()  
let {addToCart,setNumOfCartItems} = useContext(CartContext)

  async function details(id){
try {
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  setIsLoading(false)
  setProductData(data.data) 

} catch (error) {
  console.log("Api details" , error);
}}
console.log(ProductData); 

useEffect(()=>{
details(idProduct.id)

},[])
async function inCart(id){
  let data = await addToCart(id)
if(data.data.status === "success"){
toast.success(`product added successfully`,{  duration: 2000})
setNumOfCartItems(data?.data?.numOfCartItems)

}else{
  toast.error(`product added successfully`,{  duration: 2000})

}
}


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  }


return <>
{isLoading? 
<div className='d-flex justify-content-center   align-items-center h-100'>
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
</div> :


  <div className="container h-75">
    <div className="row gx-3 gy-5 pt-4 justify-content-between align-items-center">
      <div className="col-md-3">
       <div>
        <Slider  {...settings}>
          
            {ProductData.images.map((url,indx)=><img key={indx} className='w-100 mb-4' src={url} alt={ProductData.title} />)}
          
        </Slider>
      </div>
      </div>
        <div className="col-md-9">
        <h2>{ProductData.title}</h2>
        <p >{ProductData.description}</p>
        <p className='text-main  h5'>{ProductData.category.name}</p>
        <div className="d-flex pt-2 justify-content-between">
          <h5 className='fw-bold'>{ProductData.price} EGP</h5>
          <h5 className='fw-bold'>
            <i className="fa fa-star rating-color"></i> {ProductData.ratingsAverage}
          </h5>
        </div>
        <button onClick={()=>inCart(idProduct.id)} className="btn bg-main w-100 text-white mt-2">Add to cart</button>
      </div>
    </div>
  </div>


} 
<Footer />

</>
}
