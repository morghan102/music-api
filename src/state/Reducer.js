const Reducer = (state, action) => {
    switch (action.type) {
        case 'GET_LYRICS':
            return {
                ...state,
                lyrics: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
export default Reducer;