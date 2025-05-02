import { fetchFromTMDB } from "../services/TMDB.service.js";
import {User} from "../models/user.model.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&query=${query}`);

    if (data?.results && data.results.length > 0) {
      const person = data.results[0]; // نحصل على الشخص الأول فقط
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: person.id,
            image: person.profile_path,
            title: person.name,
            searchType: "Person",
            createdAt: new Date(),
          },
        },
      });

      return res.status(200).json({ success: true, data });
    } else {
      // إذا لم تكن هناك نتائج
      return res.status(404).json({ message: "No person found", data: {} });
    }
  } catch (error) {
    console.error("Error in searchPerson controller:", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found", data: {} });
    }
    res.status(500).json({ message: "Error fetching person data" });
  }
};


export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`);
    
    // تحقق من وجود نتائج
    if (data?.results && data.results.length > 0) {
      const movie = data.results[0]; // نحصل على الفيلم الأول فقط
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: movie.id,
            image: movie.poster_path, // استخدام poster_path بدلاً من profile_path
            title: movie.title,
            searchType: "Movie",
            createdAt: new Date(),
          },
        },
      });

      return res.status(200).json({ success: true, data });
    } else {
      // إذا لم تكن هناك نتائج
      return res.status(404).json({ message: "No movie found", data: {} });
    }
  } catch (error) {
    console.error("Error in searchMovie controller:", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ message: "Not Found", data: {} });
    }
    res.status(500).json({ message: "Error fetching movie data" });
  }
};


  export const searchTvShow = async (req, res) => {
    const { query } = req.params;
    try {
      const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1&query=${query}`);
      
      if (!data.results || data.results.length === 0) {
        return res.status(404).json({ message: "No TV show found", data: {} });
      }
  
      const show = data.results[0];
  
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: show.id,
            image: show.profile_path || show.poster_path || null,
            title: show.name,
            searchType: "Tv",
            createdAt: new Date(),
          },
        },
      });
  
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.error("Error in searchTvShow controller:", error.message);
      res.status(500).json({ message: "Error fetching TV show data" });
    }
  };
  
 export async function searchHistory(req, res) {
	try {
		res.status(200).json({ success: true, data: req.user.searchHistory });
	} catch (error) {
        console.error("Error fetching search history:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export const deleteSearchHistory = async (req, res) => {
    let { id } = req.params;
	id = parseInt(id);

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in deleteSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


  