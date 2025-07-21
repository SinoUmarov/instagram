"use client";
import * as React from "react";
import {
  Box,
  Modal,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  MoreHoriz,
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Send,
  BookmarkBorder,
  EmojiEmotions,
  VolumeUp,
  VolumeOff,
  DateRange,
} from "@mui/icons-material";
import { API } from "@/utils/config";
import { useExplorePage } from "@/store/pages/explore/explore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: 1200,
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  display: "flex",
  overflow: "hidden",
};

export default function InstagramModal({ open, setOpen, selectedPost }) {
  const handleClose = () => setOpen(false);
  const {
    AddComment,
    dataComments,
    setInitialComments,
    likePost,
    addFollowingRelationship,
    dataReels,
    getReels,
    addFavorite,
  } = useExplorePage();

  const [textComment, setTextComment] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(selectedPost?.postLike || false);
  const [isMuted, setIsMuted] = React.useState(false);

  React.useEffect(() => {
    if (selectedPost) {
      setInitialComments(selectedPost.comments);
      setIsLiked(selectedPost.postLike || false);
    }
  }, [selectedPost]);

  React.useEffect(() => {
    getReels();
  }, []);

  React.useEffect(() => {
    const video = document.getElementById("post-video");
    if (video && video instanceof HTMLVideoElement) {
      video.muted = false;
      setIsMuted(false);
      video.play().catch((e) => {
        console.log("Autoplay error:", e);
      });
    }
  }, [selectedPost]);

  function sendComment() {
    const text = {
      comment: textComment,
      postId: selectedPost.postId,
    };
    AddComment(text);
    setTextComment("");
  }

  function handleLike() {
    if (!selectedPost) return;
    likePost(selectedPost.postId);
    setIsLiked((prev) => !prev);
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="post-modal">
      <Box sx={style}>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {selectedPost?.images?.map((fileName) => {
            const isVideo =
              fileName.endsWith(".mp4") || fileName.endsWith(".webm");
            const src = `${API}/images/${fileName}`;

            if (isVideo) {
              return (
                <Box
                  key={selectedPost.postId}
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <video
                    id="post-video"
                    src={src}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }}
                    autoPlay
                    playsInline
                    muted={isMuted}
                  />
                  <IconButton
                    size="small" 
                    onClick={() => {
                      const video = document.getElementById("post-video");
                      if (video && video instanceof HTMLVideoElement) {
                        video.muted = !video.muted;
                        setIsMuted(video.muted);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      zIndex: 2,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {isMuted ? (
                      <VolumeOff fontSize="small" />
                    ) : (
                      <VolumeUp fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              );
            }

            return (
              <img
                key={selectedPost.postId}
                src={src || "/placeholder.svg"}
                alt="Post content"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            );
          })}
        </Box>

        <Box
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #efefef",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={selectedPost?.userPhoto}
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {selectedPost?.userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Оригинальное аудио
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {dataReels.map((el) => (
                <Button
                  key={el.userId}
                  onClick={() => addFollowingRelationship(el.userId)}
                  size="small"
                  variant="text"
                  color="primary"
                  sx={
                    el.isSubscriber === true
                      ? {
                          bgcolor: "#efefef",
                          color: "#333",
                          boxShadow: "none",
                          "&:hover": { bgcolor: "#e0e0e0" },
                        }
                      : {}
                  }
                  disabled={el.isSubscriber === true}
                >
                  {el.isSubscriber === true ? "Подписки" : "Подписаться"}
                </Button>
              ))}
              <IconButton size="small">
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
            {dataComments.length > 0 ? (
              dataComments.map((el, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Avatar
                      src={API + "/images/" + el.userImage}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          {el.userName}
                        </Typography>
                        <Typography variant="body2">{el.comment}</Typography>
                      </Box>
                    </Box>
                    <IconButton size="small">
                      <FavoriteBorder fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="text.secondary" align="center">
                  Комментариев пока нет. <br /> Начните переписку.
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ borderTop: "1px solid #efefef" }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={handleLike}
                    color={isLiked ? "error" : "default"}
                  >
                    {isLiked ? (
                      <Favorite sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  <IconButton size="small">
                    <ChatBubbleOutline />
                  </IconButton>
                  <IconButton size="small">
                    <Send />
                  </IconButton>
                </Box>
                <IconButton onClick={()=> addFavorite(userId)} size="small">
                  <BookmarkBorder />
                </IconButton>
              </Box>
              {selectedPost?.postLikeCount === 0 ? (
                <Typography
                  sx={{ textAlign: "start" }}
                  variant="body2"
                  color="text.secondary"
                >
                  Поставьте первую отметку "Нравится"!
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight="bold">
                  {selectedPost?.postLikeCount +
                    (isLiked !== selectedPost?.postLike
                      ? isLiked
                        ? 1
                        : -1
                      : 0)}{" "}
                  отметок "Нравится"
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                7 июль
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (textComment.trim()) sendComment();
                }}
              >
                <TextField
                  value={textComment}
                  onChange={(e) => setTextComment(e.target.value)}
                  fullWidth
                  placeholder="Добавьте комментарий..."
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton size="small">
                          <EmojiEmotions />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" size="small" color="primary">
                          Опубликовать
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
    
  );
}
