import axios from 'axios'
import { isOnServer } from '../utils'

let instance = null

export default function Http() {
  if (instance) {
    return instance
  }

  instance= axios.create({
    timeout: 10000,
  })
  instance.interceptors.request.use(config => {
    if (!isOnServer()) {
      const token = localStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  return instance
}
