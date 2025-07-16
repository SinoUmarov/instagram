'use client';
import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://37.27.29.18:8003/post/add-post';

const usePostStore = create((set, get) => ({
  image: null,
  caption: '',
  loading: false,
  error: '',
  success: false,

  setImage: (file) => set({ image: file }),
  setCaption: (text) => set({ caption: text }),

  reset: () =>
    set({
      image: null,
      caption: '',
      loading: false,
      error: '',
      success: false,
    }),

  uploadPost: async () => {
    const { image, caption } = get();

    if (!image) {
      set({ error: 'Please,update photo.' });
      return;
    }

    set({ loading: true, error: '', success: false });

    try {
      const formData = new FormData();
      formData.append('name', caption || 'Без подписи');
      formData.append('avatar', image); 

      await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      set({ success: true });
    } catch (err) {
      console.error(err);
      set({ error: 'error is loading......' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
