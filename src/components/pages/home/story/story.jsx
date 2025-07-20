"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useRef } from "react";
import { useUser } from "@/store/pages/home/home";
import Image from "next/image";
import instagramDefaultProfile from "#/icon/layout/instagramDefaultProfile.jpg";



export default function Story() {
  const { stories, getStories } = useUser();
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div>
      <div className="relative py-4">
        {/* Стрелкаи чап */}

        <div
          ref={prevRef}
          className="swiper_button_prev hidden sm:flex absolute left-[11px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
        >
          <ArrowCircleLeftIcon size={20} />
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
                    width={50}
                    height={50}
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
          <ArrowCircleRightIcon size={24} />
        </div>
      </div>
    </div>
  );
}
