// 'useState' => Allows us to manage 'State & Functional Components'
import React, { useState } from 'react';

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current 'ProductsContext' (with "{isAuth,login}" as the default).
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {}
});

export default props => {
    // 'useState' => Allows us to manage 'State & Functional Components'
    const [productsList, setProductsList] = useState([
        {
          id: 'p1',
          title: 'Red Scarf',
          description: 'A pretty red scarf.',
          isFavorite: false
        },
        {
          id: 'p2',
          title: 'Blue T-Shirt',
          description: 'A pretty blue t-shirt.',
          isFavorite: false
        },
        {
          id: 'p3',
          title: 'Green Trousers',
          description: 'A pair of lightly green trousers.',
          isFavorite: false
        },
        {
          id: 'p4',
          title: 'Orange Hat',
          description: 'Street style! An orange hat.',
          isFavorite: false
        }
    ]);

    const toggleFavorite = productId => {
      setProductsList(currentProdList => {
        const prodIndex = currentProdList.findIndex(p => p.id === productId);
        const newFavStatus = !currentProdList[prodIndex].isFavorite;
        const updatedProducts = [...currentProdList]; // Make a 'deep clone (copy)' of the 'currentProdList' & Distribute all of it's properties + Save it to 'updatedProducts'
        updatedProducts[prodIndex] = {
          // Make a 'deep clone (copy)' of the 'currentProdList' & Distribute all of it's properties + Save it to 'updatedProducts'
          ...currentProdList[prodIndex],
          isFavorite: newFavStatus
        };
        return updatedProducts;
      });
    };

    /* Context.'Provider' => Every Context object comes with a 'Provider React component'... 
          ...=> that allows 'consuming components' to 'subscribe to context changes'. 
       <Provider " value='..' " /> => The Provider component accepts a 'value prop' to be passed... 
           ...=> to 'consuming components' that are 'descendants of this Provider'.   */
    return <ProductsContext.Provider value={{ products: productsList, toggleFav: toggleFavorite }}>
                {props.children}
           </ProductsContext.Provider>;
};