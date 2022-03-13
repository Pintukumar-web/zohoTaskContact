import { Route } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { Switch } from "react-router-dom"
import FirebaseContext from "./context/firebase"
import HomePage from "./homepage"
import Signin from "./signin"
import Signup from "./signup"
import { firebaseApp } from "./lib/firebase"
import ProtectedRoute from "./utils/protected.route"
import useAuthListener from "./utils/useAuth"
import { useContext } from "react"

const App=()=>{
  const {user}=useAuthListener()
const {firebaseApp}=useContext(FirebaseContext)
  const handleSignout=()=>{
firebaseApp.auth().signOut().then(()=>{
  console.log('Succefully Signout');
}).catch(err=>
  console.log("Error from signout",err)
  )
  }
  return <div>
    <nav>
      <div className="wrapper">
    <h1 className="mainHeader">Contact App</h1>
  <div className="linkWrapper">
    <NavLink className='option' exact activeClassName="active" to='/'>Home</NavLink>
    {user? <button onClick={handleSignout} className="option">Logout</button>:     <NavLink className='option' activeClassName="active" to='/signin'>SignIn</NavLink>}
  </div>
  </div>
    </nav>
  <div className="wrapper">
  <Switch>
          <ProtectedRoute exact path='/' user={user}>
            <HomePage/>
          </ProtectedRoute>
          <Route exact path='/signin'>
            <Signin/>
          </Route>
          <Route exact path='/signup'>
            <Signup/>
          </Route>
  </Switch>
  </div>
  </div>
  
}


export default App