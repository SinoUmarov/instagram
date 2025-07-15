'use client';
import React, { useRef, useEffect } from 'react';
import usePostStore from '@/store/usePostStore';

export default function CreatePost() {
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
  } = usePostStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (success) {
      alert('Пост опубликован!');
      inputRef.current.value = null;
    }
  }, [success]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    await uploadPost();
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">📸 Создать пост</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="rounded w-full max-h-80 object-cover"
          />
        </div>
      )}

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Добавьте описание..."
        className="w-full border rounded p-2 mb-4"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
      >
        {loading ? 'Публикация...' : 'Опубликовать'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
