import React, { useContext , useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import LayOut from './components/LayOut/LayOut';
import { tokenContext } from './components/CounterContext/TokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoutesLR from './components/ProtectedRoutes/ProtectedRoutesLR';
import Details from './components/Details/Details';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import Wishlist from './components/Wishlist/Wishlist';
import SpecificCategory from './components/SpecificCategory/SpecificCategory';
import ForgetPass from './components/ForgetPass/ForgetPass';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import ResetCode from './components/ResetCode/ResetCode';
let router = createBrowserRouter([
  { path: '', element: <LayOut />, children: [
    { index: true, element: <ProtectedRoutes><Home/></ProtectedRoutes> },
    { path:'/Products', element:<ProtectedRoutes><Products /></ProtectedRoutes>  },
    { path:'/Cart', element:<ProtectedRoutes> <Cart /></ProtectedRoutes> },
    { path:'/Wishlist', element:<ProtectedRoutes> <Wishlist /></ProtectedRoutes> },
    { path:'/Details/:id', element:<ProtectedRoutes><Details /></ProtectedRoutes>  },
    { path:'/SpecificCategory/:id', element:<ProtectedRoutes><SpecificCategory /></ProtectedRoutes>  },
    { path:'/allOrders', element:<ProtectedRoutes><AllOrders /></ProtectedRoutes>  },
    { path:'/Checkout', element:<ProtectedRoutes><Checkout /></ProtectedRoutes>  },
    { path:'/Categories', element:<ProtectedRoutes><Categories/></ProtectedRoutes>  },
    { path:'/Login', element:<ProtectedRoutesLR> <Login /></ProtectedRoutesLR> },
    { path:'/ForgetPas', element:<ProtectedRoutesLR> <ForgetPass /></ProtectedRoutesLR> },
    { path:'/Register', element: <ProtectedRoutesLR><Register /></ProtectedRoutesLR>  },
    { path:'/ResetCode', element:<ProtectedRoutesLR><ResetCode /></ProtectedRoutesLR>   },
    { path:'/VerifyResetCode', element: <ProtectedRoutesLR><VerifyResetCode /></ProtectedRoutesLR>   },
    { path:'*', element: <NotFound /> },
  ]},
]);

export default function App() {
  const {setToken} = useContext(tokenContext)
  
  useEffect(() => {
    const local = localStorage.getItem("userToken")
    if(local){
      setToken(local)
    }else{
      setToken(null)
    }
  
    
  }, [])
  
  return (
    <RouterProvider router={router}> </RouterProvider>
  );
}
