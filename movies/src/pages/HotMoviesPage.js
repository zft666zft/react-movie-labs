import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getHotMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

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
    <PageTemplate
      title="Hot Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default HotMoviesPage;
