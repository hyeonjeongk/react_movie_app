import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  console.log(movie);
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} />
          <h1>{movie.title}</h1>
          <p>
            {movie.year} {movie.runtime}min
          </p>
          <p>{movie.description_full}</p>
          <p>
            genre:
            {movie.genres.map((g, i) =>
              i + 1 === movie.genres.length ? (
                <span key={i}> {g}</span>
              ) : (
                <span key={i}> {g},</span>
              )
            )}
          </p>
          <p>{movie.rating}/10</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
