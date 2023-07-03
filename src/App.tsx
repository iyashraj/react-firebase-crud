import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/auth.jsx'
import { DB, auth } from './config/firebase.js' 
import {getDocs, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { UilEditAlt, UilTrashAlt   } from '@iconscout/react-unicons'
import AddMovie from './addMovie.js'
import EditMovie from './editMovie.js'

function App() {
  type TMovie = {
    director?: string,
    receivedOscar?: boolean,
    releaseDate?: number,
    title? : string
    id?: string
  }
  const [openPopup, setOpenPopup] = useState(false)
  const [openEditPopup, setOpenEditPopup] = useState(false)
  const [movies, setMovies] = useState<TMovie[]>([] as TMovie[])
  const movieCollectionRef = collection(DB,"movies")
  const [editItem, setEditItem] = useState<TMovie>()

  const getMovieList= async() => {
    try{
      const data = await getDocs(movieCollectionRef)
      const filteredData = (data?.docs?.map((doc)=>(
        {...doc?.data(), id: doc?.id}
      )))
      setMovies(filteredData)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    getMovieList()
  }, [])
  const deleteMovie = (id : string) =>{
    try{
      const movieDoc =doc(DB, "movies", id) 
      deleteDoc(movieDoc)
    getMovieList()
    } catch (err) {
      console.log(err)
    }
  }
  const updateMovieDetails = (movieData: TMovie) => {
try{
  const movieDoc =doc(DB, "movies", editItem?.id as string) 
  updateDoc(movieDoc, movieData)
  setEditItem({
  })
  getMovieList()
  setOpenEditPopup(false)
} catch(err){
  console.log(err)
}
  }

  return (
    <div className='App'>
      {openPopup &&<AddMovie setOpenPopup={setOpenPopup} getMovieList={getMovieList}/>}
      {openEditPopup &&<EditMovie setOpenEditPopup={setOpenEditPopup} getMovieList={getMovieList} updateMovieDetails={updateMovieDetails} editItem={editItem}/>}
    <Auth />
    {auth?.currentUser?.email && <h4>{auth?.currentUser?.email}</h4>}
    <button onClick={()=>setOpenPopup(true)}>Add</button>
    {
      movies.map((movie, index)=>{
      return <div className='movie-card' key={index+1}>
        <UilEditAlt className="edit-button" onClick={()=> {
          setOpenEditPopup(true)
          setEditItem(movie)
          }}/>
        <UilTrashAlt className="delete-button" onClick={()=> deleteMovie(movie?.id as string)}/>
        <h3 style={{color: movie?.receivedOscar ? "green" : "red"}}>{movie?.title}</h3>
        <p>Director : {movie?.director}</p>
        <p>Date : {movie?.releaseDate}</p>
   </div> })
    }
 
    </div>
  )
}

export default App
