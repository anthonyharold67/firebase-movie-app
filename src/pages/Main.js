import React, { useEffect,useState,useContext } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;



const Main = () => {
  const {currentUser} = useContext(AuthContext);
  const [movies,setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");  
  useEffect(() => {
    getMovies(FEATURED_API);
  },[])
  const getMovies =(API) => {
   axios.get(API).then((response) => {
      setMovies(response.data.results);
    }).catch((error) => {
      console.log(error);
    });  
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm && currentUser){
      getMovies(SEARCH_API + searchTerm);
    }else if(!currentUser){
      alert("Please Login to Search");
    }else{
      alert("Please Enter Search Term");
    }
   

  }
  return (
  <>
    <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>
    <div className="d-flex justify-content-center flex-wrap">
      {movies?.map((movie) => (
        <MovieCard  {...movie} key={movie.id}/>
      ))}
    </div>
  </>);
};

export default Main;
