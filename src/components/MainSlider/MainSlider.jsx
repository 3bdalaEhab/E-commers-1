import React from 'react'
import Slider from 'react-slick/lib/slider'
const slide1 = process.env.PUBLIC_URL + '/slider-image-1.jpeg';
const slide2 = process.env.PUBLIC_URL + '/slider-image-2.jpeg';
const slide3 = process.env.PUBLIC_URL + '/slider-image-3.jpeg';
const slide4 = process.env.PUBLIC_URL + '/slider-2.jpeg';
const slide5 = process.env.PUBLIC_URL + '/grocery-banner-2.jpeg';
const image1 = process.env.PUBLIC_URL + '/images.jpg';
const image2 = process.env.PUBLIC_URL + '/assortment-citrus-fruits.png';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    arrows:false,
    slidesToScroll: 1,
    
  }
  return <>
  <div className="container pt-4 mt-5  ">
    <div className="row g-0">
      <div className="col-md-9   col-12">
        
        <Slider  {...settings}>
  
        <img height={400} className='w-100' src={slide1} alt="image" />
        <img height={400} className='w-100' src={slide2} alt="image" />
        <img height={400} className='w-100' src={slide3} alt="image" />
        <img height={400} className='w-100' src={slide4} alt="image" />
        <img height={400} className='w-100' src={slide5} alt="image" />
   
        </Slider>
    
      
      </div>
      <div className="col-md-3   col-12">
        <img height={200} className='w-100' src={image2} alt="image" />
        <img height={200} className='w-100' src={image1} alt="image" />
      </div>
    </div>
  </div>
  
  
  
  
  </>
}
