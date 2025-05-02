import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";

const ALLOWED_TYPES = ["movie", "tv", "person"];

const SearchPage = () => {
  const { content, keyword } = useParams();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(keyword || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAPI = async (searchInput, type) => {
    if (!ALLOWED_TYPES.includes(type)) return setError("Invalid search type.");

    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await axios.get(
        `/api/v1/search/${type}/${encodeURIComponent(searchInput)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      setSearchResults(data.results || []);
    } catch (err) {
      setError("Failed to fetch results.");
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && content) {
      searchAPI(query, content);
    }
  }, [query, content]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${content}/${query}`);
  };

  return (
    <div
      className={`search-page bg-black text-white ${
        searchResults.length > 0 ? "h-full" : "h-screen"
      } overflow-hidden`}
    >
      <Navbar />

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="search-bar flex justify-center items-center mt-4 h-[20vh]"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search input"
          className="p-2 rounded-md w-1/2 bg-gray-900"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-red-600 rounded-md hover:bg-red-500"
          aria-label="Search"
        >
          <Search />
        </button>
      </form>

      {/* Navigation Links */}
      <div className="flex justify-center">
        {ALLOWED_TYPES.map((type) => (
          <Link
            key={type}
            to={`/search/${type}`}
            className={`ml-4 p-1 ${
              content === type ? "bg-red-600" : "bg-gray-900"
            } rounded-md hover:bg-red-600`}
          >
            <span className="text-white capitalize">{type}</span>
          </Link>
        ))}
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="mt-10 text-gray-400 text-center">Loading results...</p>
      )}
      {error && (
        <p className="mt-10 text-red-500 text-center">{error}</p>
      )}

      {/* Search Results */}
      <div className="search-results pb-20 flex flex-col items-center mt-10 md:flex-row md:flex-wrap md:justify-center">
        {!loading && searchResults.length > 0 ? (
          searchResults.map((item) => {
            if (content === "person" && item.profile_path) {
              return (
                <div
                  key={item.id}
                  className="result-card bg-gray-900 rounded-md p-4 m-2 w-[250px] h-[350px] flex flex-col items-center justify-center"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + item.profile_path}
                    alt={item.name}
                    className="rounded-md mb-2 h-[250px]"
                  />
                  <h3 className="text-lg font-bold text-center">
                    {item.name.length > 40
                      ? item.name.substring(0, 40) + "..."
                      : item.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {item.known_for_department}
                  </p>
                </div>
              );
            }

            if ((content === "movie" || content === "tv") && item.poster_path) {
              return (
                <Link
                  to={`/watch/${item.id}`}
                  key={item.id}
                  className="result-card bg-gray-900 rounded-md p-4 m-2 w-[250px] h-[350px] flex flex-col items-center justify-center"
                >
                  <img
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt={item.title || item.name || "Poster"}
                    className="rounded-md mb-2 h-[250px]"
                  />
                  <h3 className="text-lg font-bold text-center">
                    {(item.title || item.name).length > 40
                      ? (item.title || item.name).substring(0, 40) + "..."
                      : item.title || item.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {item.release_date || item.first_air_date}
                  </p>
                </Link>
              );
            }

            return null;
          })
        ) : (
          !loading && !error && (
            <p className="mt-10 text-gray-500 text-center">No results found 🥲</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
