import React from 'react'

const EditMovieComponent = ({editMovieData, editForm}) => {
  return (
    <tr>
        <td>
            <input 
                type="text" 
                required="required" 
                placeholder='Title' 
                name='title' 
                value={editMovieData.title} 
                onChange={editForm}>
            </input>
        </td>

        <td>
            <input
                type="number" 
                required="required" 
                placeholder='Year' 
                name='year' 
                value={editMovieData.year} 
                onChange={editForm}>
            </input>
        </td>

        <td>
            <input 
                type="number" 
                required="required" 
                placeholder='Rating' name='rating' 
                min="1" 
                max="10"
                value={editMovieData.rating} 
                onChange={editForm}>
            </input>
        </td>
        <td>
            <button type='submit' id='saveButton'>Save</button>
        </td>
    </tr>
  )
};

export default EditMovieComponent