import { get, post, put } from "../utils/request";

// 
export function loginApi(user) {
    return post('/api/v1/admin/login', user)
}

export function registerApi(newUser) {
    return post('/api/v1/admin/register',newUser)
}

export function products() {
    return get('/api/v1/admin/login/products','11')
}

export function addProducts(newData) {
    return post('/api/v1/admin/login/addProducts',newData)
}
export function editProduct(id, data) {
    return put(`api/v1/admin/login/editProduct/${id}`,data)
}
export function getProduct(id) {
    return get(`api/v1/admin/login/getProduct/${id}`,'11')
}

export function delProduct(id) {
    return get(`/api/v1/admin/login/delProduct/${id}`, '11')
}