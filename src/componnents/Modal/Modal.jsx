import React, { useState } from 'react';
import './Modal.css';

export const MovieModal = ({ onClose, onSubmit }) => {
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    genre: [],
    rating: '',
    director: '',
    writer: '',
    cast: [],
    summary: '',
    imageURL: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setMovieData((prevData) => ({
      ...prevData,
      genre: selectedOptions,
    }));
  };

  const handleCastChange = (event) => {
    const { value } = event.target;
    if (value.trim() !== '') {
      setMovieData((prevData) => ({
        ...prevData,
        cast: [...prevData.cast, value],
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(movieData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Movie</h2>
        <label>Title:</label>
        <input type="text" name="title" value={movieData.title} onChange={handleInputChange} />

        <label>Year:</label>
        <input type="number" name="year" value={movieData.year} onChange={handleInputChange} />

        <label>Genre:</label>
        <select multiple name="genre" value={movieData.genre} onChange={handleGenreChange}>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Drama">Drama</option>
          {/* Add more genre options here */}
        </select>

        <label>Rating:</label>
        <select name="rating" value={movieData.rating} onChange={handleInputChange}>
          <option value="">Select Rating</option>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <label>Director:</label>
        <input type="text" name="director" value={movieData.director} onChange={handleInputChange} />

        <label>Writer:</label>
        <input type="text" name="writer" value={movieData.writer} onChange={handleInputChange} />

        <label>Cast:</label>
        <input
          type="text"
          placeholder="Add cast member..."
          onChange={handleCastChange}
        />
        <ul>
          {movieData.cast.map((castMember, index) => (
            <li key={index}>{castMember}</li>
          ))}
        </ul>

        <label>Summary:</label>
        <textarea name="summary" value={movieData.summary} onChange={handleInputChange} />

        <label>Image URL:</label>
        <input type="text" name="imageURL" value={movieData.imageURL} onChange={handleInputChange} />

        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default MovieModal;
