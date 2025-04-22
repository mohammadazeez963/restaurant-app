import axios from "axios";

const PRODUCTS_REST_API_BASE_URL = "http://localhost:3000/products"

export const addProduct= (item) => axios.post(PRODUCTS_REST_API_BASE_URL,item)

export const fetchProductById= (id) => axios.get(PRODUCTS_REST_API_BASE_URL + "/" + id)

export const updateProduct= (product, id) => axios.put(PRODUCTS_REST_API_BASE_URL + "/" + id, product)

export const deleteProduct= (id) => axios.delete(PRODUCTS_REST_API_BASE_URL + "/" + id)