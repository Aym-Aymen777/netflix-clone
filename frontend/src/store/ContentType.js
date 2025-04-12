import {create} from 'zustand';

export const useContentTypeStore = create((set) => ({
  contentType: 'movies',
  setContentType: (type) => set({ contentType: type }),
}));