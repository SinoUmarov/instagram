import { API } from '@/lib/api'
import axiosRequest from '@/lib/axiosRequest'
import axios from 'axios'
import { create } from 'zustand'

export const useReelsPage = create((set, get) => ({
	data: [],
	getReels: async () => {
		try {
			let { data } = await axiosRequest.get(
				`/Post/get-reels?PageSize=1000`,{
					
				}
			)
			// console.log(data);
			
			set(()=>({data:data.data}))
		} catch (error) {
			console.log(error)
		}
	},
	likePost:async (id) => {
		try {
			await axiosRequest.post(`/Post/like-post?postId=${id}`)

		} catch (error) {
			console.log(error);
			
		}
	}

}))
