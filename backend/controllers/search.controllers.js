import { fetchFromTMDB } from "../services/TMDB.service.js";
import {User} from "../models/user.model.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data= await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1&query=${query}`)
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: data.results[0].id,
                image: data.results[0].profile_path,
                title: data.results[0].name,
                searchType: "Person",
                createdAt: new Date(),
            },
        },
    });
    res.status(200).json({success:true,data:data});
  } catch (error) {
    console.error("Error in searchPerson conroller:", error.message);
    if(error.message.includes("404")) {
        return res.status(404).json({ message: "Not Found" ,data:{}});
      }
    res.status(500).json({ message: "Error fetching person data" });
  }
}

export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
      const data= await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`)
      await User.findByIdAndUpdate(req.user._id, {
          $push: {
              searchHistory: {
                  id: data.results[0].id,
                  image: data.results[0].profile_path,
                  title: data.results[0].title,
                  searchType: "Movie",
                  createdAt: new Date(),
                },
            },
        });
        res.status(200).json({success:true,data:data});
    } catch (error) {
      console.error("Error in searchPerson conroller:", error.message);
      if(error.message.includes("404")) {
        return res.status(404).json({ message: "Not Found" ,data:{}});
      }
      res.status(500).json({ message: "Error fetching person data" });
    }
  }

export const searchTvShow= async (req, res) => {
    const { query } = req.params;
    try {
      const data= await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1&query=${query}`)
      await User.findByIdAndUpdate(req.user._id, {
          $push: {
              searchHistory: {
                  id:data.results[0].id,
                  image:data.results[0].profile_path,
                  title:data.results[0].name,
                  searchType: "Tv",
                  createdAt: new Date(),
                },
            },
        });
        res.status(200).json({success:true,data:data});
    } catch (error) {
      console.error("Error in searchPerson conroller:", error.message);
      if(error.message.includes("404")) {
        return res.status(404).json({ message: "Not Found" ,data:{}});
      }
      res.status(500).json({ message: "Error fetching person data" });
    }
 }

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


  