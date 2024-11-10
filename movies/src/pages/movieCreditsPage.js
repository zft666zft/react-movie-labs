import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getMovieCredits } from "../api/tmdb-api";

const MovieCreditsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(["movieCredits", id], () => getMovieCredits(id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;
  const crew = data.crew;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cast</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cast.slice(0, 10).map((actor) => (
          <li key={actor.cast_id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w92${actor.profile_path}` : "/images/film-poster-placeholder.png"}
              alt={actor.name}
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            <div>
              <strong style={{ fontSize: '18px', color: '#3f51b5' }}>{actor.name}</strong> as {actor.character}
            </div>
          </li>
        ))}
      </ul>
      
      <h2>Crew</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {crew.slice(0, 10).map((member) => (
          <li key={member.credit_id} style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
            <img
              src={member.profile_path ? `https://image.tmdb.org/t/p/w92${member.profile_path}` : "/images/film-poster-placeholder.png"}
              alt={member.name}
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            <div>
              <strong style={{ fontSize: '18px', color: '#3f51b5' }}>{member.name}</strong> - {member.job}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCreditsPage;
