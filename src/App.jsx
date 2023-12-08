import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardMovie from './components/CardMovie';
import SearchIcon from '../src/assets/SearchIcon.svg';
function App() {

  //API URL and key
  const API_URL = "http://www.omdbapi.com?apikey=20c235b0";
  const [movieObject,setMovieObject]=useState([]); //object to store the movies
  const [inputMovieSearch, setInputMovieSearch] = useState(""); //search a movie

  //movie search function
  const movieSearch=async(inputMovieSearch)=>{
    const response = await fetch(`${API_URL}&s=${inputMovieSearch}`,{
      referrerPolicy:'unsafe-url'
    }); //fecth from API
    const data = await response.json(); //extract the JSON from the response. Using the json method

    setMovieObject(data.Search);
  }

  return (
   <div className='app'>
     <h1>JalidaLand</h1>
     <div className="search">
        <input
        id='movieSearchInput'
          placeholder="Enter a movie name"
          value={inputMovieSearch}
          onChange={(event) => {
            setInputMovieSearch(event.target.value);
          }}
        />
        <img src={SearchIcon} alt="search" onClick={()=>movieSearch(inputMovieSearch)} />
      </div>
      {/* check if the movie object is having a value/data, if data is greater than 0 then display the card but if it is 0 then show the label, no movie found */}
      {movieObject?.length > 0 ? (
        <div className="container">
          {movieObject.map((movie) => (
            <CardMovie movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No films were discovered. Please search your favorite movie.</h2>
        </div>
      )}
    
   </div>
  )
}

export default App
