'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Divider,
  Typography,
  Slider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage'; 
import usePostStore from '../../store/pages/createpost/createpost';

export default function CreatePostModal({ open, onClose }) {
  const {
    image,
    caption,
    location,
    setImage,
    setCaption,
    setLocation,
    uploadPost,
    loading,
    error,
    success,
    reset,
  } = usePostStore();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [filter, setFilter] = useState('none');
  const [loadingLocal, setLoading] = useState(false);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCroppedImage(null);
      setFilter('none');
    }
  };

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImg(URL.createObjectURL(image), croppedAreaPixels);
    setCroppedImage(croppedBlob);
    setImage(new File([croppedBlob], image.name, { type: image.type }));
  };

  const applyFilterToImage = async (blob, filterString) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.filter = filterString;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((filteredBlob) => {
          if (!filteredBlob) reject(new Error('Ошибка при применении фильтра'));
          else resolve(filteredBlob);
        }, 'image/jpeg');
      };
      img.onerror = (e) => reject(e);
      img.src = URL.createObjectURL(blob);
    });
  };

  const handleUpload = async () => {
    if (!croppedImage) return;
    try {
      setLoading(true);
      const filteredBlob = await applyFilterToImage(croppedImage, filter);
      const filteredFile = new File([filteredBlob], image.name, { type: image.type });
      setImage(filteredFile);
      await uploadPost();
    } catch (e) {
      console.error('Ошибка при применении фильтра', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      reset();
      onClose();
    }
  }, [success, reset, onClose]);

  const filters = [
    { name: 'No Filter', value: 'none' },
    { name: 'B&W', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(60%)' },
    { name: 'Bright', value: 'brightness(150%)' },
    { name: 'Contrast', value: 'contrast(200%)' },
    { name: 'Blur', value: 'blur(2px)' },
    { name: 'Hue', value: 'hue-rotate(90deg)' },
  ];

  return (
    <Dialog open={open} onClose={() => { reset(); onClose(); }} fullWidth maxWidth="sm">
      <DialogTitle>
        add post
        <IconButton
          aria-label="close"
          onClick={() => {
            reset();
            onClose();
          }}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {!image && (
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            update image
            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
          </Button>
        )}

        {image && !croppedImage && (
          <>
            <div style={{ position: 'relative', width: '100%', height: 400 }}>
              <Cropper
                image={URL.createObjectURL(image)}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <Typography>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, z) => setZoom(z)}
              sx={{ mb: 2 }}
            />
            <Button onClick={handleCrop} variant="contained" fullWidth>
              cut image
            </Button>
          </>
        )}

        {croppedImage && (
          <>
            <img
              src={URL.createObjectURL(croppedImage)}
              alt="Preview"
              style={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 16,
                filter: filter,
              }}
            />

            <Typography>Filters</Typography>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: 16 }}>
              {filters.map((f) => (
                <div key={f.value} style={{ textAlign: 'center' }}>
                  <img
                    src={URL.createObjectURL(croppedImage)}
                    alt={f.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 8,
                      filter: f.value,
                      cursor: 'pointer',
                      border: filter === f.value ? '2px solid #1976d2' : '1px solid #ccc',
                    }}
                    onClick={() => setFilter(f.value)}
                  />
                  <Typography variant="caption">{f.name}</Typography>
                </div>
              ))}
            </div>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setFilter('none');
                setCroppedImage(null);
                setImage(null);
              }}
              sx={{ mb: 2 }}
            >
              Reset
            </Button>

            <TextField
              label="title"
              fullWidth
              multiline
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
        >
          close
        </Button>
        <Button
          onClick={handleUpload}
          disabled={loading || loadingLocal || !croppedImage}
          variant="contained"
        >
          {loading || loadingLocal ? <CircularProgress size={24} /> : 'post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
