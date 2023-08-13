import { useContext, useState } from "react";
import "./TopNav.css";
import { DataContext } from "../../context/context";


export const TopNav = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  const{state, dispatch} = useContext(DataContext)
    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
  
      const results = state.movieData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(term) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(term)) ||
          movie.director.toLowerCase().includes(term)
      );
  
      setSearchResults(results);
      console.log(searchResults);
      dispatch({type:"SEARCH", payload: searchResults})
    };
    return(
        <div className="top-navbar">
      <div className="left">
        <span className="website-name">IMDB</span>
      </div>
      <div className="center">
      
        <input
        type="text"
        placeholder="Search by title, cast, or director"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      </div>
      <div className="right">
        <span className="routing-icon">Movies</span>
        <span className="routing-icon">Watchlist</span>
        <span className="routing-icon">Starred</span>
      </div>
    </div>
    )
}