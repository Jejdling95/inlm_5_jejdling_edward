import React from 'react'

const ReadMoviesComponent = ({movie, editButton, deleteButton}) => {
  return (
    <tr>
    <td>{movie.title}</td>
    <td>{movie.year}</td>
    <td>{movie.rating}</td>
    <td>
        <button type='button' id='editButton' onClick={(event)=>editButton(event, movie)}>Edit</button>
        <button type='button' id='deletebutton' onClick={()=>deleteButton(movie.id)}>Delete</button>
    </td>
</tr>
  )
}

export default ReadMoviesComponent