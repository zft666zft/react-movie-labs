import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovieCast } from "../api/tmdb-api";

const MovieCastPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(["movieCast", id], () => getMovieCast(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movie Cast</h2>
      {cast.length ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cast.slice(0, 10).map((actor) => (
            <li key={actor.cast_id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <img 
                src={`https://image.tmdb.org/t/p/w92/${actor.profile_path}`} 
                alt={actor.name} 
                style={{ borderRadius: "50%", marginRight: "15px" }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{actor.name}</h3>
                <p style={{ margin: "5px 0 0", color: "#757575" }}>as {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available for this movie.</p>
      )}
    </div>
  );
};

export default MovieCastPage;
