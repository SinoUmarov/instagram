import axiosRequest from "@/lib/axiosRequest";
import { create } from "zustand";

export const useProfileStore = create((set) => ({
  info: null,



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
}));
