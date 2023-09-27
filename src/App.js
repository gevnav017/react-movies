import React from 'react';
import './App.css';

import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {
  const [movie, setMovie] = useState("")
  const [allMovies, setAllMovies] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/')
    .then((res) => {
      setAllMovies(res.data)
    })
  }, [allMovies])

  const submitReview = () => {
      Axios.post("http://localhost:3001/insert", {
        movie: movie
      })
      .then((res) => {
        console.log("success")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <h1>CRUD</h1>

      <div>
        <input type="text" name="movie" placeholder="movie name" 
                onChange={(e) => {setMovie(e.target.value)}} />

        <button onClick={submitReview}>
            Submit
        </button>
      </div>

      <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin:"10px"}}>
        {allMovies && allMovies.map((movie) => 
          <div 
            style={{margin:"10px", border:"solid gray", width:"20%", textAlign:"center", padding:"6px", borderRadius:"10px"}} 
            key={movie.id}>{movie.movie}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
