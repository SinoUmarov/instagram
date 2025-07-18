import axiosRequest from '@/lib/axiosRequest'
import { create } from 'zustand'

export const useDrawerStore = create((set, get) => ({
	data: [],
	history: [],
	isOpen: false,
	openDrawer: () => set({ isOpen: true }),
	closeDrawer: () => set({ isOpen: false }),
	toggleDrawer: () => set(state => ({ isOpen: !state.isOpen })),

	searchUser: async user => {
		try {
			let { data } = await axiosRequest(
				`/User/get-users?UserName=${user !== '' ? user : ''}`
			)
			// console.log('USERS: ', data.data)
			set(() => ({ data: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	postSearchHistory: async id => {
		try {
			await axiosRequest.post(
				`/User/add-user-search-history?UserSearchId=${id}`
			)
		} catch (error) {
			console.log(error)
		}
	},

	getSearchHistory: async () => {
		try {
			let { data } = await axiosRequest.get('/User/get-user-search-histories')
			console.log('history:', data.data)
			set(() => ({ history: data.data }))
		} catch (error) {
			console.log(error)
		}
	},

	deleteSearchHistory: async id => {
		try {
			await axiosRequest.delete(`/User/delete-user-search-history?id=${id}`)
			get().getSearchHistory()
		} catch (error) {
			console.log(error)
		}
	},

	clearSearchHistory: async () => {
		try {
			await axiosRequest.delete('/User/delete-user-search-histories')
			get().getSearchHistory()
		} catch (error) {
			console.log(error)
		}
	},
}))
