import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getHotMovies } from "../api/tmdb-api";

const HotMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("hotMovies", getHotMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hot Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "150px", backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />
            <h4 style={{ fontSize: "16px", margin: "10px 0 5px" }}>{movie.title}</h4>
            <p style={{ margin: "5px 0", color: "#666" }}>{movie.release_date}</p>
            <span style={{ color: "#ff5722", fontWeight: "bold" }}>{movie.vote_average * 10}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotMoviesPage;
