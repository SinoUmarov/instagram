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
  liked,
  saved,
  likeCount,
  userName,
  content,
  commentCount,
  comment,
  datePublished,
  postId,
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isSaved, setIsSaved] = useState(saved);
  const [likes, setLikes] = useState(likeCount);
  const { likePost, addPostFavorite } = usePostActions();

  const toggleSave = () => {
    setIsSaved(!isSaved);
    addPostFavorite(postId)
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    likePost(postId);
  };

  // function baroi vaqti post kardanro nishon medihad
  const rawTime = formatDistanceToNow(new Date(datePublished), {
    addSuffix: true,
  });
  const timeAgo = rawTime.replace("about ", "");

  return (
    <div className="flex flex-col gap-2">
      {/* Иконаҳо */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <IconButton color="error" onClick={() => toggleLike(postId)}>
            {isLiked ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon className="cursor-pointer text-black" />
            )}
          </IconButton>
          <ChatBubbleOutlineIcon className="m-2 cursor-pointer" />
          <SendIcon className="m-2 cursor-pointer" />
        </div>

        <IconButton
          className="cursor-pointer"
          style={{ color: "black" }}
          onClick={() => toggleSave(postId)}
        >
          {isSaved ? <BookmarkIcon /> : <TurnedInNotIcon />}
        </IconButton>
      </div>

      {/* Likes */}
      {likes > 0 && (
        <p className="px-2 font-bold text-[14px] text-[#1E293B]">
          {likes} {likes === 1 ? "like" : "likes"}
        </p>
      )}

      {/* Контент ва Комментарийҳо */}
      <div className="px-2 flex flex-col gap-1">
        {content && (
          <p className="text-[#1E293B] text-[14px] leading-[18px]">
            <span className="font-semibold">{userName}</span> {content}
          </p>
        )}

        {commentCount > 0 && (
          <p className="text-[14px] text-[#737373] leading-[18px] cursor-pointer">
            View all {commentCount} comments
          </p>
        )}

        {/* Вақти пост */}
        <p className="uppercase tracking-wider text-[11px] text-[#737373] font-medium">
          {timeAgo}
        </p>
      </div>
    </div>
  );
}
