import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

export default function AllOrders() {
  const [ordersData, setOrdersData] = useState([]);
  const [isloading, setIsloading] = useState(true)

  let headers = { token: localStorage.getItem(`userToken`) }; 
  const decoded = jwtDecode(String(headers.token));

  

function allOrders() {
  return  axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`,
    );
  }
  useQuery("allOrders", allOrders);
  async function fetchOrders() {
    const {data,isLoading} = await allOrders();
    setOrdersData(data);
    setIsloading(isLoading)
  }

  useEffect(() => {
    fetchOrders();
  }, []);



return   <>
{isloading?<div className='d-flex justify-content-center align-items-center h-100'>
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
    </div>:<div className="container w-75 m-auto    bg-light">
    <h1 className="mb-2">AllOrders</h1>

{!ordersData ?<div className='py-5 '>
  <Link to={"/"} className=' text-main d-block text-center fw-bold h2 p-2 '>Go To Home</Link>
  <i class="fa-regular h3 text-center d-block rating-color  m-auto fa-hand-point-up"></i>
 </div>:<>{ordersData?.map((order,indx)=><> <div key={indx} className="row ">
<h3 className="text-center text-main mb-3 bg-black py-2 fw-bold ">order {`${indx + 1}`}</h3>
{order?.cartItems.map((ele,indx)=><>
<div key={indx} className="row mb-2 align-items-center">
<div className="col-md-3">
  <img className="w-100" src={ele.product.imageCover} alt="" />
</div>
<div className="col-md-9 d-flex justify-content-between">
  <div>
<h5 className="text-main">{ele.product.title.split(" ").slice(0,2).join(" ")}</h5>
<br />
<h5> Price: <span className="text-main fw-bold"> {ele.price} EGP</span></h5>
<br />
<h5>Count: <span className="text-main">{ele.count}</span></h5>
  </div>
<hr />
</div>
</div>
</>
)}
 </div>
 
<h4 className="  text-center   fw-bold my-2">TotalOrderPrice: <span className="text-main ps-1">{order.totalOrderPrice} EGP</span></h4>
<hr />
 </>
   )} </> }
</div>}

</>

}
