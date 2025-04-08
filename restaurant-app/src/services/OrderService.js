import axios from "axios";

const REST_API_BASE_URL = "http://localhost:3000"

export const fecthOpenTables =  () => axios.get(REST_API_BASE_URL + "/tables?status=OPEN")

export const assignTablesToWaiterAPI= (id, body) => axios.put(REST_API_BASE_URL + "/tables/"+ id,body)

export const fetchAssignedTablesofWaiter = (id) => axios.get(REST_API_BASE_URL + "/tables?waiterId=" + id)

export const fetchMenu = () => axios.get(REST_API_BASE_URL + "/products")