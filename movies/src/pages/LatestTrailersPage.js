import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getLatestTrailers } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const LatestTrailersPage = () => {
  const { data, error, isLoading, isError } = useQuery("latestTrailers", getLatestTrailers);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.filter(movie => movie.trailers.length > 0); // 只保留有预告片的电影

  return (
    <PageTemplate
      title="Latest Trailers"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default LatestTrailersPage;
