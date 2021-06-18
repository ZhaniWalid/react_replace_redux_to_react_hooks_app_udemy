import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { useStore } from '../../hooks/store_hook';
import { toggleFav } from '../../store/actions/productsActions';
import { ProductsContext } from '../../context/products_context';

import Card from '../UI/Card';
import './ProductItem.css';


// functional 'Component' version ('props') to use it with 'React HOOKS'
//-- " React.'memo()' " => Allows us to 'optimize performance '& 'ONLY UPDATE' when the props... 
//--      -> ...of this 'Component' (= 'props') changes
const ProductItem = React.memo(props => {
  // const dispatch = useDispatch();

  //-- Accepts a context object (the value returned from React.createContext) and returns the current context value,
  //--  ...as given by the nearest context provider for the given context.
  // const toogleFavProd = useContext(ProductsContext).toggleFav; // ...'.toggleFav' => from 'const ProductsContext' in ['/context/products_context'] file

  console.log('RENDERING PRODUCT ITEM');
  // 'false' => is 'shouldListen' arg from 'const useStore = (shouldListen = true)' on ['/hooks/store_hook.js'] file
  const dispatch = useStore(false)[1]; // [1] == 'dispatch' => coz 'useStore()' return '[globalState, dispatch]' on ['/hooks/store_hook.js'] file

  const toggleFavHandler = () => {
    // dispatch(toggleFav(props.id));
    // toogleFavProd(props.id);

    // 'TOGGLE_FAV', props.id => from: 'const configureStore = ()' .... 'TOGGLE_FAV: (curState == 'TOGGLE_FAV', productId == props.id)' on ['/hooks/products_store_hook.js'] file
    dispatch('TOGGLE_FAV', props.id); 
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'} {/* props'.isFav' => from  [containers/Products.js] file */}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
