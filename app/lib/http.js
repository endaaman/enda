import axios from 'axios'
import { isOnServer } from '../util'

let instance

export function Http() {
  if (instance) {
    return instance
  }

  const base = isOnServer()
    ? 'http://localhost:3000'
    : ''

  instance= axios.create({
    baseURL: base,
  })
  instance.interceptors.request.use(function (config) {
    if (!isOnServer()) {
      const token = localStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  return instance
}
