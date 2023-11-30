import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import  Slider  from 'react-slick/lib/slider';

export default function CategoriesSlider() {


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

function getCategoriesSlider(){
return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
let {data} = useQuery("allCategories",getCategoriesSlider)


  return <>
   <div className="container mt-4">
    <h3>Shop Popular Categories</h3>
   <div className='row'>
    <Slider  {...settings}>
       
  {data?.data?.data?.map((pro,indx)=><div className='col-md-3' key={indx}>
    <img height={300} className='w-100 mb-3' src={pro.image} alt="" />
    <h4>{pro.name.split(" ").slice(0,1).join(" ")}</h4>
  </div>)}
    </Slider>
   </div>
   </div>
  
    
  </>
}
