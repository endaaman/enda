import axios from 'axios'
import { isOnServer } from '../util'

let axiosInstance

export function Http() {
  if (axiosInstance) {
    return axiosInstance
  }

  const base = isOnServer()
    ? 'http://localhost:3000'
    : ''

  axiosInstance= axios.create({
    baseURL: base,
  })
  return axiosInstance
}
