import React from "react";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import api from "../axios.js";
import { Link, useParams } from "react-router-dom";
import { useContentTypeStore } from "../store/ContentType.js";
import {ORIGINAL_IMG_BASE_URL} from "../utils/constants.js";
import {SMALL_IMG_BASE_URL} from "../utils/constants.js";

const WatchPage = () => {
  const { id } = useParams();
  const {contentType} = useContentTypeStore();

  const [trailers, setTrailers] = React.useState([]);
  const [movieDetails, setMovieDetails] = React.useState({});
  const [similarMovies, setSimilarMovies] = React.useState([]);

  const GetMovieTrailer = async () => {
   try {
    const response = await api.get(`/api/v1/${contentType}/${id}/trailers`)
    const data = response.data.data.results;
    setTrailers(data);
   } catch (error) {
     console.error("Error fetching movie trailer:", error);
   }

  }

  const getMovieDetails = async () => {
    try {
      const response = await api.get(`/api/v1/${contentType}/${id}`)
      const data = response.data.data;
      console.log(data);
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  const getSimilarMovies = async () => {
    try {
      const response = await api.get(`/api/v1/${contentType}/${id}/similar`)
      const data = response.data.data.results;
      setSimilarMovies(data);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  }
  

  React.useEffect(() => {
    GetMovieTrailer();
    getMovieDetails();
    getSimilarMovies();
  }
  , [id, contentType])


  return (
    <div className="min-h-screen py-20 bg-black text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex-grow flex items-center justify-center relative p-4">
        <div className="relative w-full max-w-5xl">
          {/* Navigation Buttons (not blocking the video) */}
          <button className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full hover:bg-white/20 transition">
            <ChevronLeft size={40} />
          </button>
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full hover:bg-white/20 transition">
            <ChevronRight size={40} />
          </button>

          {/* Video Player */}
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailers[0]?.key}`}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>

      {/*movie details */}
      <div className="flex flex-col md:flex-row items-start justify-between p-4 max-w-5xl mx-auto bg-black/70 rounded-lg shadow-lg mt-20">

        {/*left side */}
        <div className="flex flex-col items-start justify-start p-4 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold">{movieDetails.original_title || movieDetails.name}</h2>
          <p className="text-gray-400 mt-2">{movieDetails.release_date || movieDetails.first_air_date}</p>
          <p className="text-gray-400 mt-2">{movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
          <p className="text-gray-400 mt-2">{movieDetails.tagline}</p>
          <p className="text-gray-400 mt-2">{movieDetails.overview}</p>
        </div>
        {/*right side */}
        <div className="flex flex-col items-start justify-start p-4 max-w-5xl mx-auto">
           <img src={`${ORIGINAL_IMG_BASE_URL}${movieDetails.poster_path}`} alt="Movie Poster" className="rounded-lg max-w-[350px]" />
          </div> 
      </div>

      {/* Similar Movies Section */}
<div className="max-w-6xl mx-auto mt-20 px-4">
  <h2 className="text-2xl font-bold mb-4">Similar Movies / TV Shows</h2>

  <div className="relative group">
    {/* Scroll Buttons - Only visible on hover (optional) */}
    <button
      className="hidden group-hover:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full hover:bg-white/20 transition"
      onClick={() =>
        document
          .getElementById("similar-scroll")
          .scrollBy({ left: -300, behavior: "smooth" })
      }
    >
      <ChevronLeft size={30} />
    </button>
    <button
      className="hidden group-hover:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full hover:bg-white/20 transition"
      onClick={() =>
        document
          .getElementById("similar-scroll")
          .scrollBy({ left: 300, behavior: "smooth" })
      }
    >
      <ChevronRight size={30} />
    </button>

    {/* Scrollable Container */}
    <div
      id="similar-scroll"
      className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-hide"
    >
      {similarMovies.map((movie) => (
        <Link
          to={`/watch/${movie.id}`}
          key={movie.id}
          className=" rounded-lg w-[200px]  flex-shrink-0 p-4 shadow-lg"
        >
          <img
            src={`${SMALL_IMG_BASE_URL}${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="rounded-lg mb-2 cursor-pointer h-[200px] object-cover hover:scale-105 transition-transform duration-200 "  
          />
          <h3 className="text-lg font-semibold">{movie.title || movie.name}</h3>
          <p className="text-gray-400">{movie.release_date ||  movie.first_air_date}</p>
        </Link>
      ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default WatchPage;
