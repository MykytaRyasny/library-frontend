import axios from 'axios'

const api = axios.create({
    baseURL: 'http://195.135.254.207:8080/bookstore'
})

export default api;