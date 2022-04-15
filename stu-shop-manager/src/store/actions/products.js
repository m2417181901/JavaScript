import {products} from '../../service/auth'
export const loadProduct = payload => async dispatch => {
    console.log(payload)
    const res = await products()
    dispatch({
        type: 'PRODUCT_LOADED',
        payload: res
    })
}