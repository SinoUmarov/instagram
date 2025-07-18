"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { useUser } from "@/store/pages/home/home";
import instagramDefaultProfile from "#/icon/layout/instagramDefaultProfile.jpg";
import PostActions from "./post-actions/post-actions";
import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
} from "date-fns";


export default function Home() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const {stories, getStories, posts, getPosts } = useUser();

  useEffect(() => {
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

  // function baroi vaqti post kardanro nishon medihad
  function formatShortTime(date) {
    const now = Date.now();
    const published = new Date(date);
    const diffMins = differenceInMinutes(now, published);
    if (diffMins < 60) return `${diffMins}m`;

    const diffHours = differenceInHours(now, published);
    if (diffHours < 24) return `${diffHours}h`;

    const diffDays = differenceInDays(now, published);
    return `${diffDays}d`;
    
  }

  return (
    <>
      <main className="w-full sm:w-[620px] sm:mx-[50px] px-2">

        <div className="relative py-4">
          {/* Стрелкаи чап */}

          <div
            ref={prevRef}
            className="swiper_button_prev hidden sm:flex absolute left-[11px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
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
                className="!w-[64px] sm:!w-[72px] flex flex-col items-center text-center"
              >
                <div
                  className={`rounded-full ${
                    story.stories > 0
                      ? "bg-gradient-to-br  from-pink-500 to-yellow-400"
                      : "bg-transparent"
                  } p-[2px] cursor-pointer`}
                >
                  <div className="bg-white rounded-full p-[3px]">
                    <Image
                      src={
                        story.userImage
                          ? `http://37.27.29.18:8003/images/${story.userImage}`
                          : instagramDefaultProfile
                      }
                      alt="story"
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
            className="swiper_button_next hidden sm:flex absolute right-[10px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </div>
        </div>

        <div className="flex flex-col gap-5 py-5">
          {posts.map((post) => {
            return (
              <section
                key={post.postId}
                className="border-b border-[#f0f0f0] pb-2"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-start">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                          <div className="bg-white rounded-full p-[3px]">
                            <Image
                              src={
                                post.userImage
                                  ? `http://37.27.29.18:8003/images/${post.userImage}`
                                  : instagramDefaultProfile
                              }
                              alt="story"
                              className="rounded-full object-cover h-[32px]"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-[14px] font-semibold text-[#1E293B] truncate">
                            {post.userName}
                          </p>
                          <p className="text-[14px] font-medium text-[#475569] truncate">
                            Profil 
                          </p>
                        </div>
                      </div>
                      {/* <MyProfil/> */}
                      <p className="tracking-wider text-[14px] text-[#737373] font-medium">
                        {formatShortTime(post.datePublished)}
                      </p>
                    </div>

                    <Ellipsis />
                  </div>

                  <div className="w-full sm:w-[620px]">
                    {post.images?.[0]?.endsWith(".mp4") ? (
                      <video
                        controls
                        className="imgOfHome rounded-[10px] mt-2 w-full"
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
                        className="imgOfHome object-cover rounded-[10px] w-full"
                        width={620}
                        height={614}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <PostActions
                    liked={post.postLike}
                    saved={post.postFavorite}
                    likeCount={post.postLikeCount}
                    userName={post.userName}
                    content={post.content}
                    commentCount={post.commentCount}
                    datePublished={post.datePublished}
                    postId={post.postId}
                    comments={post.comments}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
