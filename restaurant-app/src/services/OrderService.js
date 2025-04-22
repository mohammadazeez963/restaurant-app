import axios from "axios";

const REST_API_BASE_URL = "http://localhost:3000"

export const fecthOpenTables =  () => axios.get(REST_API_BASE_URL + "/tables?status=OPEN")

export const assignTablesToWaiterAPI= (id, body) => axios.put(REST_API_BASE_URL + "/tables/"+ id,body)

export const fetchAssignedTablesofWaiter = (id) => axios.get(REST_API_BASE_URL + "/tables?waiterId=" + id)

export const updateTable =  (table, id) => axios.put(REST_API_BASE_URL + "/tables/" + id, table)

export const fetchMenu = () => axios.get(REST_API_BASE_URL + "/products")

export const placeOrder = (order) => axios.post(REST_API_BASE_URL + "/orders",order)

export const updateOrder = (order,id) => axios.put(REST_API_BASE_URL + "/orders/" + id, order)

export const fetchOrders = () => axios.get(REST_API_BASE_URL + "/orders")

export const fetchOrderById = (id) => axios.get(REST_API_BASE_URL + "/orders/" + id)

export const fetchCurrentOrderByTableId = (id) => axios.get(REST_API_BASE_URL + "/orders?status=COMPLETED&status=PENDING&tableId=" + id)