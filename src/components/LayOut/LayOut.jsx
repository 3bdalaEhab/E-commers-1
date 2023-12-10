import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { Toaster } from 'react-hot-toast';


export default function LayOut() {
  return <>
    <NavBar/>
    <div className="container-fluid vh-100">
    <Outlet/>
    <Toaster/>
    </div>


  </>
}
