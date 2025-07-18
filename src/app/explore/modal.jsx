"use client";
import * as React from 'react';

import {
  Box,
  Modal,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Divider
} from '@mui/material';

import {
  MoreHoriz,
  FavoriteBorder,
  ChatBubbleOutline,
  Send,
  BookmarkBorder,
  EmojiEmotions
} from '@mui/icons-material';

import { API } from '@/utils/config';
import { useExplorePage } from '@/store/pages/explore/explore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 1200,
  height: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  display: 'flex',
  overflow: 'hidden'
};

export default function InstagramModal({ open, setOpen, selectedPost }) {
  const handleClose = () => setOpen(false);
  const { AddComment} = useExplorePage();
  const [ textComment, setTextComment] = React.useState("")
  console.log(textComment)

  function sendComment(){

    const text = {
      comment: textComment,
      postId: selectedPost.postId
    }
    AddComment(text)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="post-modal"
    >
      <Box sx={style}>
        <Box sx={{ 
          flex: 1, 
          backgroundColor: '#000', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          {selectedPost && selectedPost.images && selectedPost.images.length > 0 &&
            selectedPost.images.map((fileName) => {

              const isVideo = fileName.endsWith('.mp4') || fileName.endsWith('.webm');
              const src = `${API || ''}/images/${fileName}`;

              return isVideo ? (
                <video 
                 
                  key={selectedPost.postId} 
                  src={src} 
                  controls 
                  autoPlay
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    background: '#000',
                    borderRadius: 0
                  }} 
                />  
              ) : (
                <img 
                  onClick={() => console.log('Clicked postId:', selectedPost.postId)}
                  key={selectedPost.postId} 
                  src={src || "/placeholder.svg"} 
                  alt="Post content" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    background: '#000',
                    borderRadius: 0
                  }} 
                />
              );
            })
          }
        </Box>

        <Box sx={{ 
          width: 400, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'white'
        }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid #efefef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button size="small" variant="text" color="primary">
                Подписаться
              </Button>
              <IconButton size="small">
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            p: 2
          }}>
            {Array.isArray(selectedPost?.comments) && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((el) => (
                <Box key={el.userId} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Avatar 
                      src={API  + '/images/' + selectedPost.userImage} 
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {el.userName}
                        </Typography>
                        <Typography variant="body2">
                          {el.comment}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          {/* {el.time} */}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
                          Ответить
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }}>
                          Показать перевод
                        </Typography>
                      </Box>
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          sx={{ cursor: 'pointer', mt: 1, display: 'block' }}
                        >
                          ——— Посмотреть ответы
                        </Typography>
                    </Box>
                    <IconButton size="small">
                      <FavoriteBorder fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary" align="center">
                  Комментариев пока нет.<br />
                  Начните переписку.
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ borderTop: '1px solid #efefef' }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small">
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton size="small">
                    <ChatBubbleOutline />
                  </IconButton>
                  <IconButton size="small">
                    <Send />
                  </IconButton>
                </Box>
                <IconButton size="small">
                  <BookmarkBorder />
                </IconButton>
              </Box>
              {selectedPost?.postLikeCount == 0 ? (
                <Typography sx={{textAlign: "start"}} variant="body2" color="text.secondary" align="center">
                  Поставьте первую отметку "Нравится"!
                </Typography>
              ) : (
                <Typography variant="body2" fontWeight="bold">
                  {selectedPost?.postLikeCount} отметок "Нравится"
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                7 июль
              </Typography>
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
              <TextField
               value={textComment}
               onChange={(e)=> setTextComment(e.target.value)}
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
                      <Button onClick={sendComment} size="small" color="primary">
                        Опубликовать
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}