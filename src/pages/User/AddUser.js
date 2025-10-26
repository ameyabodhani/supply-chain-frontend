import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import validator from 'validator'
import { url } from '../../common/constants'

const AddUser=()=>{
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [role, setRole]=useState('User')
    const [isActive, setActive]=useState(1)
    const [createdTimeStamp, setCreatedTimeStamp]=useState(Date)

    const history = useHistory()

    const addUserToDB = () => {
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
          // when a file needs to be uploaded use FormData
          const data = new FormData()
    
          // add the data
          data.append('id',id)
          data.append('name',name)
          data.append('email',email)
          data.append('password',password)
          data.append('role',role)
          data.append('isActive',isActive)
          data.append('createdTimeStamp',createdTimeStamp)
          
    
          // send the data to the API
          axios.post(url + '/user', data).then((response) => {
            const result = response.data
            if (result.status === 'success') {
              alert('successfully added an user')
              // go to the list of artists
              history.push('/users')
            } else {
              alert('error while adding user')
            }
          })
        }
      }
    return (
       
      
       
       <div>
          <h1 className="page-title">Add User</h1>
    
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
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="form-control"
            />
          </div>
    
          <div className="mb-3">
            <label htmlFor="">Passoword</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="form-control"
            />
          </div>

        

          <div className="mb-3">
            <input
              onChange={(e) => {
                setRole(e.target.value)
              }}
              type="hidden"
              className="form-control"
            />
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
            <button onClick={addUserToDB} className="btn btn-success">
              Save
            </button>
    
            <Link to="/users">
              <href className="btn btn-warning">Back</href>
            </Link>
          </div>
         
        </div>
      )
}

export default AddUser