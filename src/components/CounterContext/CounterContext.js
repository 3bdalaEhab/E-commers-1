import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";
import { useQuery } from "react-query";

export const CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [CountWish, setCountWish] = useState(0);

let headers = { token: localStorage.getItem(`userToken`) }; 

  async function getWishlist() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      setCountWish(data.count);
      return data;
    } catch (error) {
      console.log(error, "Api getWishlist");
    }
  }

  useQuery("InWishlist", addInWishlist);

  function addInWishlist(id) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      { headers }
    );
  }
  useQuery("removeInWishlist", removeInWishlist);

  function removeInWishlist(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

      { headers }
    );
  }
 

  return (
    <CounterContext.Provider
      value={{ addInWishlist, getWishlist, CountWish, removeInWishlist }}
    >
      {children}
    </CounterContext.Provider>
  );
}
