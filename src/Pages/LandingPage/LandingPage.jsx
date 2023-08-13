import { useContext, useState } from "react"
import "./LandingPage.css"
import { DataContext } from "../../context/context"
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";



export const LandingPage = () => {
    const {state,dispatch} = useContext(DataContext);
    console.log(state);
    const navigate = useNavigate()
    
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

const onClose = () => {
    setIsModalOpen(false)
}

const [title, setMovieName] = useState('');
  const [director, setDirectorName] = useState('');
  const [summary, setSummary] = useState('');
  const [cast, setCast] = useState([]);
  const [writer, setWriters] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenres] = useState([]);
  const [imageURL, setImageURL] = useState('');

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleDirectorNameChange = (e) => {
    setDirectorName(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleCastChange = (e) => {
    const newCast = e.target.value.split(',');
    setCast(newCast);
  };

  const handleWritersChange = (e) => {
    setWriters(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenres(selectedGenres);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleSubmit = () => {
    const movieData = {
        id : uuid(),
      title,
      director,
      summary,
      cast,
      writer,
      year,
      rating,
      genre,
      imageURL,
      star: false,
    };

    console.log(movieData);
    const updatedList = [...state.movieData, movieData];
    console.log(updatedList)
dispatch({type: "ADD" , payload: updatedList})
   
    setMovieName('');
    setDirectorName('');
    setSummary('');
    setCast([]);
    setWriters('');
    setYear('');
    setRating('');
    setGenres([]);
    setImageURL('');

    onClose();
  };



const addToStarred = (id) => {
    console.log(id);
    const updatedData = state.movieData.map(item =>
        item.id === id ? { ...item, star: true } : item
      );
      console.log(updatedData)
    dispatch({type:"STAR" , payload: updatedData})
}
    
const goToMovie = (id) => {
    console.log("clicked")
    console.log(id)
    navigate(`/${id}`)
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
                {
                    isModalOpen && (
                        <div>
                             <div className="modal-overlay">
      <div className="modal">
        <h2>Add a Movie</h2>
        <label>
          Movie Name:
          <input type="text" value={title} onChange={handleMovieNameChange} />
        </label>
        <label>
          Director Name:
          <input type="text" value={director} onChange={handleDirectorNameChange} />
        </label>
        <label>
          Summary:
          <textarea value={summary} onChange={handleSummaryChange}></textarea>
        </label>
        <label>
          Cast (Separate by commas):
          <input type="text" value={cast.join(',')} onChange={handleCastChange} />
        </label>
        <label>
          Writers:
          <input type="text" value={writer} onChange={handleWritersChange} />
        </label>
        <label>
          Year:
          <input type="text" value={year} onChange={handleYearChange} />
        </label>
        <label>
          Rating:
          <select value={rating} onChange={handleRatingChange}>
            <option value="">Select Rating</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genre:
          <select multiple={true} value={genre} onChange={handleGenreChange}>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Drama">Drama</option>
            <option value="Biography">Biography</option>
            <option value="Crime">Crime</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </label>
        <label>
          Image URL:
          <input type="text" value={imageURL} onChange={handleImageURLChange} />
        </label>
        <div className="modal-buttons">
          <button className="close-button" onClick={onClose}>Close</button>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
                        </div>
                    )
                }
                
                
                
                
     
              
            
                
                
                
            </div>
            
            
            <div className="moviesList">
            {
            state.filteredMovieData.map(item => (
                <div className="movie-card">
      <img className="movie-image" src={item.imageURL} alt="" />
      <h2 onClick={() => goToMovie(item.id)} className="movie-title">{item.title}</h2>
      <p className="movie-summary">{item.summary}</p>
      <div className="button-container">
        <button className="action-button" onClick={() => goToMovie(item.id)} >
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