"use client";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import instagramDefaultProfile from "#/icon/layout/instagramDefaultProfile.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { usePostActions } from "@/store/pages/home/post-actions/post-actions";
import { Box, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import {
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
} from "date-fns";
import WriteComment from "../write-comment/write-comment";

export default function Comments({ open, setOpen, comments, postId }) {
  const {
    postByID,
    getPostByID,
    addPostFavorite,
    isPostSaved,
    addLikePost,
    isPostLiked,
    likeCounts,
    getLikeCount,
  } = usePostActions();
  const [isLikedComment, setIsLikedComment] = useState({});
  const saved = isPostSaved(postId);
  const isLiked = isPostLiked(postId);
  const likeCount = likeCounts[postId] || 0;

  // function baroi like-hoi comment
  const toggleLikeComment = (postCommentId) => {
    setIsLikedComment((prev) => ({
      ...prev,
      [postCommentId]: !prev[postCommentId],
    }));
  };

  //
  const toggleLike = () => {
    addLikePost(postId);
  };

  const toggleSave = () => {
    addPostFavorite(postId);
  };

  console.log("comment: ", comments);
  console.log("postByID: ", postByID);

  useEffect(() => {
    if (postId) {
      getPostByID(postId);
    }
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
  };

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
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "90vw",
            width: "60%",
            height: "90vh",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
          }}
          className="flex flex-col md:flex-row  h-[90vh] "
        >

            {/* LEFT: MEDIA */}
            <Box className="w-[50%] md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center ">
              {postByID?.images && (postByID?.images?.map((media, index) =>
                media.endsWith(".mp4") ? (
                  <video
                    key={index}
                    // controls
                    autoPlay
                    className="w-full h-full object-cover"
                  >
                    <source
                      src={`http://37.27.29.18:8003/images/${media}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <Image
                    key={index}
                    src={`http://37.27.29.18:8003/images/${media}`}
                    width={400}
                    height={614}
                    alt="story"
                    className="w-full h-full object-cover"
                  />
                )
              ))}
            </Box>

            {/* RIGHT: COMMENT + USER */}
            <Box className="w-[50%] md:w-1/2 h-1/2 md:h-full flex flex-col justify-start overflow-y-auto p-4 bg-white">
            
              <div className="flex justify-between items-center  py-2">
                <div className="flex items-center gap-3 pb-3">
                  <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                    <div className="bg-white rounded-full p-[3px]">
                      <Image
                        src={
                          postByID?.userImage ? `http://37.27.29.18:8003/images/${postByID.userImage}`
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
                      {postByID.userName}
                    </p>
                  </div>
                </div>
                <MoreHorizIcon className="mt-[-10px]" />
              </div>

              <hr className="text-[#f0f0f0] py-2" />

              <div className="flex flex-col gap-3 overflow-y-auto ">
                <div className="flex flex-col justify-between">
                  {/* Ин ҷо комментҳоро метавон ҷой дод */}
                  <div className="flex flex-col">
                    {postByID.content && (
                      <div className="flex gap-3 items-center">
                        <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                          <div className="bg-white rounded-full p-[3px]">
                            <Image
                              src={
                                postByID.userImage
                                  ? `http://37.27.29.18:8003/images/${postByID.userImage}`
                                  : instagramDefaultProfile
                              }
                              alt="story"
                              className="rounded-full object-cover h-[32px]"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <p className="text-[14px] font-semibold text-[#1E293B] truncate">
                                {postByID.userName}
                              </p>
                              <p className="text-[14px] truncate font-medium">
                                {postByID.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* shart guzoshtam ki agar comment boshad nishon dihad agar naboshad 'No comments...' nishon dihad */}
                  <div className="py-5 w-full">
                    {comments.length > 0 ? (
                      <div className="flex flex-col gap-5 w-full">
                        {comments?.map((comment, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-start w-full"
                          >
                            {/* LEFT SIDE: Avatar + Comment */}
                            <div className="flex gap-3">
                              {/* Avatar */}
                              <div className="rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 p-[2px] cursor-pointer">
                                <div className="bg-white rounded-full p-[2px]">
                                  <Image
                                    src={
                                      comment.userImage
                                        ? `http://37.27.29.18:8003/images/${comment.userImage}`
                                        : instagramDefaultProfile
                                    }
                                    alt="comment-user"
                                    className="rounded-full object-cover h-[32px] w-[32px]"
                                    width={32}
                                    height={32}
                                  />
                                </div>
                              </div>

                              {/* Username + Comment Text + Time */}
                              <div className="flex flex-col">
                                <div className="flex flex-wrap items-center gap-2 text-sm leading-snug">
                                  <p className="font-semibold text-[#262626]">
                                    {comment.userName}
                                  </p>
                                  <p className="text-[#262626]">
                                    {comment.comment}
                                  </p>
                                </div>
                                <div className="flex gap-2 ">
                                  <p className="text-xs text-gray-500 font-medium mt-1">
                                    {formatShortTime(comment.dateCommented)}
                                  </p>
                                  <p className="text-xs text-gray-500 font-medium mt-1 cursor-pointer">
                                    Reply
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* RIGHT SIDE: Like Icon */}
                            <div className="w-[40px] flex justify-end">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  toggleLikeComment(comment.postCommentId)
                                }
                                size="small"
                              >
                                {isLikedComment[comment.postCommentId] ? (
                                  <FavoriteIcon sx={{ fontSize: 18 }} />
                                ) : (
                                  <FavoriteBorderIcon
                                    sx={{ fontSize: 18, color: "#262626" }}
                                  />
                                )}
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-2">
                        No comments...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* post-actions */}
              <div className="fixed bottom-[38px] py-2 border-t-b border-[#f0f0f0]  w-[28%] ">
                <div className="flex flex-col gap-2 pb-2">
                  {/* Иконаҳо */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <IconButton
                        color="error"
                        onClick={() => toggleLike(postId)}
                      >
                        {isLiked ? (
                          <FavoriteIcon  className="m-2 cursor-pointer" />
                        ) : (
                          <FavoriteBorderIcon className="m-2 cursor-pointer text-black" />
                        )}
                      </IconButton>

                      <IconButton>
                        <ChatBubbleOutlineIcon className="m-2 cursor-pointer text-black " />
                      </IconButton>

                      <IconButton>
                        <SendIcon className="m-2 cursor-pointer text-black " />
                      </IconButton>
                    </div>

                    <IconButton
                      className="cursor-pointer"
                      style={{ color: "black" }}
                      onClick={() => toggleSave(postId)}
                    >
                      {saved ? <BookmarkIcon /> : <TurnedInNotIcon />}
                    </IconButton>
                  </div>

                  {/* Likes */}
                  {likeCount > 0 && (
                    <p className="px-2 font-bold text-[14px] text-[#1E293B]">
                      {likeCount} {likeCount === 1 ? "like" : "likes"}
                    </p>
                  )}

                  {/* Контент ва Комментарийҳо */}
                  <div className="px-2 flex flex-col gap-1">
                    {postByID.content && (
                      <p className="text-[#1E293B] text-[14px] leading-[18px]">
                        <span className="font-semibold">
                          {postByID.userName}
                        </span>{" "}
                        {postByID.content}
                      </p>
                    )}

                    {/* Вақти пост */}
                    <p className="uppercase tracking-wider text-[11px] text-[#737373] font-medium">
                      {/* {timeAgo} */}
                    </p>
                  </div>




                </div>

                <WriteComment postId={postId} /> 
                    
              </div>
            </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
