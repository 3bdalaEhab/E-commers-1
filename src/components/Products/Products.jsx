import React, { useState,  useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../CounterContext/CartContext';
import toast from 'react-hot-toast';
import { CounterContext } from '../CounterContext/CounterContext';
import Footer from '../Footer/Footer';

export default function Products() {
  const { addToCart, setNumOfCartItems } = useContext(CartContext);
  const { addInWishlist, getWishlist } = useContext(CounterContext);

  const { isLoading, data } = useQuery("products", fetchProducts);
  let newData = data?.data.data;

  const [isClicked, setIsClicked] = useState({});

  const handleButtonClick = (productId) => {
    if (!isClicked[productId]) {
      // Perform your first click actions here
      InWishlist(productId);
    }

    // Toggle the state to true after the first click
    setIsClicked((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  function fetchProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function InWishlist(id) {
    let { data } = await addInWishlist(id);
    toast.success(`${data.message}`, { duration: 2000 });
    getWishlist();
  }

  async function inCart(id) {
    let data = await addToCart(id);
    if (data.data.status === 'success') {
      toast.success(`Product added successfully at your cart`, { duration: 2000 });
      setNumOfCartItems(data?.data?.numOfCartItems);
    } else {
      toast.error(`Error adding item to cart`, { duration: 2000 });
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center align-items-center h-100'>
          <BallTriangle
            height={150}
            width={150}
            radius={5}
            color='#4fa94d'
            ariaLabel='ball-triangle-loading'
            wrapperClass={{}}
            wrapperStyle=''
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className='container'>
            <div className='row  gy-5'>
          
              {newData?.map((product) => (
                <div key={product.id} className='col-md-4 pt-5 col-lg-3 co1-12 '>
                  <div className='product p-2    rounded-3'>
                    <Link to={'/Details/' + product.id}>
                      <img className='w-100 ' src={product.imageCover} alt='product' />
                      <h5 className='text-main'>{product.category.name}</h5>
                      <h3 className='h5'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                      <div className='m-0 pt-2 d-flex align-items-center justify-content-between'>
                        <h6 className='fw-bold m-0 p-0'>{product.price} EGP</h6>
                        <span className='fw-bold'>
                          <i className='rating-color fa-solid me-1 fa-star'></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className='d-flex mt-2 justify-content-between'>
                      <button onClick={() => inCart(product.id)} className='btn bg-main text-white mt-1'>
                        Add to Cart
                      </button>
                      <button onClick={() => handleButtonClick(product.id)} className={`border-0 bg-white mt-1`}>
                        <i
                          className={`fa-solid h2 fa-heart`}
                          style={{ color: isClicked[product.id] ? 'red' : 'black' }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
