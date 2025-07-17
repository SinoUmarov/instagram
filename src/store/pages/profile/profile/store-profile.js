import axiosRequest from "@/lib/axiosRequest";
import { API } from "@/utils/config";
import { create } from "zustand";

export const useProfileStore = create((set,get) => ({
  info: null,
  posts: null,
  saved: null,
  story: null,

  getInfo: async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `/UserProfile/get-is-follow-user-profile-by-id?followingUserId=${id}`
      );
      set({ info: data.data });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },

  getMyPost: async () => {
    try {
      const { data } = await axiosRequest.get(`${API}/Post/get-my-posts`);

      set({ posts: data });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },

  getMySaved: async () => {
    try {
      const { data } = await axiosRequest.get(
        `${API}/UserProfile/get-post-favorites`
      );
      console.log(data);

      set({ saved: data.data });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },

  getStories: async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `${API}/Story/get-user-stories/${id}`
      );
      set({ story: data.data });
    } catch (error) {
      console.log(error);
    }
  },

  likeStory:async(id)=>{
    console.log(id);
    
    await axiosRequest.post(`${API}/Story/LikeStory?storyId=${id}`)
    get().getStories()
  }
}));
