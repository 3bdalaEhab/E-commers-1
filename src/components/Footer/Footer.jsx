import React from 'react'
const image1 = process.env.PUBLIC_URL + '/2c9e4c69-39be-466d-b3ac-167ca84d303b.jpg';
export default function Footer() {
  return (
    <footer className=' position-sticky    footer rounded-top-5 w-100 mt-5 '>
<div className=' py-3 px-5'>
        <h3>Get The Fresh Cart App</h3>
        <p>we will send you a link, open it on your phone to download the app</p>
        <div className="row justify-content-between">
          <div className="col-md-8">
            <input className='form-control' type="text" />
          </div>
          <div className="col-md-4 text-center mt-1 ">
            <button className='bg-main btn text-white w-50'>Share App Link</button>
          </div>
        </div>
        <hr  className=' opacity-25'/>
        <img width={100} className='w-100' src={image1} alt="" />
        <hr  className=' opacity-25'/>
</div>
    </footer>
  )
}
