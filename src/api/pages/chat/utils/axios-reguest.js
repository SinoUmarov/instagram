import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem('access_token')

export const userId = jwtDecode(token)

export const axiosReguest = axios.create({
	baseURL: 'http://37.27.29.18:8003/',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
		}
})

export const api = 'http://37.27.29.18:8003/'

export default { axiosReguest, token, api }
