import axiosRequest from '@/lib/axiosRequest'
import { create } from 'zustand'

export const useLoginStore = create((set, get) => ({
	login: async (form, router) => {
		try {
			let response = await axiosRequest.post('/Account/login', form)
			localStorage.setItem('access_token', response.data.data)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	},
}))
