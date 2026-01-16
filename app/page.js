"use client"
import { useEffect, useState } from "react";
import AddMovie from "./component/addMovie";
import DeleteRate from "./component/deletePop";
import Movie from "./component/movie";
import { useMovieStore } from "./store/useMovieStore";
import useShow from "./store/useShowStore";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const { movies, filterMovies, resetFilter } = useMovieStore();
  const {
    isFormOpen,
    isDeleteOpen,
    selectedMovie,
    openFormModal,
    closeFormModal,
    closeDeleteModal,
    openDeleteModal
  } = useShow();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const averageRating =
    movies.length === 0
      ? 0
      : (
          movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
        ).toFixed(1);

  return (
    <div className="font-sans j_bg min-h-screen relative">
      <div className="flex justify-between gap-2 w-full md:items-center p-8 sm:p-10">
        <div className="flex text-xs md:text-sm gap-1">
          <p>Total Movies: {movies.length}</p>
          <p>/</p>
          <p>Average Rating: {averageRating}</p>
        </div>

        <div className="flex gap-1">
          <button className="bg-blue-400 rounded-sm text-xs p-1" onClick={openDeleteModal}>
            Remove Ratings
          </button>
          {!isMobile && (
            <button className="bg-blue-400 rounded-sm text-xs p-1" onClick={openFormModal}>
              Add Movie
            </button>
          )}
        </div>
      </div>

      <div
        className={`flex justify-center gap-2 sticky top-0 z-10 transition-all duration-300
        ${isScrolled ? "bg-white/10 backdrop-blur-md shadow-md p-6" : "p-0"}`}
      >
        <p className="px-2 rounded-sm bg-purple-500 text-white" onClick={resetFilter}>All</p>
        {["Drama", "Crime", "Action", "Comedy"].map((genre) => (
          <p
            key={genre}
            className="px-2 rounded-sm bg-purple-500 text-white"
            onClick={() => filterMovies(genre)}
          >
            {genre}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap p-8 gap-4 sm:p-10">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>

      {(isDeleteOpen || isFormOpen) && (
        <>
          <div
            className="fixed inset-0 bg-white/5 backdrop-blur-md z-20"
            onClick={() => {
              closeDeleteModal();
              closeFormModal();
            }}
          />
          <div className="fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-20">
            {isDeleteOpen && <DeleteRate movie={selectedMovie} />}
            {isFormOpen && <AddMovie movie={selectedMovie} />}
          </div>
        </>
      )}

      {isMobile && (
        <FaPlus
          className="bg-blue-400 fixed bottom-5 right-5 rounded-full p-3 text-4xl cursor-pointer"
          onClick={openFormModal}
        />
      )}
    </div>
  );
}
