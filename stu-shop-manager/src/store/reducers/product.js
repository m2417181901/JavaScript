export default (state={list:{},page:1,total:0}, action) => {
    switch (action.type) {
        case "PRODUCT_LOADED":
            console.log(action)
            return { ...state, list:action.payload.data.data, page:1, total: action.payload.data.data.length };
            default:
            return state;
    }
};
