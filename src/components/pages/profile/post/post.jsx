"use client";

import { useProfileStore } from "@/store/pages/profile/profile/store-profile";
import { API } from "@/utils/config";
import { useEffect } from "react";

export default function Post() {
  const { getMyPost, posts } = useProfileStore();

  useEffect(() => {
    getMyPost();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
      {posts?.map((el) => (
        <div key={el.postId} className="w-full aspect-square overflow-hidden">
          <img
            src={`${API}/images/${el?.images}`}
            alt="user post"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded"
          />
        </div>
      ))}
    </div>
  );
}
