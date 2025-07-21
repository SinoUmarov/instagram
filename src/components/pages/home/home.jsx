"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { Ellipsis } from "lucide-react";
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
import Recommendation from "./recommendation/recommendation";
import { Box, Dialog, DialogContent } from "@mui/material";
import { usePostActions } from "@/store/pages/home/post-actions/post-actions";
import PostSkeleton from "./post-skeleton/PostSkeleton";
import Story from "./story/story";

export default function Home() {
  const { posts, getPosts } = useUser();
  const [open, setOpen] = useState(false);
  const { addPostFavorite } = usePostActions();

  const toggleSave = () => {
    addPostFavorite(postId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPosts();
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
      <section className="flex items-start gap-10">
        <main className="w-full sm:w-[600px] px-2">
          <section>
            <Story />
          </section>

          <div className="flex flex-col gap-5 py-5">
            {posts.length === 0
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <PostSkeleton key={idx} />
                ))
              : posts.map((post) => {
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

                          <Ellipsis
                            className="cursor-pointer"
                            onClick={handleClickOpen}
                          />
                        </div>

                        <div className="w-full sm:w-[580px]">
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
                              className="imgOfHome object-cover rounded-[10px]"
                              width={580}
                              height={600}
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

        <aside className="py-4 w-[31%] hidden md:block ">
          <Recommendation />
        </aside>

        <Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className="flex flex-col gap-5 w-[450px] h-[445px] ">
              <Box className="flex flex-col gap-3">
                <button className="font-bold text-red-500 border-b border-[#e9e8e8] pb-2 ">
                  Report
                </button>
                <button className="font-bold text-red-500 border-b border-[#e9e8e8] pb-2 ">
                  Unfollow
                </button>
                <button
                  className="border-b border-[#e9e8e8] pb-2"
                  onClick={() => toggleSave(postId)}
                >
                  Add to favorite
                </button>
                <button className="border-b border-[#e9e8e8] pb-2">
                  Go to post
                </button>
                <button className="border-b border-[#e9e8e8] pb-2">
                  Share to...
                </button>
                <button className="border-b border-[#e9e8e8] pb-2">
                  Copy link
                </button>
                <button className="border-b border-[#e9e8e8] pb-2">
                  Embed
                </button>
                <button className="border-b border-[#e9e8e8] pb-2">
                  About this account
                </button>
                <button
                  className="border-b border-[#e9e8e8] pb-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </Box>
            </DialogContent>
          </Dialog>
        </Fragment>
      </section>
    </>
  );
}
