import { useState } from 'react'
import {auth, googleAuthProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
const Auth = () => {
  type TAuth = {
    email : string,
    password: string
  }
  const [userAuth, setUserAuth] = useState<TAuth>({
    email: "",
    password: ""
  })

  const signInHandler = async () => {
    try{
      await createUserWithEmailAndPassword(auth, userAuth.email, userAuth.password)
      console.log("Submitted")
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }
  const signinWithGoogle = async() => {
    try{
      await signInWithPopup(auth, googleAuthProvider)
      console.log("Submitted")
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }
  const signoutHandler = async() => {
    try{
      await signOut(auth)
      console.log("Submitted")
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUserAuth({...userAuth, [name]: value})
  }
  return (
    <div>
      <input onChange={onChangeHandler} placeholder="email" name='email'/>
      <input onChange={onChangeHandler} name="password" placeholder="password"/>
      <button onClick={signInHandler}>Sign In</button>
      <button onClick={signinWithGoogle}>Continue with Google</button>
      <button onClick={signoutHandler}>Sign Out</button>
    </div>
  )
}

export default Auth