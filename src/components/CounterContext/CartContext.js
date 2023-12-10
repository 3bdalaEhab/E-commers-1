import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let headers = { token: localStorage.getItem(`userToken`) };

function addToCart(id) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId: id,
    },
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err)
}
function getCart() {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err)

}
function deleteProductFromCart(id) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err)
}
function deleteAllProductFromCart() {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err)
}
function updateCountInCart(id,count) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      count
    },
    {
      headers
    }
  ).then((res)=>res).catch((err)=>err)
}




export default function CartContextProvider(props) {
  const [CartId, setCartId] = useState(null)
  const [numOfCartItems, setNumOfCartItems] = useState(null)
  function onlinePayment(shippingAddress){
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`,{
        shippingAddress
      },
      {
        headers
      }
    ).then((res)=>res).catch((err)=>err)
    
  }
  async function getCountCart(){
    let {data} = await getCart()
    setNumOfCartItems(data?.numOfCartItems)
    setCartId(data?.data._id)

  }
  
  useEffect(()=>{
    getCountCart()
  },[])
  return (
    <CartContext.Provider value={{ addToCart , getCart ,deleteProductFromCart,deleteAllProductFromCart,updateCountInCart,onlinePayment,numOfCartItems, setNumOfCartItems}}>
      {props.children}
    </CartContext.Provider>
  );
}
// ==========