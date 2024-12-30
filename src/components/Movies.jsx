import { useState, useEffect, useContext } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";
import { WatchListContext } from "../context/WatchListContext";

const Movies = () => {
  // we will be using this static list of movies then we will replace it with actual data fetching logic
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1); 
  // const {addToWatchList, removeFromWatchList, watchList, setWatchList} = useContext(WatchListContext);
  const {addToWatchList, removeFromWatchList, watchList, setWatchList} = useContext(WatchListContext);

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
