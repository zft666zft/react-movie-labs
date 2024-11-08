import React, { useState, createContext } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); // New "Must Watch" state variable

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie.id]);
  };

  // Function to add a movie to the "Must Watch" list
  const addToMustWatch = (movieId) => {
    if (mustWatch.includes(movieId)) {
      // 如果已在 mustWatch 列表中，移除该电影
      setMustWatch((prevMustWatch) => {
        const updatedMustWatch = prevMustWatch.filter(id => id !== movieId);
        console.log("Updated Must Watch List:", updatedMustWatch); // 输出更新后的列表
        return updatedMustWatch;
      });
    } else {
      // 如果不在 mustWatch 列表中，将该电影添加进去
      setMustWatch((prevMustWatch) => {
        const updatedMustWatch = [...prevMustWatch, movieId];
        console.log("Updated Must Watch List:", updatedMustWatch); // 输出更新后的列表
        return updatedMustWatch;
      });
    }
  };
  

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        mustWatch,          // Provide mustWatch state
        addToMustWatch,     // Provide addToMustWatch function
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
