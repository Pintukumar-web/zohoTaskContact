import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import FirebaseContext from "./context/firebase"
import useAuthListener from "./utils/useAuth"

const Signup=()=>{
const [email,setEmail]=useState('')
    const [password1,setPassword1]=useState('')
    const [password2,setPassword2]=useState('')
  const [success,setSuccess]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)

  const {firebaseApp}=useContext(FirebaseContext)
  const {user}=useAuthListener()

  const history=useHistory()
useEffect(()=>{
  if(user){
history.push('/')
  }
},[user])

const handleSubmit=(e)=>{
e.preventDefault()
setLoading(true)
if(email.length>0 && password1.length>0 && password2.length>0 ){
  if(password1===password2){
   console.log(email)
   setError('')
   setLoading(false)
   firebaseApp.auth().createUserWithEmailAndPassword(email, password1)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
   setError('Something went wrong')
   setLoading(false)
  setEmail('')
  setPassword1('')
  setPassword2('')
 
  });


   setSuccess("Successfully Registered")
  }else{
    setLoading(false)
    setError('Password did not match')
    setPassword1('')
    setPassword2('')
  }
}else{
  setError('Enter Your Details Correctly')
  setLoading(false)
  setEmail('')
  setPassword1('')
  setPassword2('')
  setSuccess('')
}
}

    return <div>
        <div className="signInCard">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
        <input type="email" required placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" minLength={6} maxLength={10} placeholder="Enter Your Password" value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
        <input type="password" minLength={6} maxLength={10} placeholder="Confirm Your Password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
        <button disabled={loading} className={loading ? 'disabled':''} type="submit">{loading ? 'Loading..':'Signup'}</button>
        {error && <p className="error">{error}</p> }
        {success && <p className="success">{success}</p> }
        </form>
        <p className="create">Have an Account <Link to='/signin'>SignIn</Link></p>
        </div>
        
        

    </div>
}

export default Signup