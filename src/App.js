// "use strict"; // use strict är implementerat i index.js
import React, {useState, Fragment} from 'react';
import './App.css';
import data from "./testdata.json";
import {nanoid} from "nanoid";
import ReadMoviesComponent from './html_komponenter/ReadMoviesComponent';
import EditMovieComponent from './html_komponenter/EditMovieComponent';

const App = () => {
/**
 * Applikationens objekt
 */
  const [movies, setMovies] = useState(data);
  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    rating: "",
  });

  const [editMovieId, setEditMovieId] = useState(null); //För att hämta id på det objekt som ska ändras

  /**--------------------------------------------------------------
 * --------------------------------------------------------------
 * Funktion för hantering av formulärets inmatadevärden
 */
const editForm = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newData = {...movieData}; 
    newData[fieldName] = fieldValue;

    setMovieData(newData);
}
  
/**--------------------------------------------------------------
 * --------------------------------------------------------------
 * Funktion för submit av add-formuläret
 */
  const formSubmit = (event) => { // Funktion för att lägga till ny movie
    event.preventDefault();

    const newMovie = {
      id: nanoid(),
      title: movieData.title,
      year: movieData.year,
      rating: movieData.rating,
    };
    var check = false;
    for (let i = 0; i < movies.length; i++){
      var movietitle = movies[i].title;
      
      if (movietitle.toLowerCase().replace(/\s/g, '') === newMovie.title.toLowerCase().replace(/\s/g, '')){
        check = true;
      }
    }
    if (check === false){ // om titeln ej existerar i listan är "check" fortfarande "false" och filmen kan adderas i listan.
    const newMovies = [...movies, newMovie];//tilldelar "newMovies" den nuvarande listan "movies" + "newMovie"
    setMovies(newMovies);
    } else {
      alert('Title already exist')
    }
  
  };

  /**
   * Edit-knappen
   */
  const editButton = (event, movie) => {
    event.preventDefault();
    setEditMovieId(movie.id);

    const formValues = { //värdena i edit-formuläret tilldelas värdena från parametern "movie"
      title: movie.title,
      year: movie.year,
      rating: movie.rating,
    }
    setMovieData(formValues); 
  };

  /**
   * save-knappen
   * Här utförs kontroll så att ändrad title inte redan existerar
   */
  const saveButton = (event) => {
    event.preventDefault();
   
    const editedMovie = {
      id: editMovieId,
      title: movieData.title,
      year: movieData.year, 
      rating: movieData.rating,
    };

    var filteredMovies = movies.filter(function(movie){ //används för att kontrollera title i listan förutom den egna titeln
      return movie.id !== editMovieId; 
    });
    console.log(filteredMovies)

    var check = false;

    for (let i = 0; i < filteredMovies.length; i++){
      var movietitle = filteredMovies[i].title;
      console.log(movietitle);
      
      if (movietitle.toLowerCase().replace(/\s/g, '') === editedMovie.title.toLowerCase().replace(/\s/g, '')){
        check = true;
      }
    }
    if (check === false){ // om titeln ej existerar i listan är "check" fortfarande "false" och filmen kan adderas i listan.
      const index = movies.findIndex((movie)=> movie.id === editMovieId); //Hitta rätt index i arrayen med movies som ska uppdateras.
      const newMovies = [...movies];
      newMovies[index] = editedMovie;
  
      setMovies(newMovies);
      setEditMovieId(null);
    } else {
      alert('Title already exist')
    }
  }

    /**
   * Delete-knappen
   */
  const deleteButton = (movieid) => {
    const newMovies = [...movies]
    const index = movies.findIndex((movie) => movie.id === movieid)
    
    newMovies.splice(index, 1);
    setMovies(newMovies);
    console.log(movies)
  }

  /**
   * Html som genereras i applikationen
   */
  return (
    <div className='app-container'>
      <h1>My movie ratings</h1>
      <form onSubmit={saveButton}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Delete or Edit</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <Fragment>
              {editMovieId === movie.id ? ( //Om det sker en Id-matchning så visas EditMovieComponent för den raden (se den som en if-sats)
              <EditMovieComponent 
              editMovieData={movieData} //Hämtar data till edit-formuläret
              editForm={editForm} //hanterar ändringar i formuläret (När man skriver direkt i formuläret)
              /> 
              ) : (
              <ReadMoviesComponent 
              movie={movie} 
              editButton={editButton}
              deleteButton={deleteButton}
              />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>

      <div className='form-container'>
        <h3>Add a new movie</h3>
          <form onSubmit={formSubmit}>
            <input type="text" name='title' required placeholder='Title' onChange={editForm}/> 
            <input type="number" name='year' required placeholder='Year' onChange={editForm}/>
            <input type="number" name='rating' required placeholder='Rating 1 to 10' min="1" max="10" onChange={editForm}/>
            <button type='submit' id='saveButton'>Add movie</button>
          </form>
      </div>
   </div>
  )
};

export default App;

