import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../../common/constants'
import UserRow from '../../components/UserRow'
import '../ProductsDetails.css'

const Users = () => {
    // maintain the state
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log(`User component got loaded`)
        getUsers()
      }, [])

      const getUsers = () => {
        axios.get(url + '/user').then((response) => {
          const result = response.data
          if (result) {
            console.log(result)
            setUsers(result)  
          } else {
            alert('error while loading list of User')
          }
        })
      }
return (
    <div>
      <h1 className="page-title">Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <td>isActive</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UserRow user={user} />
          })}
        </tbody>
      </table>
      <Link to="/add-user">
        <href className="btn btn-success">Add New User</href>
      </Link>
    </div>

    
  )
}
export default Users 