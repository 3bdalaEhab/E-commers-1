import React,{useContext,useEffect,useState} from 'react'
import { CartContext } from '../CounterContext/CartContext'
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';

export default function Cart() {
  const [sLoading, setIsLoading] = useState(true)
  const [cartDetails, setCartDetails] = useState({})
 let {getCart,deleteProductFromCart,deleteAllProductFromCart,updateCountInCart,setNumOfCartItems} = useContext(CartContext)




async function removeItem(id) {
  try {
    let { data } = await deleteProductFromCart(id);
    setCartDetails(data); 
  setNumOfCartItems(data?.numOfCartItems)

  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}
async function removeAllItems() {
  try {
    let { data } = await deleteAllProductFromCart();
    setCartDetails(data); 
  setNumOfCartItems(data?.numOfCartItems)

    console.log(data);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
}

async function getCartDetails(){
  let {data} = await getCart()
  setCartDetails(data)
  setNumOfCartItems(data?.numOfCartItems)
  setIsLoading(false)
}
useEffect(() => {
  getCartDetails()
}, [cartDetails])


 async function updateCart(id,count){
  let {data} = await updateCountInCart(id,count)
  data.data.products.map((ele)=>{
    if(ele.count === 0){
      removeItem(ele.product._id)
    }
  })
  setCartDetails(data)

}



return <>
{sLoading ? <div className='d-flex justify-content-center align-items-center h-75'>
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
    </div> :<div className="container mt-3 m-auto w-75 pt-3 rounded-3 bg-light">
   <div className='d-flex my-3 justify-content-between'>
     <h2 >Cart Shop</h2>
     <button className='btn btn-outline-danger ' onClick={removeAllItems}>Remove All Items</button>
   </div>
     <div className="row w-100 justify-content-between">
     <h5  >Total Price : {!cartDetails   || cartDetails?.numOfCartItems === 0?" 0" : <span className='text-main '>{cartDetails?.data?.totalCartPrice} EGP</span> }   </h5>
     <h5  >Total Numbers : {!cartDetails   || cartDetails?.numOfCartItems === 0? " 0": <span className='text-main'>{cartDetails?.numOfCartItems}</span>}  </h5>
     </div>
 {!cartDetails || cartDetails?.numOfCartItems === 0 ?<div className='py-5'>
  <Link to={"/"} className=' text-main d-block text-center fw-bold h2 p-2 '>Go To Home</Link>
  <i class="fa-regular h3 text-center d-block rating-color  m-auto fa-hand-point-up"></i>
 </div>:<> {cartDetails?.data?.products.map((ele,indx)=><div key={indx} className="row p-2">
    <div className="col-md-2 ">
        <img className='w-100  rounded-2' src={ele.product.imageCover} alt="" />
    </div>
    <div className="col-md-10  d-flex align-items-center justify-content-between">
        <div className='mx-3  p-0'>
          <h3 className='h4'>{ele.product.title.split(" ").slice(0,2).join(" ")}</h3>
          <h5 className='text-main '>{ele.price} EGP</h5>
          <button onClick={()=> removeItem(ele.product._id)} className='p-0 text-danger btn fw-bold'><i class="fa-solid fa-trash-can"></i> Remove</button>
        </div>
  <div className="d-flex align-items-center ">

      <button onClick={()=>updateCart(ele.product._id,ele.count+1)} className='btn btn-outline-primary'>+</button>
      <p className='m-3'>{ele.count}</p>
      <button onClick={()=>updateCart(ele.product._id,ele.count-1)} className='btn  btn-outline-primary'>-</button>
    </div>
</div>
<hr />
</div>)}</>}
{!cartDetails || cartDetails?.numOfCartItems === 0 ?"":<Link className='btn text-white bg-main w-100 my-3' to={"/Checkout"}>CheckOut</Link>}
</div >  
}

  </>
}
