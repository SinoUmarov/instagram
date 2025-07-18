import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { usePostActions } from "@/store/pages/home/post-actions/post-actions";
import Comments from "../comments/comments";

export default function PostActions({
  // likeCount,
  userName,
  content,
  commentCount,
  // datePublished,
  postId,
  comments,
}) {
  const {
    addPostFavorite,
    getPostByID,
    isPostSaved,
    addLikePost,
    isPostLiked,
    likeCounts,
    getLikeCount,
  } = usePostActions();
  const [isCommit, setIsCommit] = useState(false);
  const [open, setOpen] = useState(false);
  const saved = isPostSaved(postId);
  const isLiked = isPostLiked(postId);
  const likeCount = likeCounts[postId] || 0;

  const handleClickOpen = () => {
    setOpen(true);
    setIsCommit(!isCommit);
    getPostByID(postId);
  };

  const toggleSave = () => {
    addPostFavorite(postId);
  };

  const toggleLike = () => {
    addLikePost(postId);
  };

  // function baroi vaqti post kardanro nishon medihad
  // const rawTime = formatDistanceToNow(new Date(datePublished), {
  //   addSuffix: true,
  // });
  // const timeAgo = rawTime.replace("about ", "");

  return (
   <div className="flex flex-col gap-2 py-2">
  {/* Иконаҳо */}
  <div className="flex justify-between items-center">
    <div className="flex gap-1">
      <IconButton color="error" onClick={() => toggleLike(postId)} size="small">
        {isLiked ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon className="cursor-pointer text-black" fontSize="small" />
        )}
      </IconButton>

      <IconButton onClick={() => handleClickOpen(postId)} size="small">
        <ChatBubbleOutlineIcon className="cursor-pointer text-black" fontSize="small" />
      </IconButton>

      <IconButton size="small">
        <SendIcon className="cursor-pointer text-black" fontSize="small" />
      </IconButton>
    </div>

    <IconButton
      className="cursor-pointer"
      style={{ color: "black" }}
      onClick={() => toggleSave(postId)}
      size="small"
    >
      {saved ? <BookmarkIcon fontSize="small" /> : <TurnedInNotIcon fontSize="small" />}
    </IconButton>
  </div>

  {/* Likes */}
  {likeCount > 0 && (
    <p className="font-bold text-sm text-[#1E293B]">
      {likeCount} {likeCount === 1 ? "like" : "likes"}
    </p>
  )}

  {/* Контент ва Комментарийҳо */}
  <div className="flex flex-col gap-1">
    {content && (
      <p className="text-[#1E293B] text-sm leading-tight">
        <span className="font-semibold">{userName}</span> {content}
      </p>
    )}

    {commentCount > 0 && (
      <p className="text-sm text-[#737373] leading-tight cursor-pointer">
        View all {commentCount} comments
      </p>
    )}

    {/* Вақти пост */}
    <p className="uppercase tracking-wide text-[11px] text-[#737373] font-medium">
      {/* {timeAgo} */}
    </p>
  </div>

  {isCommit && (
    <Comments
      open={open}
      setOpen={setOpen}
      comments={comments}
      postId={postId}
    />
  )}
</div>

  );
}
