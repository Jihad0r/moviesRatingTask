"use client"
import toast from "react-hot-toast";
import { useMovieStore } from "../store/useMovieStore";
import useShow  from "../store/useShowStore";
export default function DeleteRate({movie}) {
    const { closeDeleteModal }  = useShow()
    const {deleteMovie,deleteAllMovies} = useMovieStore()
    function handleClick(id){
      if(id){
      closeDeleteModal()
      deleteMovie(id)
      toast.success("Movie deleted successfully");
      }else{
      closeDeleteModal()
      deleteAllMovies()
      toast.success("Movies deleted successfully");
      }
    }
  return (
    <div className="delete p-4 w-1/3 h-50 m-auto rounded-lg j_bg">
        <p className="h-35">
  Are you sure you want to delete your rating for{" "}
  <span className="font-bold">{movie?.name || "all movies"}</span>?
</p><div className="flex justify-end gap-2">
            <button className="bg-gray-500 rounded-sm text-xs px-2 py-1 cursor-pointer" onClick={closeDeleteModal}>Cancel</button>
            {movie?.name?<button className="bg-blue-400 rounded-sm text-sm px-2 py-1 cursor-pointer" onClick={()=>handleClick(movie.id)}>Delete</button>
        :<button className="bg-blue-400 rounded-sm text-sm px-2 py-1 cursor-pointer" onClick={()=>handleClick()}>Delete All</button>
        }
         </div>
    </div>
  );
}
