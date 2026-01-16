"use client"
import { FaStar } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { useState } from "react";
import useShow  from "../store/useShowStore";
import { useMovieStore } from "../store/useMovieStore";

export default function Movie({movie}) {
  const [show,setShow] = useState(false)
  let [rate,setRate] = useState(movie.rating|| 0)
  const {openFormModal,openDeleteModal }  = useShow()
  const {editMovie} = useMovieStore()
  const total = 5
  
  return (
    <div className="w-[calc(33%-8px)] bg-gray-50 relative rounded-lg" onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)}>
      <div className="absolute top-0 right-0"> <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-black text-lg mt-[2px]">{rate}</p><FaStar className="text-amber-500 text-6xl" /></div>
      <img className="rounded-t-lg" src={movie.image} alt={movie.name} />
      <div className="text-black p-4">
        <h1 className="text-3xl">{movie.name}</h1>
      <div className="flex gap-2">
        {movie.genres.map((genre,index)=>(
          <p className="bg-purple-500 text-white text-xs rounded-full px-2" key={index}>{genre}</p>
        ))}
      </div>
      <p className="min-h-25 text-sm py-2">{movie.description}</p>
      <div className="text-sm flex items-center justify-between min-h-10">
        <div className="flex gap-2 items-center"><p>Rating: ({rate}/5)</p>
        {[...Array(total)].map((_,index)=>(
            <FaStar key={index} onClick={()=>{setRate(index+1),editMovie(movie.id,{rating:index+1})}} className={`${index<rate?"text-amber-400":"text-gray-400"} text-lg cursor-pointer`}/>
          ))}
        </div>
        {show&&<div className="flex gap-2">
          <IoPencil className="bg-gray-200 rounded-full text-4xl p-2 cursor-pointer" onClick={() => openFormModal(movie)}/>
          <HiMiniTrash className="bg-gray-200 rounded-full text-4xl p-2 cursor-pointer" onClick={() => openDeleteModal(movie)}  />
          </div>}
        </div>
      </div>
    </div>
  );
}
