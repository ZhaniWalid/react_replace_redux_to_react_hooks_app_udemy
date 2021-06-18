import { initStore } from './store_hook';

//* 'React HOOKS' => Allows us to use in all our work the 'functional Component' ( Exmple: 'const IngredientForm = React.memo(props => {....});' )
//* => AND there is no need to use the 'class based Component' ( Exmple; 'class IngredientForm extends Component {...}' )
//* => REQUIRE :: '@version — 16.8.0' => OR + for 'React version'

const configureStore = () => {
    const actions = {
        //  '(curState, productId)' Related to => 'useStore() => const dispatch = (actionIdentifier, payload)' on ['hooks/store_hook.js'] file
        TOGGLE_FAV: (curState, productId) => {
            const prodIndex = curState.products.findIndex(p => p.id === productId);
            const newFavStatus = !curState.products[prodIndex].isFavorite;
            const updatedProducts = [...curState.products]; // Make a 'deep clone (copy)' of the 'currentProdList' & Distribute all of it's properties + Save it to 'updatedProducts'
            updatedProducts[prodIndex] = {
            // Make a 'deep clone (copy)' of the 'curState.products' & Distribute all of it's properties + Save it to 'updatedProducts'
            ...curState.products[prodIndex],
            isFavorite: newFavStatus
            };
            return { products: updatedProducts };
        }
    };
    initStore(actions, {
        products: [
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
        ]
    });
};

export default configureStore;