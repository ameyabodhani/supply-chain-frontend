import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { url } from "../../common/constants"
import './AddClients.css'



const AddClients = () => {
  console.log('AddClients component (from Client/AddClients.js) is rendering')
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientGstno, setClientGstno] = useState('')
  const [email, setEmail] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [pincodeError, setPincodeError] = useState('')
  const history = useHistory()

  const addClientsToDB = () => {
    if (clientName.length === 0) {
      alert('Enter name ')
    } else
      if (clientAddress.length === 0) {
        alert('Enter address')
      }
      else if (clientPhone.length === 0) {
        alert('Enter phone no')
      }
      else if (email.length === 0) {
        alert('Enter email')
      } else {
        const data = new FormData()
        data.append('clientName', clientName)
        data.append('clientAddress', clientAddress)
        data.append('clientPhone', clientPhone)
        data.append('clientGstno', clientGstno)
        data.append('email', email)
        data.append('pincode', pincode)
        data.append('state', state)
        axios.post(url + '/clients', data).then((response) => {
          const result = response.data
          if (result.status === 'success') {
            alert('Successfully added clients')
            history.push('/clients')
          } else {
            console.log(response.data);
            alert('error while adding clients')
          }
        })
      }
  }

  const validateEmail = (value) => {
    setEmail(value)
    if (value.length === 0) {
      setEmailError('')
    } else if (!value.includes('@') || !value.includes('.')) {
      setEmailError('Enter Correct Email');
    } else {
      setEmailError('')
    }
  }

  const validatePhone = (value) => {
    setClientPhone(value)
    if (value.length === 0) {
      setPhoneError('')
    } else if (isNaN(value)) {
      setPhoneError('Enter only numericals for phone number.')
    } else if (value.length !== 10) {
      setPhoneError('Please enter correct phone no.')
    } else {
      setPhoneError('')
    }
  }

  const validatePinCode = (value) => {
    setPincode(value)
    if (value.length === 0) {
      setPincodeError('')
    } else if (isNaN(value)) {
      setPincodeError('Pincode must be of numericals')
    } else if (value.length < 6 || value.length > 6) {
      setPincodeError('Pincode must be of 6 digits')
    } else {
      setPincodeError('')
    }
  }

  return (
    <div>
      <>
        <div className="modal fade" id="AddClient" tabindex="-1" role="dialog" aria-labelledby="AddClient" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AddClientTitle">Add Client</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      onChange={(e) => setClientName(e.target.value)}
                      value={clientName}
                      autoComplete="off"
                      style={{ color: '#495057', fontFamily: 'Roboto, sans-serif', backgroundColor: '#fff' }}
                      required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                      onChange={(e) => setClientAddress(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Phone</label>
                    <input type="text" className="form-control" id="Phone" placeholder=""
                      onChange={(e) => validatePhone(e.target.value)} required />
                    {phoneError && <small style={{ color: 'red' }}>{phoneError}</small>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="gst">GstNo</label>
                    <input type="text" className="form-control" id="gst" placeholder=""
                      onChange={(e) => setClientGstno(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="Email" placeholder=""
                      onChange={(e) => validateEmail(e.target.value)} required />
                    {emailError && <small style={{ color: 'red' }}>{emailError}</small>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" className="form-control" id="Pincode" placeholder=""
                      onChange={(e) => validatePinCode(e.target.value)} required />
                    {pincodeError && <small style={{ color: 'red' }}>{pincodeError}</small>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" placeholder=""
                      onChange={(e) => setState(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={addClientsToDB}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div >
  )
































  /*return (
      <div>
        <h1 className="page-title">Add Clients</h1>
  
        <div className="mb-3">
          <label htmlFor=""> Name</label>
          <input
            onChange={(e) => {
              setClientName(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Address</label>
          <input
            onChange={(e) => {
              setClientAddress(e.target.value)
            }}
            type="text"
            className="form-control"
          />
           <div className="mb-3">
          <label htmlFor="">Phone no</label>
          <input
            onChange={(e) => {
            setClientPhone(e.target.value)
            }}
            type="number"
            className="form-control"
          />
        </div>
        </div>
        <div className="mb-3">
          <label htmlFor="">Gstno</label>
          <input
            onChange={(e) => {
              setClientGstno(e.target.value)
            }}
            type="number"
            className="form-control"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => {
              setClientEmail(e.target.value)
            }}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Pincode</label>
          <input
            onChange={(e) => {
              setPincode(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">state</label>
          <input
            onChange={(e) => {
              setState(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
  
        <div>
        <div className="mb-3">
          <button onClick={addClientsToDB} className="btn btn-success">
            Add
          </button>
          </div>
          <Link to="/clients">
            <a className="btn btn-warning">Back</a>
          </Link>
        </div>
      </div>
    )*/
}



export default AddClients
