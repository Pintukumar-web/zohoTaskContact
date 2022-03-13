import { useContext } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import FirebaseContext from "./context/firebase"
import useAuthListener from "./utils/useAuth"
import gSvg from "./assets/search.png"

const Signin=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)

    const {user}=useAuthListener()
    const {firebaseApp,provider} =useContext(FirebaseContext)

    const handleSubmit=(e)=>{
    setLoading(true)
    e.preventDefault()
    if(password.length>0 && email.lenght>0){
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            setLoading(false)
          console.log(userCredential)
        })
        .catch((err) => {
        setLoading(false)
          setError('Something went wrong please try again!')
          console.log(err)
        });
    }else{
        setLoading(false)
        setError("Enter valid password, Try Again")
        setPassword('')
        setEmail('')
    }
    }

const handleGoogleAuth=()=>{
setError('')
  firebaseApp.auth()
  .signInWithPopup(provider)
  .then((result) => {
    
  console.log(result)
    // ...
  }).catch((error) => {
    setError('Something went wrong please try again')
    console.log(error)
  });
    }

    const history=useHistory()
    useEffect(()=>{
      if(user){
    history.push('/')
      }
    },[user])

    return <div>
        <div className="signInCard">
        <h2>Signin</h2>
        <form onSubmit={handleSubmit}>
        <input type="email" required placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" minLength={6} maxLength={10} placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button disabled={loading} className={loading ? 'disabled':''} type="submit">{loading ? 'Loading..':'Signin'}</button>
        {error && <p className="error">{error}</p> }
        </form>
        <p className="create">Create an Account <Link to='/signup'>Signup</Link></p>
       
        <div className="googleAuth">
            <p onClick={handleGoogleAuth}><span>Sign In with</span> <img src={gSvg} alt="Google Image"/> google</p>
        </div> </div>
     
        
        

    </div>
}

export default Signin