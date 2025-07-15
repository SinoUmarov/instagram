import axios from "axios";
import { create } from "zustand";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIzYTRmZjAzZi05YWFiLTQ4YzMtODNlNC0zOTdjNDljZTI2NDQiLCJuYW1lIjoia2FzdHJvIiwiZW1haWwiOiJrYXN0cm9AZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc1MjY0NDkwNCwiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.VCWgef8u7Stc-72UFGgj3q7j2l4RW9ReYde9Q4A7-q0";

export const useProfileStore = create((set) => ({
  user: null,
  info:null,

  getUserProfile: async () => {
    try {
      const { data } = await axios.get(
        "http://37.27.29.18:8003/UserProfile/get-user-profile-by-id?id=3a4ff03f-9aab-48c3-83e4-397c49ce2644",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ user: data.data });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },

  getInfo: async () => {
    try {
      const { data } = await axios.get(
         'http://37.27.29.18:8003/UserProfile/get-is-follow-user-profile-by-id?followingUserId=3a4ff03f-9aab-48c3-83e4-397c49ce2644',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ info: data.data });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },
}));
