import React from 'react';
import './App.css';
import { TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {
  const [movie, setMovie] = useState("")
  const [allMovies, setAllMovies] = useState([])
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState("")
  const [editMovie, setEditMovie] = useState({})

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
        if (res.status === 200) {
          setMessage("Successfully inserted")
          setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeMovie = (id) => {
    Axios.post("http://localhost:3001/delete", {
      id: id
    })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Successfully deleted")
          setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const openEditModal = (updateMovie) => {
    setEditMovie({
      id: updateMovie.id,
      movie: updateMovie.movie
    })

    setOpenModal(true)
  }

  const updateNameofMovie = () => {
    Axios.post("http://localhost:3001/update", {
      id: editMovie.id,
      movie: editMovie.movie
    })
    .then((res) => {
      setOpenModal(false)
      if (res.status === 200) {
        setMessage("Successfully updated")
        setOpen(true)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <div style={{ margin: "10px" }}>
      <h1>CRUD</h1>

      <div style={{ height: "55px" }}>
        <TextField
          label="add movie"
          variant="outlined"
          onChange={(e) => { setMovie(e.target.value) }}
        />

        <Button sx={{ ml: 2, height: "100%" }} variant="outlined" onClick={submitReview}>Add</Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
        {allMovies && allMovies.map((movie) =>
          <div
            className='movies'
            style={{
              margin: "10px", border: "solid gray", width: "20%",
              textAlign: "center", padding: "6px", borderRadius: "10px"
            }}
            onClick={ () => {openEditModal(movie)} }
            key={movie.id}>{movie.movie}
            <button
              style={{ float: "right", background: "none", border: "none" }}
              onClick={() => { removeMovie(movie.id) }}
            >
              X
            </button>
          </div>
        )}

      </div>

      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      </div>

      <div>
        <Dialog open={openModal} onClose={closeModal} fullWidth>
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label={editMovie.movie}
              type="email"
              variant="standard"
              fullWidth
              onChange={(e) => {
                setEditMovie({
                  id: editMovie.id,
                  movie: e.target.value
                })
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={updateNameofMovie}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
