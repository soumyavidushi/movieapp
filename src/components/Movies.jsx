import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";

const Movies = () => {
  // we will be using this static list of movies then we will replace it with actual data fetching logic
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    console.log("use effect fetched data");
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=23ef53fa11574cea9896f60b91b50fb4&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, [pageNo]);

  const addToWatchList = (movieObj) => {
    const updatedWatchlist = [...watchList, movieObj];
    setWatchList(updatedWatchlist);
    localStorage.setItem("movies", JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchList = (movieObj) => {
    let filtredMovies = watchList.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filtredMovies);
    localStorage.setItem("movies", JSON.stringify(filtredMovies));
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("movies");
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  // go back handler
  const handlePrevious = () => {
    if (pageNo == 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };
  return (
    <div>
      <div className="text-2xl font-bold text-center m-5">
        <h1>Trending Movies</h1>
      </div>
      <div className="flex justify-evenly flex-wrap gap-8 ">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              movieObj={movieObj}
              key={movieObj.title}
              addToWatchList={addToWatchList}
              watchList={watchList}
              removeFromWatchList={removeFromWatchList}
            />
          );
        })}
      </div>
      <Pagination
        nextPageFn={handleNext}
        previosuPageFn={handlePrevious}
        pageNumber={pageNo}
      />
    </div>
  );
};
export default Movies;
