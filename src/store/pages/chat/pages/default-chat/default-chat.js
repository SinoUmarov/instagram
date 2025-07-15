import axiosReguest, { userId }  from '@/api/pages/chat/utils/axios-reguest'
import token  from '@/api/pages/chat/utils/axios-reguest'
import axios from 'axios'
import { create } from 'zustand'

export const useChat = create((set, get) => ({
	userProfile: [],
	allUsers: [],
	chatById: [],
	userByName: [],
	getUserProfile: async () => {
		try {
			const { data } = await axios.get(
				`http://37.27.29.18:8003/UserProfile/get-user-profile-by-id?id=${userId.sid}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			set({ userProfile: data.data })
		} catch (error) {
			console.error(error)
		}
	},
	getAllUsers: async () => {
		try {
			const { data } = await axios.get('http://37.27.29.18:8003/Chat/get-chats', {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				}
			})
			set({allUsers: data.data})
		} catch (error) {
			console.error(error);
		}
	},
	getChatById: async (user) => {
		try {
			const { data } = await axios.get('http://37.27.29.18:8003/Chat/get-chat-by-id?chatId=' + user, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				}
			})
			set({chatById: data.data})
		} catch (error) {
			console.error(error);
		}
	},
	getUserByName: async (userName) => {
		try {
			const { data } = await axios.get('http://37.27.29.18:8003/User/get-users?UserName=' + userName, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem('token')}`
				}
			})
			set({userByName: data})
		} catch (error) {
			console.error(error);
		}
	}
}))

export default useChat
