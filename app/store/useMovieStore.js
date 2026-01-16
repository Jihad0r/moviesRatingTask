import { create } from "zustand";
import { data } from "../data/db";

const getMovies = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("movie-storage");

  if (!stored) {
  localStorage.setItem("movie-storage", JSON.stringify(data));
  return data
  }

  return JSON.parse(stored);
};


export const useMovieStore = create((set, get) => ({
  allMovies: getMovies(),
  movies: getMovies(),

  syncToLocalStorage: (movies) => {
    localStorage.setItem("movie-storage", JSON.stringify(movies));
  },

  generateId: () => {
    const movies = get().movies;
    return movies.length
      ? Math.max(...movies.map((m) => m.id)) + 1
      : 1;
  },

  addMovie: (movie) => {
    const newMovie = {
      id: get().generateId(),
      rating: 0,
      ...movie,
    };
    const updated = [...get().movies, newMovie];
    set({ movies: updated });
    get().syncToLocalStorage(updated);
  },
  editMovie: (id, updatedData) => {
    const updated = get().movies.map((movie) =>
      movie.id === id
        ? { ...movie, ...updatedData, id }
        : movie
    );

    set({ movies: updated });
    get().syncToLocalStorage(updated);
  },

  deleteMovie: (id) => {
    const updated = get().movies.filter((m) => m.id !== id);
    set({ movies: updated });
    get().syncToLocalStorage(updated);
  },

  deleteAllMovies: () => {
    const updated = get().movies.filter((m) => m.id === "test12");
    set({ movies: updated });
    get().syncToLocalStorage(updated);
  },

  filterMovies: (genre) => {
    const updated = get().allMovies.filter((m) =>
      m.genres.includes(genre)
    );
    set({ movies: updated });
  },

  resetFilter: () => {
    set({ movies: get().allMovies });
  },
}));
