
import axios from 'axios';
import { API } from '@/utils/config';
import { create } from 'zustand';
import axiosRequest from '@/lib/axiosRequest';

const token = localStorage.getItem('token')

export const useExplorePage = create((set, get) => ({
    data: [],

    getExplore: async () => {
        try {
            const { data } = await axiosRequest.get(`/Post/get-posts`)
            set(() => ({ data: data.data }))
        } catch (error) {
            console.log(error)
        }
    },


    following: async (id) => {
        try {
            await axiosRequest.post(`/FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`)
            await get().getExplore()
        } catch (error) {
            console.log(error)
        }
    },

    unfollowing: async (id) => {
        try {
            await axiosRequest.delete(`/FollowingRelationShip/delete-following-relation-ship?followingUserId=${id}`)
            await get().getExplore()
        } catch (error) {
            console.log(error)
        }
    },

    AddComment: async (text) => {
        try {
            await axiosRequest.post(`/Post/add-comment`, text)
            await get().getExplore()
        } catch (error) {
            console.log(error)
        }
    }
}))