import axiosRequest from '@/lib/axiosRequest'
import { create } from 'zustand'

export const useRegistration = create((set, get) => ({
	registrate: async (form, router) => {
		try {
			await axiosRequest.post(`/Account/register`, form)
			router.push('/login')
		} catch (error) {
			console.log(error)
		}
	},
}))
