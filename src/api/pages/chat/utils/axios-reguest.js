import axios from 'axios'
import{ jwtDecode }from 'jwt-decode'

const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

// let userId = null
// if (token && typeof token === 'string') {
//   try {
//     const decoded = jwtDecode(token)
//     userId = decoded.userId || decoded.id || null
//   } catch (error) {
//     console.warn('Invalid JWT token:', error)
//   }
// }

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
