"use client";

import { video } from "@/assets/icon/layout/svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useExplorePage } from "@/store/pages/explore/explore";
import { API } from "@/utils/config";
import { useEffect, useState } from "react";
import BasicModal from "./modal";
import { Image } from "next/image";

export default function Explore() {
  const { data, getExplore } = useExplorePage();

  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect((el) => {
    getExplore();
  }, []);

  return (
    <>
      <div className="w-[80%] m-auto mt-[20px] flex flex-wrap gap-[10px]">
        {Array.isArray(data) &&
          data.map((e, i) => (
            <div
              key={i}
              className="w-[32%] h-[200px] md:h-[300px] relative group cursor-pointer"
              onClick={() => { setOpen(true); setSelectedPost(e); }}
            >
              {Array.isArray(e.images) &&
                e.images.slice(0, 1).map((fileName) => {
                  const isVideo = fileName.endsWith(".mp4") || fileName.endsWith(".webm");
                  const src = `${API}/images/${fileName}`;
                  
                  return (
                    <>
                      {isVideo ? (
                        <video
                          key={e.postId}
                          autoPlay
                          muted
                          loop
                          src={src}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          
                          key={e.postId}
                          src={src}
                          alt="media"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
                        <div className="text-white flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
                            >
                              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            <p>{e.postLikeCount}</p>
                          </div>

                          <div className="flex gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
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
      {/* Используем существующий modal.jsx, передаем open, setOpen, selectedPost */}
      <BasicModal open={open} setOpen={setOpen} selectedPost={selectedPost} />
    </>
  );
}
