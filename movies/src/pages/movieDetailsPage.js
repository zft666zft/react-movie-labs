import React from "react";
import { useParams, Link } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const MoviePage = () => {
  const { id } = useParams(); // 获取当前电影的 ID
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            {/* 新增的推荐链接 */}
            <Link to={`/movie/${id}/recommendations`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#3f51b5' }}>
              View Recommendations
            </Link>

            {/* 新增的相似电影链接 */}
            <Link to={`/movie/${id}/similar`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#388e3c', textDecoration: 'underline' }}>
              View Similar Movies
            </Link>

             {/* 新增的演员列表链接 */}
             <Link to={`/movie/${id}/cast`} style={{ display: 'block', marginTop: '20px', fontSize: '18px', color: '#ff5722', textDecoration: 'underline' }}>
              View Cast
            </Link>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
