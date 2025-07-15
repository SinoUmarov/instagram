// import { userId } from '@/api/pages/chat/utils/axios-reguest'
// import token from '@/api/pages/chat/utils/axios-reguest'
import axios from 'axios'
import { create } from 'zustand'

export const useChat = create((set, get) => ({
	userProfile: [],
	allUsers: [],
	chatById: [],
	userByName: [],
	userByNameForSearch: [],
	lastMessages: {},
	getUserProfile: async id => {
		try {
			const { data } = await axios.get(
				`http://37.27.29.18:8003/UserProfile/get-user-profile-by-id?id=${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
			const { data } = await axios.get(
				'http://37.27.29.18:8003/Chat/get-chats',
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			set({ allUsers: data.data })
		} catch (error) {
			console.error(error)
		}
	},
	getChatById: async user => {
		try {
			const { data } = await axios.get(
				'http://37.27.29.18:8003/Chat/get-chat-by-id?chatId=' + user,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			set({ chatById: data.data })
		} catch (error) {
			console.error(error)
		}
	},
	getUserByName: async userName => {
		try {
			const { data } = await axios.get(
				'http://37.27.29.18:8003/User/get-users?UserName=' + userName,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			set({ userByName: data.data[0] })
		} catch (error) {
			console.error(error)
		}
	},
	sendMessege: async formData => {
		try {
			await axios.put('http://37.27.29.18:8003/Chat/send-message', formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			get().getChatById(formData.get('ChatId'))
		} catch (error) {
			console.error(error)
		}
	},
	delChatById: async id => {
		try {
			await axios.delete(
				'http://37.27.29.18:8003/Chat/delete-chat?chatId=' + id,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			get().getAllUsers()
		} catch (error) {
			console.error(error)
		}
	},
	delMessageById: async (chatId, id) => {
		try {
			await axios.delete(
				'http://37.27.29.18:8003/Chat/delete-message?massageId=' + chatId,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			get().getChatById(id)
		} catch (error) {
			console.error(error)
		}
	},
	getUserByNameForSearch: async name => {
		try {
			const { data } = await axios.get(
				'http://37.27.29.18:8003/User/get-users?UserName=' + name,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			set({ userByNameForSearch: data.data })
		} catch (error) {
			console.error(error)
		}
	},
	createChat: async id => {
		try {
			await axios.post(
				'http://37.27.29.18:8003/Chat/create-chat?receiverUserId=' + id,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			)
			get().getAllUsers()
		} catch (error) {
			console.error(error)
		}
	},
	getLastMessages: async (id) => {
		try {
			const { data } = await axios.get(`http://37.27.29.18:8003/Chat/get-chat-by-id?chatId=${id}`)
			const map = {}
			data.data.forEach(msg => {
				map[msg.chatId] = msg
			})
			set({ lastMessages: map })
		} catch (error) {
			console.error('Ошибка при получении последних сообщений:', error)
		}
	},
}))

export default useChat
