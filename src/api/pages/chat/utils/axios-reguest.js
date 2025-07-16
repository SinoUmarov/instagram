import axios from 'axios'
import{ jwtDecode }from 'jwt-decode'

const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

const tokenForJwt = localStorage.getItem('access_token')
export const userId = jwtDecode(tokenForJwt)

export const axiosRequest = axios.create({
  baseURL: 'http://37.27.29.18:8003/',
  headers: token
    ? { Authorization: `Bearer ${token}` }
    : {},
})

export const api = 'http://37.27.29.18:8003/'

export { token, userId }
