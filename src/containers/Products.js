import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { useStore } from '../hooks/store_hook';
import ProductItem from '../components/Products/ProductItem';
import { ProductsContext } from '../context/products_context';
import './Products.css';

const Products = props => {
  // const productList = useSelector(state => state.shop.products); // Replaced by 'productList = useContext(...)'

  //-- Accepts a context object (the value returned from React.createContext) and returns the current context value,
  //--  ...as given by the nearest context provider for the given context.
  // const productList = useContext(ProductsContext).products; // ...'.products' => from 'const ProductsContext' in ['/context/products_context'] file

  const state= useStore()[0]; // [0] == 'globalState' => coz 'useStore()' return '[globalState, dispatch]' on ['/hooks/store_hook.js'] file
  return (
    <ul className="products-list">
      {/* {productList.map(prod => ( */}
      {state.products.map(prod => ( // state'.products' => from 'initStore = (userActions == actions, initialState == products)' on ['/hooks/store_hook.js'] + ['/hooks/products_store_hook.js'] files
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
