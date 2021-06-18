// 'useState' => Allows us to manage 'State & Functional Components'
//- The 'useEffect()' Hook => lets you perform side effects in 'function Components'
//- ==> Similar to 'componentDidMount' and 'componentDidUpdate' in a 'class based Component'
import { useState, useEffect } from 'react';

//* 'React HOOKS' => Allows us to use in all our work the 'functional Component' ( Exmple: 'const IngredientForm = React.memo(props => {....});' )
//* => AND there is no need to use the 'class based Component' ( Exmple; 'class IngredientForm extends Component {...}' )
//* => REQUIRE :: '@version — 16.8.0' => OR + for 'React version'

let globalState = {};
let listeners = [];
let actions = {};

// 'shouldListen' arg => We use it to determine if whether we actually want to 'register' a 'listener' for this 'Component' or 'NOT'
export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1]; // '[1]' => coz we are interested in the 2nd value (in the 'updating' func) #NOT in the Snapshot

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        // Make a 'deep clone (copy)' of the 'globalState' & Distribute all of it's properties + Merge it with 'newState' => Save it to 'globalState'
        globalState = { ...globalState, ...newState };
    
        for (const listener of listeners) {
          listener(globalState);
        }
    };

    // The 'useEffect()' Hook => lets you perform side effects in 'function Components'
    // ==> Similar to 'componentDidMount' and 'componentDidUpdate' in a 'class based Component'
    //-- Used when a component isn't required anymore => Destroy it & Do Clean up => To prevent memory leaks
    useEffect(() => {
        if (shouldListen) {
            // Every 'Component' which uses my custom Hook, will gets it's own sets func( 'setState()' ) => then added to 'listeners[]' array
            listeners.push(setState);
        }

        // Perform a Clean-Up ONCE => Removing our 'listener' when the 'Component Unmounts'
        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState);
            }        
        }
        // [setState, shouldListen] => we specifed them as our 'dependencies' 
        //    => This only will re-run this effect [useEffect()] func => if 'setState / shouldListen' changed
    }, [setState, shouldListen]); // with '[]' as a 2nd arg => 'useEffect()' acts like 'componentDidMount' -> it's run ONLY ONCE (after the 1st render) -> to AVOID looping without infinite on calling 'const setState' 
    
    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        // Make a 'deep clone (copy)' of the 'globalState' & Distribute all of it's properties + Merge it with 'initialState' => Save it to 'globalState'
        globalState = { ...globalState, ...initialState };
    }
    // Make a 'deep clone (copy)' of the 'actions' & Distribute all of it's properties + Merge it with 'userActions' => Save it to 'actions'
    actions = { ...actions, ...userActions };
};