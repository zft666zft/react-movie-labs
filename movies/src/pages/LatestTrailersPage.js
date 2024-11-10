import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getLatestTrailers } from "../api/tmdb-api";

const LatestTrailersPage = () => {
  const { data: trailers, error, isLoading, isError } = useQuery("latestTrailers", getLatestTrailers);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Latest Trailers</h2>
      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {trailers.map((movie, index) => (
          movie.trailers.length > 0 && (
            <div key={index} style={{ minWidth: "250px", backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "10px" }}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{movie.title}</h3>
              <p>{movie.trailers[0].name}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default LatestTrailersPage;
