import React, { useState, createContext } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); // "Must Watch" 状态变量

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie.id]);
  };

  // 从收藏列表中移除电影的函数
  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter(id => id !== movie.id));
  };

  // 添加或移除 "Must Watch" 列表中的电影
  const addToMustWatch = (movieId) => {
    if (mustWatch.includes(movieId)) {
      setMustWatch((prevMustWatch) => {
        const updatedMustWatch = prevMustWatch.filter(id => id !== movieId);
        console.log("Updated Must Watch List:", updatedMustWatch); // 输出更新后的列表
        return updatedMustWatch;
      });
    } else {
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
        removeFromFavorites, // 提供 removeFromFavorites 函数
        mustWatch,           // 提供 mustWatch 状态
        addToMustWatch,      // 提供 addToMustWatch 函数
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
