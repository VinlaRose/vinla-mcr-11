import { useContext } from "react"
import { DataContext } from "../../context/context"

export const StarPage = () => {
    const {state, dispatch} = useContext(DataContext);
    const starredMovies = state.movieData.filter(item => item.star === true);
    const removeToStarred = (id) => {
        console.log(id);
        const updatedData = state.movieData.map(item =>
            item.id === id ? { ...item, star: false } : item
          );
          console.log(updatedData)
        dispatch({type:"STAR" , payload: updatedData})
    }
    return (
        <div>
            <h1>Starred Movies</h1>
            <div className="moviesList">
            {
            starredMovies?.map(item => (
                <div className="movie-card">
      <img className="movie-image" src={item.imageURL} alt="" />
      <h2 className="movie-title">{item.title}</h2>
      <p className="movie-summary">{item.summary}</p>
      <div className="button-container">
        <button className="action-button" >
          Add to Watchlist
        </button>
        {
            item.star ?  <button onClick={() => removeToStarred(item.id)}className="action-button" >
            Remove from Star
          </button> :  <button className="action-button"  >
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