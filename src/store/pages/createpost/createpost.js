import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://37.27.29.18:8003/Post/add-post'; 

const useCreatePostStore = create((set, get) => ({
  image: null,
  caption: '',
  loading: false,
  error: null,
  success: false,

  setImage: (file) => set({ image: file }),
  setCaption: (text) => set({ caption: text }),

  reset: () => set({ image: null, caption: '', loading: false, error: null, success: false }),

  uploadPost: async () => {
    const { image, caption } = get();
    if (!image) return set({ error: 'Image is required' });

    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);

      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      set({ success: true });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useCreatePostStore;
