import React, { useContext } from 'react';
import './SingleMovie.css';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/context';

export const MovieCard = () => {
    const {state,dispatch} = useContext(DataContext)
    const {movieId} = useParams();
    const movie = state.movieData.find(item => item.id == movieId);
    console.log(movie)
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
      </div>
    </div>
    </div>
    
  );
};


