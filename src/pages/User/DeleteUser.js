import './User.css'
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'
const DeleteUser=()=>{
    const location = useLocation()

    const history = useHistory()

    const user = location.state.user
    
    
    const deleteFromTheDB=(id)=>{
        const data={
            id:user.id
        }
        axios.delete(`http://localhost:8080/user/${id}`, data).then((response) => {
              alert('Deleted Successfully')
              history.push('/users')
          })
    }
    return(
        <div className="user">
            <p>Do you really want to this user ???</p>
            <div className="mb-3">
            <button onClick={()=>{
               deleteFromTheDB(user.id) 
            }} className="btn btn-danger">
              Yes
            </button>
            
            
            <Link to="/users">
              <href className="btn btn-warning">Back</href>
            </Link>
          </div>
        </div>
    )
}

export default DeleteUser

