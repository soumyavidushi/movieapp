import axios from 'axios';
import {useState, useEffect} from 'react';

const Banner = () => {
    const [bannerImage, setBannerImage] = useState("");
    const [title, setTitle] = useState("Placeholder title");

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=23ef53fa11574cea9896f60b91b50fb4&language=en-US&page=1").then(response => {
            console.log("Films", response.data.results);
            const firstMovie = response.data.results[0];
            const firstMovieTitle = firstMovie.title;
            const firstMoviePoster = firstMovie["backdrop_path"];
            setTitle(firstMovieTitle);
            setBannerImage(`https://image.tmdb.org/t/p/original/${firstMoviePoster}`);
        })
    })

  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="text-white w-full text-center text-2xl">
       {title}
      </div>
    </div>
  );
};
export default Banner;
