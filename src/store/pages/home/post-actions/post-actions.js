import axiosRequest from "@/lib/axiosRequest";
import { create } from "zustand";

export const usePostActions = create((set) => ({
  postByID: {},

  likePost: async (postId) => {
    try {
      await axiosRequest.post(`/Post/like-post?postId=${postId}`);
    } catch (error) {
      console.error(error);
    }
  },

  addPostFavorite: async (postId) => {
    try {
      await axiosRequest.post(`/Post/add-post-favorite`, { postId: postId });
    } catch (error) {
      console.error(error);
    }
  },

  getPostByID: async (postId) => {
    try {
      const { data } = await axiosRequest.get(
        `/Post/get-post-by-id?id=${postId}`
      );
      set(() => ({
        postByID: data?.data,
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
