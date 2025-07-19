"use client";

import { useExplorePage } from "@/store/pages/explore/explore";
import { API } from "@/utils/config";
import { useEffect, useState } from "react";
import BasicModal from "./modal";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function Explore() {
  const { data, getExplore } = useExplorePage();
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExplore = async () => {
      setIsLoading(true);
      await getExplore();
      setIsLoading(false);
    };
    fetchExplore();
  }, []);

  return (
    <>
      <div className="md:hidden mt-3 px-3 mb-3">
        <input
          type="text"
          placeholder="Поиск"
          className="w-full rounded-md px-4 py-2 bg-white text-black border border-black placeholder:text-neutral-500 outline-none"
        />
      </div>

      <div className="w-full max-w-[1000px] m-auto grid grid-cols-3 gap-[1px]">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <Box key={i} className="aspect-square">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
              </Box>
            ))
          : Array.isArray(data) &&
            data.map((e, i) => (
              <div
                key={i}
                className="relative group cursor-pointer aspect-square overflow-hidden"
                onClick={() => {
                  setOpen(true);
                  setSelectedPost(e);
                }}
              >
                {Array.isArray(e.images) &&
                  e.images.slice(0, 1).map((fileName) => {
                    const isVideo =
                      fileName.endsWith(".mp4") || fileName.endsWith(".webm");
                    const src = `${API}/images/${fileName}`;
                    return (
                      <>
                        {isVideo ? (
                          <video
                            key={e.postId}
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={src}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            key={e.postId}
                            src={src}
                            alt="Media"
                            className="w-full h-full object-cover"
                          />
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="text-white flex gap-6 font-semibold text-sm">
                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path d="M11.645 20.91a.75.75 0 0 0 .71 0l.003-.002.007-.004.022-.012a15.252 15.252 0 0 0 .383-.219 25.18 25.18 0 0 0 4.244-3.17c2.3-2.145 4.738-5.331 4.738-9.256 0-2.928-2.464-5.25-5.437-5.25A5.5 5.5 0 0 0 12 5.052 5.5 5.5 0 0 0 7.688 3C4.714 3 2.25 5.322 2.25 8.25c0 3.924 2.438 7.11 4.739 9.256a25.18 25.18 0 0 0 4.244 3.17c.134.078.264.15.383.218l.022.012.007.003Z" />
                              </svg>
                              <p>{e.postLikeCount}</p>
                            </div>

                            <div className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p>{e.commentCount}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            ))}
      </div>

      <BasicModal open={open} setOpen={setOpen} selectedPost={selectedPost} />
    </>
  );
}
