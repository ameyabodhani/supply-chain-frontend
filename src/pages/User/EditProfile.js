import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory ,useLocation} from 'react-router-dom'
import validator from 'validator'


const EditProfile=()=>{
    const[id,setId]=useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [role, setRole]=useState('User')
    const [isActive, setActive]=useState(1)
    const [createdTimeStamp, setCreatedTimeStamp]=useState()

    const location = useLocation()

    const history = useHistory()

    const user = location.state.user

    const AddEditedToDB =(id) => {
        console.log(id)
        if(name.length === 0) {
          alert('select first name')
        } else if (email.length === 0) {
          alert('select email')
        }else if(!validator.isEmail(email)){
          alert('please enter correct email with @ and gmail.com')
        }else if (password.length === 0) {
          alert('select password')
        }else if(!validator.isStrongPassword(password, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })){
          alert("Enter strong password with min length 8, lowercase 1 uppercase 1 symbol 1 number 1 ")
        }
        else if(role.length === 0){
          alert('Enter role')
        }
        else {
          //when a file needs to be uploaded use FormData
          const data={
          id: user.id,
          name:name,
          email:email,
          password:password,
          role:role,
          isActive:isActive,
          createdTimeStamp:createdTimeStamp
    
          }
    
          // send the data to the API
          axios.put(`http://localhost:8080/user/update/${id}`, data).then((response) => {
              alert('Edited Successfully')
              
              history.push('/users')
     
          })
        }
      }
    return (
       
      
       
       <div>
          <h1 className="page-title">Edit user</h1>
    
          <div className="mb-3">
            <input
              onChange={(e) => {
                setId(e.target.value)
              }}
              type="hidden"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Name</label>
            <input
              
              onChange={(e) => {
                setName(e.target.value)
              }}
              type="text"
              defaultValue={user.name}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              defaultValue={user.email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="form-control"
            />
          </div>
    
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input
              
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="form-control"
            />
          </div>

        

          <div className="mb-3">
            <div>
            <input
              onChange={(e) => {
                setRole(e.target.value)
              }}
              type="hidden"
              className="form-control"
            />
          </div>
         </div>
              
          <div className="mb-3">
            <input
              onChange={(e) => {
                setActive(e.target.value)
              }}
              type="hidden"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => {
                setCreatedTimeStamp(e.target.value)
              }}
              type="hidden"
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <button onClick={()=>{
               AddEditedToDB(user.id) 
            }} className="btn btn-success">
              Save
            </button>
            
            
            <Link to="/users">
              <href className="btn btn-warning">Back</href>
            </Link>
          </div>
         
        </div>
      )
}

export default EditProfile