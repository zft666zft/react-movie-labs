import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon
          color={mustWatch.includes(movie.id) ? "secondary" : "primary"} // 根据 mustWatch 状态改变颜色
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={() => addToMustWatch(movie.id)} // 绑定点击事件
        />
      )}
    />
  );
};

export default UpcomingMoviesPage;
