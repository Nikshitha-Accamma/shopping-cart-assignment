const Reducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_CART_VALUE':
            return {
                ...state,
                cartDetails: action.payload
            };
            default: return state;
    }
}

export default Reducer;