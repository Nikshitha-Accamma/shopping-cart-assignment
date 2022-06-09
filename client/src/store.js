import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';

const initialStates = {
    cartDetails: []
}

const Store=({children, initialState})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext(initialStates);

export default Store;