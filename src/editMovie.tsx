import { collection } from 'firebase/firestore'
import React from 'react'
import { DB } from './config/firebase'
import { useState } from 'react';

const EditMovie = ({editItem, setOpenEditPopup, getMovieList, updateMovieDetails}) => {
    type IMovie = {
        title?  : string,
        director? : string,
        releaseDate? : number,
        receivedOscar? : boolean
    }
    const movieCollectionRef = collection(DB,"movies")
    const [addMovie, setAddMovie]  = useState<IMovie>({
        title  : editItem?.title,
        director : editItem?.director,
        releaseDate : editItem?.releaseDate,
        receivedOscar: editItem?.receivedOscar
    })
    const addMovieOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if(name !== "receivedOscar"){
            setAddMovie({
                ...addMovie,
                [name] : value
            })
        } else {
            setAddMovie({
                ...addMovie,
                [name] : e.target.checked
            })
        }
    }

    
  return (
        <div className='movie-popup'>
            <div className='inner-popup'>
                <div className='inner-2'>
                <h5>Edit Movie</h5>
                    <div>Movie : <input value={addMovie?.title} onChange={addMovieOnchange} name='title'/></div>
                    <div>Director : <input value={addMovie?.director} onChange={addMovieOnchange} name='director'/></div>
                    <div>Released Date : <input value={addMovie?.releaseDate} onChange={addMovieOnchange} name='releaseDate'/></div>
                    <div>receivedOscar : <input checked={addMovie?.receivedOscar} type='checkbox' onChange={addMovieOnchange} name='receivedOscar'/></div>
                    <button onClick={()=> setOpenEditPopup(false)}>Cancel</button>
                    <button onClick={() => updateMovieDetails(addMovie)}>Submit</button>
                </div>
                </div></div>
  )
}

export default EditMovie