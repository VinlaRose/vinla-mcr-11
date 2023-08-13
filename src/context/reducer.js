
export const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA": 
        return {
          ...state,
          data: action.payload,
          filteredData: action.payload,
        };
        case "FILTER_GENRE":
            return{
                ...state,
                genreFilter: action.payload,
                filteredMovieData: action.payload === "All" ? state.movieData : state.movieData.filter((item) =>
                item.genre.includes(action.payload)
              )

            }
            
            case "FILTER_YEAR":
                return{
                    ...state,
                    yearFilter: action.payload,
                    filteredMovieData: action.payload === "All" ? state.movieData : state.filteredMovieData.filter((item) =>
                    item.year == action.payload
                  )
    
                }
                
                case "FILTER_RATING":
                    return{
                        ...state,
                        ratingFilter: action.payload,
                        filteredMovieData: action.payload === "All" ? state.movieData : state.filteredMovieData.filter((item) =>
                        item.rating == action.payload
                      )
        
                    }
      case "SORTING":
        return {
          ...state,
          filteredData: action.payload,
        };
        case "SELECTED_FILTER":
        return {
          ...state,
          selectedFilters: action.payload,
          filteredData:  action.payload === 'all' 
          ? state.data 
          : state.data.filter((product) => product.department === action.payload)
        };
        case "LOW_STOCK_FILTER":
          return {
            ...state,
            filteredData: action.payload,

          };
          case "SEARCH":
          return {
            ...state,
            filteredMovieData: action.payload,

          };
          case "STAR":
          return {
            ...state,
            movieData: action.payload,
            filteredMovieData: action.payload,

          };
          case "ADD":
          return {
            ...state,
            movieData: action.payload,
            filteredMovieData: action.payload,

          };
        
      default:
        return state;
    }
  };
  
  