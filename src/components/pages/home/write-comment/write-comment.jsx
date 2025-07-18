"use client";

import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IconButton } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { usePostActions } from "@/store/pages/home/post-actions/post-actions";

export default function WriteComment({ postId }) {
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { postComment } = usePostActions();

  const handleSubmit = () => {
    if (comment.trim()) {
      postComment(comment, postId);
      console.log("Коммент равон шуд:", comment);
      setComment("");
    }
  };

  const onEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative w-full flex items-center border-t border-[#e4e2e2]  p-2 bg-white">
      {showEmoji && (
        <div className="absolute bottom-12 left-0 z-10">
          <EmojiPicker onEmojiClick={onEmojiClick} height={350} />
        </div>
      )}
      <IconButton onClick={() => setShowEmoji((prev) => !prev)}>
        <EmojiEmotionsIcon />
      </IconButton>
      <input
        type="text"
        className="flex-1 outline-none border-none  px-2 text-sm"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className={`text-sm font-semibold text-blue-500 hover:opacity-70 ${
          comment.trim() ? "" : "opacity-40 pointer-events-none"
        }`}
      >
        Post
      </button>
    </div>
  );
}
