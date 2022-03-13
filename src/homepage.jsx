import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import FirebaseContext from "./context/firebase"
import useAuthListener from "./utils/useAuth"

const HomePage=()=>{
 const {user}=useAuthListener()
 const uid=user?.uid
const {db,FieldValue}=useContext(FirebaseContext)
console.log(FieldValue);
  const [contactData,setContactData]=useState({
     name:'',
     phno:'',
     email:''
  })

  const [data,setData]=useState([])
  const [loadingC,setLoadingC]=useState(false)

  const handleChange=(e)=>{
     const {name,value}=e.target
     setContactData(prev=>({
        ...prev,
        [name]:value
     }
   ))
  }

const createData=(e)=>{
   setLoadingC(true)
   e.preventDefault()
   const {name,phno,email}=contactData
   console.log(name,phno,email,uid)
   db.collection('contacts').doc(uid).set({
data:FieldValue.arrayUnion({name,phno,email})
   },{merge:true}).then(()=>{
      setLoadingC(false)
      fetchData()
      setContactData({
     name:'',
     phno:'',
     email:''
      })
   }).catch(err=>{
      setContactData({
         name:'',
     phno:'',
     email:''
      })
      setLoadingC(false)
      console.log(err)
   })

}

const fetchData=()=>{
db.collection('contacts').doc(uid).get().then(data=>{
   if(data.exists){
      setData(data.data().data)
   }else{
      return
   }
}).catch(err=>{
   console.log(err)
})
}

 useEffect(()=>{
    fetchData()
 },[])


   return <div className="home">
      <h2>Create Contacts</h2>
      <form onSubmit={createData}>
         <input type="text" required placeholder="Enter Name" name="name" value={contactData.name}  onChange={handleChange}/>
         <input type="text" required placeholder="Enter Phone Number" name="phno" value={contactData.phno}  onChange={handleChange}/>
         <input type="email" required placeholder="Enter Email" name="email" value={contactData.email} onChange={handleChange} />
         <button type="submit"> {loadingC ? "loading..":'Save Contact'} </button>
      </form>
      
      {data.length>0 && (
         <>
         <hr />
         <h2>My Contacts</h2>
         <div className="horizontalScroll">

         
   <table>
      <thead>
     <tr>
        <th>Name</th>
        <th>Phone No</th>
        <th>Email</th>
     </tr>
     </thead>
<tbody>
   {data.map((item,i)=>(
      <tr key={i}>
         <td>{item.name}</td>
         <td>{item.phno}</td>
         <td>{item.email}</td>
      </tr>
   ))
}
</tbody>
    </table>
    </div>
    </>
      ) }
   </div>
}

export default HomePage