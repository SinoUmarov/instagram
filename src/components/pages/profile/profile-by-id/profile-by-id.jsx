'use client';

import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import React, { useEffect, useState } from "react";
import FollowersMenu from "../folowers/folowers";
import FollowingMenu from "../folowing/folowing";

import { useRouter } from "next/navigation"; 
import { useProfileByIdStore } from "@/store/pages/profile/profile-by-id/store-by-id";
import BasicTabsById from "../tabs-by-id/tabs";
import StoryById from "../story-by-id/story";

const ComponentProfileById = ({userId}) => {
  const {  getStories, getFolowers, getFolowing } = useProfileStore();
  const {getInfoById, infoById} = useProfileByIdStore()

  const router = useRouter();
  
  

  const [open, setOpen] = useState(false);
  const [openFolowing, setOpenFolowing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    getInfoById(userId)

  }, [userId]);

  const showFolowers = () => {
    if (!userId) return;
    getFolowers(userId);
    getFolowing(userId);
    setOpen(true);
  };

  const showFolowing = () => {
    if (!userId) return;
    getFolowers(userId);
    getFolowing(userId);
    setOpenFolowing(true);
  };


  

  

  return (
    <>
      <div className="w-full bg-white px-4">
        <div className="w-full max-w-[900px] mx-auto flex  sm:flex-row items-start sm:items-center gap-5 sm:gap-12 py-4">
          <div className="w-45 h-30 sm:w-42 sm:h-34  rounded-[50%] overflow-hidden border border-gray-300">
            {infoById?.image ? (
              <img
                src={`http://37.27.29.18:8003/images/${infoById?.image}`}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                ?
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:gap-5 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
              <h2 className="text-xl font-semibold">
                {infoById?.userName || "Username"}
              </h2>
            
              
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <span>
                <strong>{infoById?.postCount || 0}</strong> posts
              </span>
              <span onClick={showFolowers}>
                <strong>{infoById?.subscribersCount || 0}</strong> followers
              </span>
              <span onClick={showFolowing}>
                <strong>{infoById?.subscriptionsCount || 0}</strong> following
              </span>
            </div>

            <div className="font-semibold text-sm">
              {infoById?.firstName || "Full Name"}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[900px] mx-auto">
          <StoryById id={userId} />
        </div>
        <div className="w-full max-w-[900px] mx-auto">
          <BasicTabsById id={userId} />
        </div>
      </div>
      <FollowersMenu open={open} onClose={() => setOpen(false)} />
      <FollowingMenu
        open={openFolowing}
        onClose={() => setOpenFolowing(false)}
      />
      

    </>
  );
};

export default ComponentProfileById;
