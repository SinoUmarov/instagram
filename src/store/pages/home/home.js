import axiosRequest from "@/lib/axiosRequest";
import { create } from "zustand";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJjYjVjOWE2NS0xMjJhLTQ1NDktYmEzOS03YTFmNmU5N2JjY2YiLCJuYW1lIjoiYWxpam9uIiwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc1MjY0NTc0NywiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.m3yNuC8FAObCmo5E57gLFMPt8FzylnH7H4bP0Hp8alw'

export const useUser = create((set) => ({
  users: [],
  stories: [],
  posts: [],


  getUsers: async () => {
    try {
      const { data } = await axiosRequest.get(`/User/get-users`);
      set({ users: data.data });
    } catch (error) {
      console.error(error);
    }
  },

  getStories: async () => {
    try {
      const {data} = await axiosRequest.get(`/Story/get-stories`)
      set({stories: data})
    } catch (error) {
      console.error(error);
    }
  },

  getPosts: async () => {
    try {
      const {data} =  await axiosRequest.get(`/Post/get-posts`) 
      set({posts: data?.data})
      console.log('post: ', data?.data)
    } catch (error) {
      console.error(error);
    }
  }




}));


