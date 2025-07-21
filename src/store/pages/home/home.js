import axiosRequest from "@/lib/axiosRequest";
import { create } from "zustand";

export const useUser = create((set) => ({
  users: [],
  posts: [],

  getUsers: async () => {
    try {
      const { data } = await axiosRequest.get(`/User/get-users/?PageSize=5`);
      set({ users: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  getPosts: async () => {
    try {
      const { data } = await axiosRequest.get(`/Post/get-posts?PageSize=50`);
      set({ posts: data?.data });
    } catch (error) {
      console.error(error);
    }
  },
}));
