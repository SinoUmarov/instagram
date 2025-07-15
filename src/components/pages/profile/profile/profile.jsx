'use client'
import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import React, { useEffect } from "react";
import Stories from "../story/story";

const Profiles = () => {
  const { user, getUserProfile, getInfo, info } = useProfileStore();

  useEffect(() => {
    getUserProfile();
    getInfo();
  }, []);

  return (
    <div className="w-full bg-white px-4">
      <div className="w-full max-w-[900px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 py-4">
        {/* Аватар */}
        <div className="w-29 h-28 sm:w-42 sm:h-34  rounded-[50%] overflow-hidden border border-gray-300">
          {user?.image ? (
            <img
              src={`http://37.27.29.18:8003/images/${user.image}`}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
              ?
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h2 className="text-xl font-semibold">{user?.userName || "Username"}</h2>
            <div className="flex gap-2">
              <button className="bg-gray-100 px-4 py-1 rounded-md text-sm">
                Edit profile
              </button>
              <button className="bg-gray-100 px-4 py-1 rounded-md text-sm">
                View archive
              </button>
            </div>
            <div className="text-2xl cursor-pointer hidden sm:block">☰</div>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <span>
              <strong>{info?.postCount || 0}</strong> posts
            </span>
            <span>
              <strong>{info?.subscribersCount || 0}</strong> followers
            </span>
            <span>
              <strong>{info?.subscriptionsCount || 0}</strong> following
            </span>
          </div>

          <div className="font-semibold text-sm">{info?.firstName || "Full Name"}</div>
        </div>
      </div>

      <div className="w-full max-w-[900px] mx-auto">
        <Stories />
      </div>
    </div>
  );
};

export default Profiles;
