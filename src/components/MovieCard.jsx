function MovieCard({ movieObj, addToWatchList, watchList, removeFromWatchList }) {
  const doesContain = (movieObject) => {
   /* for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObject.id) {
        return true; // chnage button to cross
      }
    }
    return false; // added to my WatchList */
    const filter = watchList.filter(movie => movie.id === movieObject.id);
    return filter.length > 0;
  };

  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110
    duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObj.backdrop_path})`
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => removeFromWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg
bg-red-900/60"
        >
          ❌
        </div>
      ) : (
        <div
          onClick={() => addToWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg
bg-gray-900/60"
        >
          😍
        </div>
      )}
      <div
        className="text-white w-full text-center text-xl p-2 rounded-lg
    bg-gray-900/70"
      >
        {movieObj.title}
      </div>
    </div>
  );
}
export default MovieCard;
