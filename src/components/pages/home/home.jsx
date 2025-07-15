"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useUser } from "@/store/pages/home/home";
import instagramDefaultProfile from '#/icon/layout/instagramDefaultProfile.jpg'



export default function Home() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

  console.log('sories: ', stories)
  return (
    <>
      <main className="w-[620px] mx-[50px]">
        <div className="relative  px-4 py-4 border-b border-[#f0f0f0] ">
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
                <div className={`rounded-full ${story.stories > 0 ? 'bg-gradient-to-br  from-pink-500 to-yellow-400' : 'bg-transparent'}   p-[2px] cursor-pointer`}>
                  <div className="bg-white rounded-full p-[3px]">
                    <Image
                      src={story.userImage ? `http://37.27.29.18:8003/images/${story.userImage}` : instagramDefaultProfile }
                      alt='story'
                      className="imgStory rounded-full w-full object-cover"
                      width={56}
                      height={56} 
                    />
                  </div>
                </div>
                <p className="text-xs mt-1 truncate text-center">
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
            <div key={post.postId} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                    <div className="bg-white rounded-full p-[3px]">
                      <Image
                      // `http://37.27.29.18:8003/images/${post.userImage}`
                        src={post.userImage ? `http://37.27.29.18:8003/images/${post.userImage}` : instagramDefaultProfile}
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
                {post.images?.[0]?.endsWith(".mp4") ? (
                  <video
                    controls
                    className="imgOfHome rounded-[10px] mt-2"
                  >
                    <source
                      src={`http://37.27.29.18:8003/images/${post.images[0]}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <Image
                    src={`http://37.27.29.18:8003/images/${post.images[0]}`}
                    alt="story"
                    className="imgOfHome object-cover rounded-[10px] "
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
