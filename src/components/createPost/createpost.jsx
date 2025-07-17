'use client';
import React, { useEffect, useRef } from 'react';
import {
  Modal, Box, Typography, Button, IconButton,
  TextField, CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import usePostStore from '../../store/pages/createpost/createpost';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

export default function CreatePostModal({ open, onClose }) {
  const {
    image, caption, setImage, setCaption,
    uploadPost, loading, error, success, reset
  } = usePostStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (success) {
      reset();
      onClose();
    }
  }, [success]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">add create</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCamera />}
          fullWidth
          sx={{ mt: 2 }}
        >
         update photo
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <Box mt={2}>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>
        )}

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="add title..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={uploadPost}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={20} /> : 'posts'}
        </Button>

        {error && (
          <Typography color="error" mt={2}>{error}</Typography>
        )}
      </Box>
    </Modal>
  );
}
