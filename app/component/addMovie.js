"use client";
import { useState } from "react";
import { useMovieStore } from "../store/useMovieStore";
import useShow from "../store/useShowStore";
import toast from "react-hot-toast";

export default function AddMovie({movie}) {
  const [formData, setFormData] = useState({
    name: movie?.name || "",
    description: movie?.description || "",
    image: movie?.image || "",
    genres: movie?.genres?  [...movie?.genres] : [],
    intheaters: movie?.intheaters || false,
  });
  const {movies,addMovie,editMovie} = useMovieStore()
  
  const {closeFormModal}  = useShow()

  const isUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

  
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
  e.preventDefault();

  if (!formData.name.trim()) {
    toast.error("Movie name is required");
    return;
  }

  if (!formData.image.trim()) {
    toast.error("Image URL is required");
    return;
  }

  if (!isUrl(formData.image)) {
    toast.error("Please enter a valid image URL");
    return;
  }

  if (formData.genres.length === 0) {
    toast.error("Please select at least one genre");
    return;
  }

  const isExist = movies.some(
    (movie) =>
      movie.name.toLowerCase() === formData.name.toLowerCase() &&
      movie.id !== movie?.id
  );

  if (isExist) {
    toast.error("Movie already exists");
    return;
  }
  if (movie?.id) {
    editMovie(movie.id, formData);
    toast.success("Movie updated successfully");
  } else {
    addMovie(formData);
    toast.success("Movie added successfully");
  }

  closeFormModal();
}


  return (
    <form onSubmit={handleSubmit} className="j_bg p-4 w-[80%] md:w-1/2 m-auto rounded-lg space-y-3">

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-sm outline-0 p-1 focus:border-0 focus:outline-blue-700 focus:outline-2" 
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-sm outline-0 p-1 focus:border-0 focus:outline-blue-700 focus:outline-2" 
        />
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input
          type="url"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded-sm outline-0 p-1 focus:border-0 focus:outline-blue-700 focus:outline-2" 
        />
      </div>

      <div>
        <label className="block mb-1">Genres</label>
        <div className="w-full border rounded-sm p-2 space-y-2">
          {["Drama", "Crime", "Action", "Comedy"].map((genre) => (
            <label key={genre} className="block cursor-pointer">
              <input
                type="checkbox"
                value={genre}
                className="hidden peer"
                checked={formData.genres.includes(genre)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    genres: e.target.checked
                      ? [...prev.genres, value]
                      : prev.genres.filter((g) => g !== value),
                  }));
                }}
              />
              <p className="w-full rounded pl-1 peer-checked:bg-gray-300">
                {genre}
              </p>
            </label>
          ))}
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          id="intheaters"
          name="intheaters"
          checked={formData.intheaters}
          onChange={handleChange}
        />
        <label htmlFor="intheaters" className="ml-2">
          In theaters
        </label>
      </div>

      <div className="flex justify-between">
        <button type="reset" className="bg-gray-500 px-3 py-1 rounded-sm  cursor-pointer" onClick={closeFormModal}>
          Cancel
        </button><button type="submit" className="bg-blue-400 px-3 py-1 rounded-sm">
  {movie?.id ? "Update" : "Create"}
</button>
        
      </div>
    </form>
  );
}
