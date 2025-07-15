'use client'

import React, { useEffect } from 'react'
import { API } from '@/lib/api'
import { useReelsPage } from '@/store/pages/reels/reels'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'

export default function Reals() {
  const { data, getReels } = useReelsPage()

  useEffect(() => {
    getReels()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        p: 2,
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      {data.map((el) => (
        <Card
          key={el.postId}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={
                  el.userImage
                    ? `${API}/uploads/${el.userImage}`
                    : '/default-avatar.png'
                }
              />
            }
            title={
              <Typography variant="subtitle1" fontWeight={600}>
                {el.userName}
              </Typography>
            }
            subheader={
              new Date(el.datePublished).toLocaleDateString('ru-RU')
            }
          />

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box
              component="video"
              src={`${API}/images/${el.images}`}
              controls
              sx={{
                width: '100%',
                borderRadius: 2,
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              {el.title || 'Без названия'}
            </Typography>

            {el.content && (
              <Typography variant="body2" color="text.secondary">
                {el.content}
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 1,
              }}
            >
              <IconButton>
                {el.postLike ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography variant="body2">
                {el.postLikeCount} лайков
              </Typography>

              <IconButton>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Typography variant="body2">
                {el.commentCount} комментариев
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
