import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentTypeStore } from "../store/ContentType.js";
import axios from "axios";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentTypeStore();

    const [showArrows, setShowArrows] = useState(false);
    const [content, setContent] = useState([]);
    const sliderRef = useRef(null);

    const formattedCategoryName =
        category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    //const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };

    useEffect(() => {
        const getMoviesByCategory = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${category}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setContent(response.data.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        getMoviesByCategory();
    }, [contentType, category]);

    return (
        <div
            className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className="mb-4 text-2xl font-bold">
                {formattedCategoryName} 
            </h2>

            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
                {content?.map((item) => (
                    <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt="Movie"
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>
                        <p className="mt-2 text-center">{item.title || item.name}</p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;
