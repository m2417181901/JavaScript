import { createStore } from "redux";


const notices = (state={isAllRead: false, count:8}, actions) => {
    switch (actions.type) {
        case "READ_ALL":
            return {...state, isAllRead: true };
        default:
            return state;
    }
}

const store = createStore(notices);
export default store;
