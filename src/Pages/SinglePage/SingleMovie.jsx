import React, { useContext } from 'react';
import './SingleMovie.css';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/context';

export const MovieCard = () => {
    const {state,dispatch} = useContext(DataContext)
    const {movieId} = useParams();
    const movie = state.movieData.find(item => item.id == movieId);
    console.log(movie);
    const addToStar = (id) => {
        console.log(id);
        const updatedData = state.movieData.map(item =>
            item.id === id ? { ...item, star: true } : item
          );
          console.log(updatedData)
        dispatch({type:"STAR" , payload: updatedData})
    }
  return (
    <div>
        Movie Card: {movieId}
        <div className="singlemovie-card">
      <div className="singlemovie-image">
        <img src={movie.imageURL} alt={movie.title} />
      </div>
      <div className="singlemovie-details">
        <h1>{movie.title}</h1>
        <p>{movie.year}</p>
        <p>{movie.genre.join(', ')}</p>
        <p>Rating: {movie.rating}</p>
        <p>Director: {movie.director}</p>
        <p>Writer: {movie.writer}</p>
        <p>Cast: {movie.cast.join(', ')}</p>
        <p>{movie.summary}</p>
        <div className="button-container">
        <button className="action-button" >
          Add to Watchlist
        </button>
        {
            movie.star ?  <button className="action-button" >
        Starred
          </button  > :  <button  onClick={() => addToStar(movie.id)} className="action-button"  >
          Star
        </button>
        }
       
      </div>
      </div>
     
    </div>
    
    </div>
    
  );
};


