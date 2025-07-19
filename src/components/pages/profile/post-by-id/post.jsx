"use client";

import { useProfileByIdStore } from "@/store/pages/profile/profile-by-id/store-by-id";
import { API } from "@/utils/config";
import { useEffect } from "react";

export default function PostById({id}) {
  const { getPostById ,postById } = useProfileByIdStore();

  useEffect(() => {
    getPostById(id)
  }, []);

  return (
   <div className="grid grid-cols-3 gap-[2px] sm:gap-4 px-1 sm:px-0">
      {postById?.map((el) => {
        const file = el?.images?.[0]
        const isVideo = typeof file === 'string' && file.endsWith(".mp4")
        const src = `${API}/images/${file}`

        return (
          <div key={el.postId} className="w-full aspect-square overflow-hidden">
            {isVideo ? (
              <video
                src={src}
                controls
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <img
                src={src}
                alt="user post"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded"
              />
            )}
          </div>
        )
      })}
    </div>
  );
}
