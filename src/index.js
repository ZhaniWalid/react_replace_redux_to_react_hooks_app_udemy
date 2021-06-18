import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureProductsStore from './hooks/products_store_hook';
import productReducer from './store/reducers/productsReducer';
import ProductsProvider from './context/products_context';

/* const rootReducer = combineReducers({
  shop: productReducer
});

const store = createStore(rootReducer); */

configureProductsStore();

ReactDOM.render(
  // <ProductsProvider>
  // {/* <Provider store={store}> */}
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // {/* </Provider>, */}
  // </ProductsProvider>,
  // document.getElementById('root')


    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);
