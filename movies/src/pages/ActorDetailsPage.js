import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, error: actorError, isLoading: isActorLoading } = useQuery(
    ["actorDetails", id],
    () => getActorDetails(id)
  );

  const { data: movies, error: moviesError, isLoading: isMoviesLoading } = useQuery(
    ["actorMovies", id],
    () => getActorMovies(id)
  );

  if (isActorLoading || isMoviesLoading) return <Spinner />;
  if (actorError || moviesError) return <h1>{actorError?.message || moviesError?.message}</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{actor.name}</h2>
      <img
        src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "/images/film-poster-placeholder.png"}
        alt={actor.name}
        style={{ borderRadius: "10px", width: "300px", height: "450px", objectFit: "cover" }}
      />
      <div style={{ marginTop: "15px" }}>
        <h3>Biography</h3>
        <p>{actor.biography || "No biography available"}</p>

        <h3>Personal Information</h3>
        <p><strong>Known For:</strong> {actor.known_for_department}</p>
        <p><strong>Number of Movies:</strong> {movies.cast.length || "Unknown"}</p>
        <p><strong>Gender:</strong> {actor.gender === 1 ? "Female" : "Male"}</p>
        <p><strong>Birthday:</strong> {actor.birthday || "Unknown"}</p>

        <h3>Movie Credits</h3>
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {movies.cast.map((movie) => (
            <div key={movie.id} style={{ marginRight: "10px", textAlign: "center" }}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : "/images/film-poster-placeholder.png"}
                alt={movie.title}
                style={{ width: "154px", height: "231px", borderRadius: "10px", objectFit: "cover" }}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetailsPage;
