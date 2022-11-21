import axios from 'axios'
import router from '@/router'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
  baseURL: 'http://localhost:8082/api/admin',
  timeout: 10000
})
request.interceptors.request.use(config => {
  // console.log(config)
  //   console.log(config.url)

  const token = sessionStorage.getItem('Authorization')
  config.headers['Authorization'] =  'Bearer ' + token
  return config
}, (error) => {
  return error
})

request.interceptors.response.use(response => {
  return response
}, (error) => {
  return error
})

export default request
