"use client";

import { video } from "@/assets/icon/layout/svg";
import { useExplorePage } from "@/store/pages/explore/explore";
import { API } from "@/utils/config";
import { useEffect } from "react";
import { Image } from "next/image";

export default function Explore() {
  const { data, getExplore } = useExplorePage();

  useEffect((el) => {
    getExplore();
  }, []);

  return (
    <>
  <div className=" w-[80%] m-auto mt-[20px] flex flex-wrap gap-[10px] ">
      {Array.isArray(data) &&
        data.map((e, i) => (
          <div key={i} className="w-[32%] h-[200px] md:h-[300px] relative group">
            {Array.isArray(e.images) &&
              e.images.slice(0, 1).map((fileName, index) => {
                const isVideo =
                  fileName.endsWith(".mp4") || fileName.endsWith(".webm");
                const src = `${API}/images/${fileName}`;
                return (
                  <>
                    {isVideo ? (
                      <video
                        key={index}
                        autoPlay
                        muted
                        loop
                        src={src}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        key={index}
                        src={src}
                        alt="media"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </>
                );
              })}
          </div>
        ))}
  </div>
    </>
  );
}
