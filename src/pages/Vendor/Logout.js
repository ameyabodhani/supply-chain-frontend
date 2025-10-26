import { useHistory } from 'react-router-dom';

const Logout=()=>{
    
    localStorage.removeItem('vendor')
    const history=useHistory()
    return (
        <div>
            <h3>Thank You.</h3>
            <h2>If you want to signin again.....</h2>
           <button  onClick={()=>history.push(`/`, {})} className="btn btn-success">
            Signin
           </button>
        </div>
    )
}

export default Logout