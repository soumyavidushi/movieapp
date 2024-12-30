import { useEffect, useState } from "react";
import genreids from "../constants";

const Watchlist = () => {
  const [watchList, setWatchList] = useState([]);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([
    "All Genres",
    "Thriller",
    "Action",
  ]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const genres = (genre_id) => {
    return genreids[genre_id];
  };

  const Genre = () => {
    return(
      <div className="flex justify-center m-4">
        {genreList.map((genre) => {
          const isActive = currentGenre === genre;
          const baseStyles =
            "flex justify-center items-center h-[3rem] w-[8rem] rounded-lg text-white font-bold mx-4";
          const bgColor = isActive ? "bg-blue-400" : "bg-gray-400/50";
          return <div onClick={()=>handleFilter(genre)} className={`${baseStyles} ${bgColor}`}>{genre}</div>;
        })}
      </div>
    )
  }

  const Search = () => {
    return (
      <div className="flex justify-center my-10">
        <input
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border
border-gray-300"
          type="text"
          onChange={handleSearch}
          value={search}
        />
      </div>
    )
  }

  const handleAscendingRatings = () => {
    console.log("arranging movies by ascending order");
    let sortedAscending = watchList.sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList([...sortedAscending]);
  };
  const handleDescendingRatings = () => {
    console.log("arranging movies by descending order");
    let sortedDescending = watchList.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList([...sortedDescending]);
  };

  const handleFilter = (genre) => {
    setCurrentGenre(genre);  
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("movies");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  useEffect(() => {
    let temp = watchList.map((movie) => {
      return genreids[movie.genre_ids[0]];
    });
    // set stores only the unique entries
    temp = new Set(temp);
    console.log(temp);
    setGenreList(["All Genres", ...temp]);
    // console.log([...temp])
  }, [watchList]);

  return (
    <>
      <Genre />
      <Search />
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table
          className="w-full border-collapse bg-white text-left text-sm
text-gray-500"
        >
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex">
                  <div>
                    <i
                      onClick={handleAscendingRatings}
                      className="fa-solid fa-arrow-up hover:cursor-pointer mx-1"
                    ></i>{" "}
                    Ratings{" "}
                    <i
                      onClick={handleDescendingRatings}
                      className="fa-solid fa-arrow-down hover:cursor-pointer mx-1"
                    ></i>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Popularity</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Genre</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchList
              .filter(movie => {
                if(currentGenre === 'All Genres') {
                  return true;
                } else {
                  return genreids[movie.genre_ids[0]] === currentGenre;;
                }
              }).filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((movie) => (
                <tr className="hover:bg-gray-50" key={movie.id}>
                  <td className="flex items-center px-6 py-4 font-normal text-gray-900 gap-4">
                    <img
                      className="h-[6rem] w-[10rem] object-fit object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt=""
                    />
                    <div className="font-medium text-gray-700 text-sm">
                      {movie.title}
                    </div>
                  </td>
                  <td className="pl-6 py-4">{movie.vote_average}</td>
                  <td className="pl-6 py-4">{movie.popularity}</td>
                  <td className="pl-2 py-4">{genres(movie.genre_ids[0])}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Watchlist;
