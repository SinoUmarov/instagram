"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import img1 from "#/img/pages/home/imgStory1.svg";
import img2 from "#/img/pages/home/imgStory2.svg";
import img3 from "#/img/pages/home/imgStory3.svg";
import img4 from "#/img/pages/home/imgStory4.svg";
import { useUser } from "@/store/pages/home/home";

export default function Home() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // const stories = [
  //   { id: 1, name: "your story", image: img1 },
  //   { id: 2, name: "terrylucas", image: img2 },
  //   { id: 3, name: "lauramatthew", image: img3 },
  //   { id: 4, name: "harryprescott", image: img4 },
  //   { id: 5, name: "ednamanz", image: img1 },
  //   { id: 6, name: "christinaste", image: img2 },
  //   { id: 7, name: "johnschmit", image: img3 },
  //   { id: 8, name: "amyporter", image: img4 },
  //   { id: 9, name: "your story", image: img1 },
  //   { id: 10, name: "terrylucas", image: img2 },
  //   { id: 11, name: "lauramatthew", image: img3 },
  //   { id: 12, name: "harryprescott", image: img4 },
  //   { id: 13, name: "ednamanz", image: img1 },
  //   { id: 14, name: "christinaste", image: img2 },
  //   { id: 15, name: "johnschmit", image: img3 },
  //   { id: 16, name: "amyporter", image: img4 },
  // ];

  const { users, getUsers, stories, getStories, posts, getPosts } = useUser();
  console.log("posts: ", posts);
  useEffect(() => {
    getUsers();
    getStories();
    getPosts();
  }, []);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <>
      <main className="w-[620px] mx-[50px]">
        <div className="relative  px-4 py-4 border-b border-[#f3f3f3] ">
          {/* Стрелкаи чап */}
          <div
            ref={prevRef}
            className="swiper_button_prev absolute left-[30px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
          >
            <ChevronLeft size={20} />
          </div>

          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={12}
            slidesPerView="auto"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {stories.map((story) => (
              <SwiperSlide
                key={story.userId}
                className="!w-[72px] flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                  <div className="bg-white rounded-full p-[3px]">
                    <Image
                      src={`http://37.27.29.18:8003/images/${story.userImage}`}
                      alt="story"
                      className="rounded-full object-cover"
                      width={60}
                      height={60}
                    />
                  </div>
                </div>
                <p className="text-xs mt-1 truncate w-[60px]">
                  {story.userName}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Стрелкаи рост */}
          <div
            ref={nextRef}
            className="swiper_button_next absolute right-[40px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </div>
        </div>

        <div className="flex flex-col gap-5 py-5">
          {posts.map((post) => (
            <div key={post.postId} className="flex flex-col gap-3" >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                    <div className="bg-white rounded-full p-[3px]">
                      <Image
                        src={`http://37.27.29.18:8003/images/${post.userImage}`}
                        alt="story"
                        className="rounded-full object-cover h-[32px]"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col ">
                    <p className="text-[14px] font-semibold text-[#1E293B] truncate ">
                      {post.userName}
                    </p>
                    <p className="text-[14px] font-medium text-[#475569]  truncate ">
                      Profil
                    </p>
                  </div>
                </div>

                <Ellipsis />
              </div>

              <div className="w-[620px]">
                {typeof post.images === "string" &&
                post.images?.endsWith(".mp4") ? (
                  <video  width={620}
                    height={614}   controls className="w-full h-auto rounded-[10px]  mt-2">
                    <source
                      src={`http://37.27.29.18:8003/images/${post.images}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <Image
                    src={`http://37.27.29.18:8003/images/${post.images}`}
                    alt="story"
                    className=" object-cover rounded-[10px]"
                    width={620}
                    height={614}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
