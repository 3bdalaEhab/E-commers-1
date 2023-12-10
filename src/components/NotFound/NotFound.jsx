import React from 'react'
const notFound = process.env.PUBLIC_URL + '/error.svg';

export default function NotFound() {
  return <>
  
<div className=' text-center w-100 mt-5 pt-5'>
  <p className='fw-bold h4 text-danger my-5'>" The page you are looking for might not exist or has been moved "</p>
  <img className='w-50' src={notFound} alt="Not Found" />
  
</div>
  
  </>
}
