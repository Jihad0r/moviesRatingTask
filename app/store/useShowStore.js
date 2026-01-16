import {create} from "zustand";

export  const useShow = create((set) => ({
  isDeleteOpen: false,
  isFormOpen: false,
  selectedMovie: null,
  openDeleteModal: (movie) => set({ isDeleteOpen: true, selectedMovie: movie }),
  closeDeleteModal: () => set({ isDeleteOpen: false, selectedMovie: null }),
  openFormModal: (movie) => set({ isFormOpen: true, selectedMovie: movie }),
  closeFormModal: () => set({ isFormOpen: false, selectedMovie: null }),
}));
export default useShow;