import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import CounterContextProvider from './components/CounterContext/CounterContext';
import TokenContextProvider from './components/CounterContext/TokenContext';
import { QueryClient,QueryClientProvider} from 'react-query';
import CartContextProvider from './components/CounterContext/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

 let queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <CartContextProvider>

    <TokenContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </TokenContextProvider>
    </CartContextProvider>
  </React.StrictMode>
  </QueryClientProvider>
);
