// import { axiosRequest } from "@/api/pages/chat/utils/axios-reguest";
import axiosRequest from '@/lib/axiosRequest'
import { create } from "zustand";

export const usePostActions = create(() => ({

  likePost: async (postId) => {
    try {
      await axiosRequest.post(`/Post/like-post?postId=${postId}`);
    } catch (error) {
      console.error(error);
    }
  },

  addPostFavorite: async (postId) => {
    try {
        await axiosRequest.post(`/Post/add-post-favorite`, {postId: postId}) 
    } catch (error) {
        console.error(error);
    }
  }



}));
