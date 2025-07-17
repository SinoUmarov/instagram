
import  axios  from 'axios';
import { API } from '@/utils/config';
import { create } from 'zustand';
import axiosRequest from '@/lib/axiosRequest';

const token = localStorage.getItem('token')

 export const useExplorePage = create((set, get)=> ({
    data: [],

    getExplore: async () => {
        try {
            const { data } = await axiosRequest.get(`/Post/get-posts`)
            set(()=> ({data: data.data}))
        } catch (error) {
            console.log(error)
        }
    }
 }))