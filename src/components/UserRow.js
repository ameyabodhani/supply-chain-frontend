import { useHistory } from 'react-router-dom'

const UserRow = ({ user }) => {

  const history=useHistory()
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.role}</td>
      <td>{user.isActive}</td>
      <td><button
          onClick={() => {
            history.push(`/edit-profile/${user.id}`, { user: user})
          }}
          className="btn btn-success btn-sm">
          Edit 
        </button>
        <button
          onClick={() => {
            // /add-songs-to-album -> path of the component
            // {album: album}      -> data needed to be passed to the component
            history.push(`/delete-profile/${user.id}`, { user: user})
          }}
          className="btn btn-danger btn-sm">
          Delete 
        </button></td>
    </tr>
  )
}

export default UserRow