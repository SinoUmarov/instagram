"use client"

import { useEffect, useState, useRef } from "react"
import { useReelsPage } from "@/store/pages/reels/reels"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import SendIcon from "@mui/icons-material/Send"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Avatar, Box, IconButton, Typography, Button } from "@mui/material"
import { API } from "@/utils/config"

export default function ReelsComp() {
  const { data, getReels } = useReelsPage()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videoStates, setVideoStates] = useState({})
  const videoRefs = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    getReels()
  }, [getReels])

  // Инициализация состояний видео
  useEffect(() => {
    if (data?.length) {
      const initialStates = {}
      data.forEach((_, index) => {
        initialStates[index] = {
          muted: true,
          playing: index === 0, // Первое видео играет
        }
      })
      setVideoStates(initialStates)
    }
  }, [data])

  // Отслеживание скролла для управления видео
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerHeight = container.clientHeight
      const scrollTop = container.scrollTop
      const newIndex = Math.round(scrollTop / containerHeight)

      if (newIndex !== currentVideoIndex && newIndex < data?.length) {
        // Пауза для всех видео
        videoRefs.current.forEach((video, index) => {
          if (video) {
            if (index === newIndex) {
              video.play()
            } else {
              video.pause()
            }
          }
        })

        setCurrentVideoIndex(newIndex)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [currentVideoIndex, data?.length])

  const toggleMute = (index) => {
    setVideoStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        muted: !prev[index]?.muted,
      },
    }))

    // Применяем изменение к видео
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !video.muted
    }
  }

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)} млн`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)} тыс.`
    }
    return count.toString()
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        maxWidth: 430,
        mx: "auto",
        backgroundColor: "#000",
        height: "100vh",
        overflow: "hidden",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      {data?.map((el, index) => (
        <Box
          key={el.postId}
          sx={{
            position: "relative",
            width: "100%",
            height: "100vh",
            backgroundColor: "#000",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          {/* Полноэкранное видео */}
          <video
            ref={(ref) => (videoRefs.current[index] = ref)}
            src={`${API}/images/${el.images}`}
            autoPlay={index === 0}
            loop
            muted={videoStates[index]?.muted !== false}
            playsInline
            onLoadedData={() => {
              // Автоматически играть только первое видео
              if (index === 0) {
                videoRefs.current[index]?.play()
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Кнопка звука в правом верхнем углу */}
          <IconButton
            onClick={() => toggleMute(index)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.4)",
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            }}
          >
            {videoStates[index]?.muted !== false ? (
              <VolumeOffIcon sx={{ fontSize: 20 }} />
            ) : (
              <VolumeUpIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>

          {/* Информация о посте внизу слева */}
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 16,
              right: 70,
              color: "#fff",
            }}
          >
            {/* Информация о пользователе */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <Avatar
                src={el.userImage ? `${API}/images/${el.userImage}` : "/default-avatar.png"}
                sx={{
                  width: 32,
                  height: 32,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                }}
              >
                berkindev
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  mx: 0.5,
                }}
              >
                •
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.3)",
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  minWidth: "auto",
                  px: 1.5,
                  py: 0.3,
                  height: "24px",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "#fff",
                  },
                }}
              >
                Подписаться
              </Button>
            </Box>

            {/* Заголовок */}
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                mb: 1,
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: 1.3,
              }}
            >
              {el.title || "Computer Engineers:"}
            </Typography>

            {/* Описание */}
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                opacity: 1,
                lineHeight: 1.3,
                fontSize: "14px",
                mb: 1.5,
              }}
            >
              {el.content || "Sorry Guys... Send it your industrial engineer fric... ещё"}
            </Typography>

            {/* Музыка/аудио информация */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#fff",
                  fontSize: "13px",
                  opacity: 0.8,
                }}
              >
                🎵 berkindev • Оригинальное аудио
              </Typography>
            </Box>
          </Box>

          {/* Кнопки действий справа */}
          <Box
            sx={{
              position: "absolute",
              right: 12,
              bottom: 80,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            {/* Лайк */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
              <IconButton
                sx={{
                  color: "#fff",
                  p: 0.5,
                }}
              >
                {el.postLike ? (
                  <FavoriteIcon sx={{ fontSize: 26, color: "#ff3040" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 26 }} />
                )}
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {formatCount(el.postLikeCount || 63400)}
              </Typography>
            </Box>

            {/* Комментарии */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
              <IconButton
                sx={{
                  color: "#fff",
                  p: 0.5,
                }}
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: 26 }} />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {formatCount(el.commentCount)}
              </Typography>
            </Box>

            {/* Поделиться */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <IconButton
                sx={{
                  color: "#fff",
                  p: 0.5,
                }}
              >
                <SendIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Box>

            {/* Сохранить */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <IconButton
                sx={{
                  color: "#fff",
                  p: 0.5,
                }}
              >
                <BookmarkBorderIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Box>

            {/* Меню */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <IconButton
                sx={{
                  color: "#fff",
                  p: 0.5,
                }}
              >
                <MoreHorizIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Box>

            {/* Маленький аватар пользователя внизу */}
            <Box
              sx={{
                mt: 1,
                position: "relative",
              }}
            >
              <Avatar
                src={el.userImage ? `${API}/images/${el.userImage}` : "/default-avatar.png"}
                sx={{
                  width: 28,
                  height: 28,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
