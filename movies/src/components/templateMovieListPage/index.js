import React, { useState, useContext, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Pagination from "../pagination";
import { MoviesContext } from "../../contexts/moviesContext";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState([0, 10]); // 评分区间
  const [releaseDateFilter, setReleaseDateFilter] = useState([2000, new Date().getFullYear()]); // 发布年份区间
  const [sortOption, setSortOption] = useState(""); // 添加排序选项
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10); // 每页显示的电影数量

  const { favorites, mustWatch } = useContext(MoviesContext);

  useEffect(() => {
    // 初始时设置 favoritesPage 和 watchlistPage 的电影列表为空
    if (title === "Favorite Movies" && favorites.length === 0) {
      setCurrentPage(1);
    } else if (title === "Watchlist" && mustWatch.length === 0) {
      setCurrentPage(1);
    }
  }, [title, favorites, mustWatch]);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter[0] && m.vote_average <= ratingFilter[1];
    })
    .filter((m) => {
      const releaseYear = new Date(m.release_date).getFullYear();
      return releaseYear >= releaseDateFilter[0] && releaseYear <= releaseDateFilter[1];
    });

  // 根据排序选项对过滤后的电影列表进行排序
  displayedMovies = displayedMovies.sort((a, b) => {
    if (sortOption === "rating") return b.vote_average - a.vote_average;
    if (sortOption === "name") return a.title.localeCompare(b.title);
    if (sortOption === "releaseDate") return new Date(b.release_date) - new Date(a.release_date);
    return 0;
  });

  // 分页逻辑
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = displayedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(displayedMovies.length / moviesPerPage);

  const handleChange = (type, value) => {
    switch (type) {
      case "name":
        setNameFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "rating":
        setRatingFilter(value);
        break;
      case "releaseDate":
        setReleaseDateFilter(value);
        break;
      case "sort":
        setSortOption(value);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            releaseDateFilter={releaseDateFilter}
          />
        </Grid>
        <MovieList action={action} movies={currentMovies}></MovieList>
        <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Grid>
      </Grid>
      
    </Grid>
  );
}

export default MovieListPageTemplate;
