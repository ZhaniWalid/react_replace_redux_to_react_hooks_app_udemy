import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { useStore } from '../hooks/store_hook';
import { ProductsContext } from '../context/products_context';
import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';

const Favorites = props => {
  /* const favoriteProducts = useSelector(state =>
    state.shop.products.filter(p => p.isFavorite)
  ); */

  // Accepts a context object (the value returned from React.createContext) and returns the current context value,
  //  ...as given by the nearest context provider for the given context. 
  //--- if 'p(product).isFavorite == true' => It will be included in the newly returned array which is stored in 'favoriteProducts'
  //---         => 'isFavorite' prop => from ['/context/products_context.js'] file
  // const favoriteProducts = useContext(ProductsContext).products.filter(p => p.isFavorite); // ...'.products' => from 'const ProductsContext' in ['/context/products_context'] file  
  
  const state= useStore()[0]; // [0] == 'globalState' => coz 'useStore()' return '[globalState, dispatch]' on ['/hooks/store_hook.js'] file
  const favoriteProducts = state.products.filter(p => p.isFavorite); // state'.products' => from 'initStore = (userActions == actions, initialState == products)' on ['/hooks/store_hook.js'] + ['/hooks/products_store_hook.js'] files
  
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
