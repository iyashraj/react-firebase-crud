import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { DB } from './config/firebase';

const AddMovie = ({setOpenPopup, getMovieList}) => {
    type IMovie = {
        title?  : string,
        director? : string,
        releaseDate? : number,
        receivedOscar? : boolean
    }
    const movieCollectionRef = collection(DB,"movies")
    const [addMovie, setAddMovie]  = useState<IMovie>()
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
    const onSubmitMovie = async() => {
        try{
            await addDoc(movieCollectionRef, {
                director: addMovie?.director,
                receivedOscar: addMovie?.receivedOscar ? addMovie?.receivedOscar : false,
                releaseDate: addMovie?.releaseDate,
                title: addMovie?.title
    })
    getMovieList()
    setOpenPopup(false)
        } catch(err) {
            console.log(err)
        }
    }
  return (
    <div className='movie-popup'>
        <div className='inner-popup'>
            <div className='inner-2'>
                <h5>Add Movie</h5>
                <div>Movie : <input onChange={addMovieOnchange} name='title'/></div>
                <div>Director : <input onChange={addMovieOnchange} name='director'/></div>
                <div>Released Date : <input onChange={addMovieOnchange} name='releaseDate'/></div>
                <div>receivedOscar : <input type='checkbox' onChange={addMovieOnchange} name='receivedOscar'/></div>
                <button onClick={()=> setOpenPopup(false)}>Cancel</button>
                <button onClick={onSubmitMovie}>Submit</button>
            </div>
            </div></div>
  )
  }

export default AddMovie