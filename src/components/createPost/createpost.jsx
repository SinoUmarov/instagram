'use client';
import React, { useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import useCreatePostStore from '../../store/pages/createpost/createpost';

export default function CreatePostModal({ open, onClose }) {
  const {
    image,
    caption,
    setImage,
    setCaption,
    uploadPost,
    loading,
    error,
    success,
    reset,
  } = useCreatePostStore();

  const inputRef = useRef(null);

  const handleUpload = async () => {
    await uploadPost();
  };

  useEffect(() => {
    if (success) {
      reset();
      onClose();
    }
  }, [success]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Create New Post
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 10, top: 10 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="flex flex-col items-center gap-4">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="preview" className="max-h-64 object-contain rounded" />
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
            className="w-full"
          >
            Upload Image
            <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </Button>
        )}

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleUpload} disabled={loading || !image} variant="contained">
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
