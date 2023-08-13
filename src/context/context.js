import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { movies } from "../data";

const getInitialValue = () => {
  
  const storedMovieData = JSON.parse(localStorage.getItem("movieData"));
  const storedMovieFilteredData = JSON.parse(localStorage.getItem("filteredMovieData"));
  const storedGenreFilter = JSON.parse(localStorage.getItem("genreFilter"));
  const storedYearFilter = JSON.parse(localStorage.getItem("yearFilter"));
  const storedRatingFilter = JSON.parse(localStorage.getItem("ratingFilter"));
  return {
    movieData: storedMovieData || movies,
    filteredMovieData: storedMovieFilteredData || movies,
    genreFilter: storedGenreFilter || "All",
    yearFilter: storedYearFilter || "All",
    ratingFilter: storedRatingFilter || "All"
    
  };
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialValue());

  useEffect(() => {
    
    localStorage.setItem("movieData", JSON.stringify(state.movieData));
    localStorage.setItem("filteredMovieData", JSON.stringify(state.filteredMovieData));
    localStorage.setItem("genreFilter", JSON.stringify(state.genreFilter));
    localStorage.setItem("yearFilter", JSON.stringify(state.yearFilter));
    localStorage.setItem("ratingFilter", JSON.stringify(state.ratingFilter));
  }, [state]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};