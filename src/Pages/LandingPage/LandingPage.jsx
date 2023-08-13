import { useContext, useState } from "react"
import "./LandingPage.css"
import { DataContext } from "../../context/context"


export const LandingPage = () => {
    const {state,dispatch} = useContext(DataContext);
    console.log(state);
    
    const genres = ['Action', 'Adventure', 'Sci-Fi', 'Drama', 'Biography', 'Crime', 'Fantasy','All'];
    const years = ['All', 2001, 1999, 1991, 2010, 1994, 2003, 1998, 1992, 1994];
    const ratings = ["All",1,2,3,4,5,6,7,8,9,10]
    
    
    const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (event) => {
    const selectedGenre = event.target.value;
    setSelectedOption(selectedGenre);
    console.log(selectedGenre);
    
    dispatch({type: "FILTER_GENRE", payload: selectedGenre})

}

const [selectedYear, setSelectedYear] = useState('');

const handleYearSelect = (event) => {
  const selectedYear= event.target.value;
  setSelectedYear(selectedYear)
  
  console.log(selectedYear);
  
dispatch({type: "FILTER_YEAR", payload: selectedYear})

}

const [selectedRating, setSelectedRating] = useState('');

const handleRatingSelect = (event) => {
  const selectedRating= event.target.value;
  setSelectedRating(selectedRating)
  
  console.log(selectedRating);
  
dispatch({type: "FILTER_RATING", payload: selectedRating})

}

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
  console.log("clicked")
};
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

const closeModal = () => {
  setIsModalOpen(false);
};

const handleModalSubmit = (movieData) => {
    
  console.log('Submitted movie data:', movieData);
};

const addToStarred = (id) => {
    console.log(id);
    const updatedData = state.movieData.map(item =>
        item.id === id ? { ...item, star: true } : item
      );
      console.log(updatedData)
    dispatch({type:"STAR" , payload: updatedData})
}
    
    return(
        <div>
            
            <div className="filters">
                <h3>Movies</h3>
                <div className="filter">
                <div>
      <label htmlFor="genreDropdown">Select Genre: </label>
      <select id="genreDropdown" value={selectedOption} onChange={handleSelect}>
        <option >{state.genreFilter}</option>
        {genres.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
                </div>
                <div className="filter">
                <div>
      <label htmlFor="yearDropdown">Select Year: </label>
      <select id="yearDropdown" value={selectedYear} onChange={handleYearSelect}>
        <option>{state.yearFilter}</option>
        {years.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
                </div>
                <div className="filter">
                <div>
      <label htmlFor="ratingDropdown">Select rating: </label>
      <select id="ratingDropdown" value={selectedRating} onChange={handleRatingSelect}>
        <option>{state.ratingFilter}</option>
        {ratings.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
                </div>
                
                <button onClick={openModal}>Add New Movie</button>
      {isModalOpen && (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
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
  
          <button className="submit-button" onClick={handleModalSubmit}>Submit</button>
        </div>
      </div>
      )}
              
            
                
                
                
            </div>
            
            
            <div className="moviesList">
            {
            state.filteredMovieData.map(item => (
                <div className="movie-card">
      <img className="movie-image" src={item.imageURL} alt="" />
      <h2 className="movie-title">{item.title}</h2>
      <p className="movie-summary">{item.summary}</p>
      <div className="button-container">
        <button className="action-button" >
          Add to Watchlist
        </button>
        {
            item.star ?  <button className="action-button" >
            Starred
          </button> :  <button className="action-button" onClick={() => addToStarred(item.id)} >
          Star
        </button>
        }
       
      </div>
    </div>
            ))
          }
            </div>
          
        
          
        </div>
    )
}