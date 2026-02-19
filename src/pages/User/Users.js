import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../../common/constants'
import UserRow from '../../components/UserRow'
import '../ProductsDetails.css'

const Users = () => {
  // maintain the state
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    axios.get(url + '/user').then((response) => {
      const result = response.data
      if (result) {
        setUsers(result)
        setLoading(false)
      } else {
        alert('Error while loading list of users')
      }
    })
  }

  return (
    <div>
      <h1 className="page-title">Users</h1>
      {loading ? <p>Loading Users...</p> :
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <td>isActive</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return <UserRow user={user} serialNo={index + 1} />
            })}
          </tbody>
        </table>
      }
      <Link to="/add-user">
        <href className="btn btn-success">Add New User</href>
      </Link>
    </div>


  )
}
export default Users 