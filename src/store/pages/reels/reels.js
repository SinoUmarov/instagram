import { API } from '@/lib/api'
import axiosRequest from '@/lib/axiosRequest'
import axios from 'axios'
import { create } from 'zustand'
const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4MzhmMWRkNi0yNWY3LTRhNmEtYTEyOC1lMGE3NTJlNTIzNDIiLCJuYW1lIjoicGFydml6IiwiZW1haWwiOiJzb2RhdG92QGdtYWlsLmNvbSIsInN1YiI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3NTI2NDI5MDMsImlzcyI6Imluc3RhZ3JhbS1ncm91cCIsImF1ZCI6Imluc3RhZ3JhbS1hcGkifQ.qxoXV2vLVjOuJefG4c5d-fI-jmCltnVC32D2UEjzX70'
export const useReelsPage = create((set, get) => ({
	data: [],
	getReels: async () => {
		try {
			let { data } = await axiosRequest.get(
				`/Post/get-reels?PageSize=1000`,{
					headers:{
						Authorization:`Bearer ${token}`
					}
				}
			)
			// console.log(data);
			
			set(()=>({data:data.data}))
		} catch (error) {
			console.log(error)
		}
	},
}))
