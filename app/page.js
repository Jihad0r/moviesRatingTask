"use client"
import AddMovie from "./component/addMovie";
import DeleteRate from "./component/deletePop";
import Movie from "./component/movie";
import { useMovieStore } from "./store/useMovieStore";
import useShow from "./store/useShowStore";
export default function Home() {
  const {movies,filterMovies,resetFilter} = useMovieStore()
  const { isFormOpen,isDeleteOpen, selectedMovie,openFormModal,closeFormModal,openDeleteModal, closeDeleteModal }  = useShow()

  return (
    <div className="font-sans j_bg min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex justify-between w-full items-center mb-20">
        <div  className="flex justify-between gap-6"><p>Total Movies: {movies.length}</p><p>/</p><p>Average Rating: 3.7</p></div>
        <div className="flex justify-between gap-6">
          <button className="bg-blue-400 rounded-sm text-xs px-2 py-1 cursor-pointer" onClick={openDeleteModal}>Remove Ratings</button>
          <button className="bg-blue-400 rounded-sm text-xs px-2 py-1 cursor-pointer" onClick={openFormModal}>Add Movie</button>
        </div>
       
      </div> <div className="flex justify-center gap-6 mb-10">
           <p className="bg-purple-500 text-white text-sm rounded-lg px-2 cursor-pointer" onClick={()=>resetFilter()}>All</p>
          {["Drama", "Crime", "Action", "Comedy"].map((genre) => (
            <p className="bg-purple-500 text-white text-sm rounded-lg px-2 cursor-pointer" onClick={()=>filterMovies(genre)}>{genre}</p>
          ))}
      </div>
      <div className="flex w-full flex-wrap gap-4">
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
