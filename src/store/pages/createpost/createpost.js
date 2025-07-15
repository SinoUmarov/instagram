// store/usePostStore.js
import { create } from 'zustand';

const usePostStore = create((set, get) => ({
  image: null,
  caption: '',
  loading: false,
  error: null,
  success: false,

  setImage: (file) => set({ image: file }),
  setCaption: (text) => set({ caption: text }),
  reset: () =>
    set({ image: null, caption: '', loading: false, error: null, success: false }),

  uploadPost: async () => {
    const { image, caption, reset } = get();

    if (!image || !caption) {
      set({ error: 'Фото и описание обязательны.' });
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      set({ loading: true, error: null, success: false });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка при публикации');

      set({ success: true });
      reset(); // сбрасываем только поля image/caption
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
