import axios from 'axios'
import { isOnServer } from '../util'

let instance = null

export default function Http() {
  if (instance) {
    return instance
  }

  const base = isOnServer()
    ? 'http://localhost:3000'
    : ''

  instance= axios.create({
    baseURL: base,
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
