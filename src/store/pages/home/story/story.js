import axiosRequest from "@/lib/axiosRequest";
import { create } from "zustand";

export const useStory = create((set, get) => ({
  stories: [],
  subscribtions: [],

  getStories: async () => {
    try {
      const { data } = await axiosRequest.get(`/Story/get-stories`);
      const subscribtions = get().subscribtions;

      const filteredStories = data?.filter((story) =>
        get().subscribtions.includes(story.userId)
      );
      set({ stories: filteredStories });
      console.log("filteredStories: ", filteredStories);
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getSubscribtions: async (userID) => {
    try {
      const { data } = await axiosRequest.get(
        `/FollowingRelationShip/get-subscriptions?UserId=${userID}`
      );
      const userIds = data?.data?.map((item) => item.userShortInfo.userId);
      console.log("follow: ", userIds);
      set({ subscribtions: userIds });
    } catch (error) {
      console.error(error);
    }
  },
}));
