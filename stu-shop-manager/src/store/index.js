import {createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import product from './reducers/product'
import notice from './reducers/notice'
import { DatabaseFilled } from '@ant-design/icons'

const  rootReducer = combineReducers({
    product,
    notice
})
export default createStore(rootReducer, compose(applyMiddleware(...[thunk])))