import{ jwtDecode }from 'jwt-decode'

const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
// const token = localStorage.getItem('access_token')
export const userId = typeof window !== 'undefined' ?  jwtDecode(token) : null

export const api = 'http://37.27.29.18:8003/'

export { token, userId, api }