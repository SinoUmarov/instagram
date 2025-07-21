"use client";

import StoriesViewer from "react-insta-stories";
import { jwtDecode } from "jwt-decode";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import instagramDefaultProfile from "#/icon/layout/instagramDefaultProfile.jpg";
import { useStory } from "@/store/pages/home/story/story";
import { useProfileStore } from "@/store/pages/profile/profile/store-profile";

export default function Story() {
  const { stories, getStories, getSubscribtions } = useStory();
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [openStory, setOpenStory] = useState(null); 
  const [watchedStories, setWatchedStories] = useState(new Set());
  const { info } = useProfileStore();
  const [hasMyStory, setHasMyStory] = useState(false);
  const [myStory, setMyStory] = useState(null);

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
    const token = localStorage.getItem("access_token");
    const decode = jwtDecode(token);
    getStories().then((allStories) => {
      const myStory = allStories?.find((story) => story.userId === decode.sid);
      if (myStory) {
        setHasMyStory(myStory);
        setMyStory(myStory);
      }
    });
    getSubscribtions(decode.sid);
  }, []);

  const openStoryViewer = (story) => {
    setOpenStory(story);
    setWatchedStories((prev) => new Set(prev).add(story.userId));
  };

  const closeViewer = () => {
    setOpenStory(null);
  };

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
          {/* My Story */}
          <SwiperSlide className="!w-[60px] sm:!w-[60px] flex flex-col items-center text-center">
            <div
              className={`rounded-full ${
                myStory && watchedStories.has(myStory.userId)
                  ? "bg-[#ccc]"
                  : "bg-gradient-to-br from-pink-500 to-yellow-400"
              } p-[2px] cursor-pointer w-[60px]`}
              onClick={() => openStoryViewer(myStory)}
            >
              <div className="bg-white rounded-full p-[3px] relative">
                <Image
                  src={
                    info?.image
                      ? `http://37.27.29.18:8003/images/${info.image}`
                      : instagramDefaultProfile
                  }
                  alt="your story"
                  className="imgStory1 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                {!hasMyStory && (
                  <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full text-xs px-1">
                    +
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs mt-1 truncate">My story</p>
          </SwiperSlide>

          {stories
            .filter((story) => {
              // Агар myStory вуҷуд надошта бошад, ҳамаашро нишон деҳ
              if (!myStory) return true;

              // Агар myStory вуҷуд дошта бошад, онро истисно кун
              return story.userId !== myStory.userId;
            })
            .map((story) => {
              const isWatched = watchedStories.has(story.userId);
              return (
                <SwiperSlide
                  key={story.userId}
                  className="!w-[60px] sm:!w-[60px] flex flex-col items-center text-center"
                >
                  <div
                    className={`rounded-full ${
                      isWatched > 0
                        ? "bg-[#ccc]"
                        : "bg-gradient-to-br from-pink-500 to-yellow-400"
                    } p-[2px] cursor-pointer w-[60px]`}
                    onClick={() => openStoryViewer(story)}
                  >
                    <div className="bg-white rounded-full p-[3px] ">
                      <Image
                        src={
                          story.userImage
                            ? `http://37.27.29.18:8003/images/${story.userImage}`
                            : instagramDefaultProfile
                        }
                        alt="story"
                        className="imgStory1 rounded-full object-cover"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <p className="text-xs mt-1 truncate">{story.userName}</p>
                </SwiperSlide>
              );
            })}
        </Swiper>

        {/* Стрелкаи рост */}
        <div
          ref={nextRef}
          className="swiper_button_next hidden sm:flex absolute right-[10px] top-[50px] -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
        >
          <ArrowCircleRightIcon size={24} />
        </div>
      </div>

      {/* Viewer (Overlay) */}
      {openStory && myStory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="w-[90%] max-w-md">
            <StoriesViewer
              stories={openStory?.stories?.map((item) => ({
                url: `http://37.27.29.18:8003/images/${item.fileName}`,
              }))}
              defaultInterval={5000}
              onAllStoriesEnd={closeViewer}
            />
            <button
              onClick={closeViewer}
              className="absolute top-4 right-4 text-white text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
