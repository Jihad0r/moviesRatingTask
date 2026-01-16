"use client"
import { useEffect, useState } from "react";
import AddMovie from "./component/addMovie";
import DeleteRate from "./component/deletePop";
import Movie from "./component/movie";
import { useMovieStore } from "./store/useMovieStore";
import useShow from "./store/useShowStore";
export default function Home() {
  const {movies,filterMovies,resetFilter} = useMovieStore()
  const { isFormOpen,isDeleteOpen, selectedMovie,openFormModal,closeFormModal,openDeleteModal, closeDeleteModal }  = useShow()
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 170);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const averageRating =
  movies.length === 0 ? 0 :(movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1);
  return (
    <div className="font-sans j_bg min-h-screen">
      <div className="flex justify-start md:justify-between  md:flex-row flex-col gap-2 w-full md:items-center p-8 sm:p-10">
        <div  className="flex justify-start md:justify-between gap-2 text-xs md:text-sm"><p>Total Movies: {movies.length}</p><p>/</p><p>Average Rating: {averageRating}</p></div>
        <div className="flex justify-start md:justify-between gap-2">
          <button className="bg-blue-400 rounded-sm text-xs px-2 py-1 cursor-pointer" onClick={openDeleteModal}>Remove Ratings</button>
          <button className="bg-blue-400 rounded-sm text-xs px-2 py-1 cursor-pointer" onClick={openFormModal}>Add Movie</button>
        </div>
       
      </div> <div
  className={`flex justify-center w-full gap-2 sticky top-0 z-50 p-6 transition-all duration-300
    ${isScrolled ? "bg-white/10 backdrop-blur-md shadow-md" : "bg-transparent"}
  `}>
           <p className="bg-purple-500 text-white text-xs md:text-sm rounded-lg px-4 cursor-pointer" onClick={()=>resetFilter()}>All</p>
          {["Drama", "Crime", "Action", "Comedy"].map((genre) => (
            <p className="bg-purple-500 text-white text-xs md:text-sm rounded-lg px-4 cursor-pointer" onClick={()=>filterMovies(genre)}>{genre}</p>
          ))}
      </div>
      <div className="flex w-full flex-wrap p-8 gap-4 sm:p-10">
        {movies.map((movie,index)=>(
        <Movie key={index} movie={movie}/>
      ))}</div>
      {(isDeleteOpen || isFormOpen) && (
          <>
            <div className="fixed top-0 overflow- bg-white/5 backdrop-blur-md  bottom-0 right-0 h-full w-full" onClick={()=> {closeDeleteModal(),closeFormModal()}} />
            <div className="fixed top-1/2 right-1/2 w-full translate-x-1/2 -translate-y-1/2">
              {isDeleteOpen &&<DeleteRate movie={selectedMovie} />}
              {isFormOpen &&<AddMovie movie={selectedMovie} />}
            </div>
          </>
        )}
    </div>
  );
}
