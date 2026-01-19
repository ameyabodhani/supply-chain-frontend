import axios from 'axios'
import { useState } from 'react'
import { url } from '../../common/constants'
import './AddClient.css'

const AddClient = ({ refresh, setMessage }) => {
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientGstno, setClientGstno] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')

  const validateForm = () => {
    setError('')

    if (!clientName.trim()) {
      setError('Client name is required')
      return false
    }
    if (!clientAddress.trim()) {
      setError('Address is required')
      return false
    }
    if (!clientGstno.trim()) {
      setError('GST number is required')
      return false
    }
    // Relaxed GST validation - just check length
    if (clientGstno.trim().length < 10) {
      setError('GST number must be at least 10 characters')
      return false
    }
    if (!clientPhone.trim()) {
      setError('Phone number is required')
      return false
    }
    if (!/^\d{10}$/.test(clientPhone)) {
      setError('Phone number must be 10 digits')
      return false
    }
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return false
    }
    if (!pincode.trim()) {
      setError('Pincode is required')
      return false
    }
    if (!/^\d{6}$/.test(pincode)) {
      setError('Pincode must be 6 digits')
      return false
    }
    if (!state.trim()) {
      setError('State is required')
      return false
    }
    return true
  }

  const handleAddClient = () => {
    if (!validateForm()) {
      return
    }

    const data = {
      clientName: clientName.trim(),
      clientAddress: clientAddress.trim(),
      clientGstno: clientGstno.trim().toUpperCase(),
      clientPhone: clientPhone.trim(),
      email: email.trim(),
      pincode: pincode.trim(),
      state: state.trim()
    }

    axios.post(url + '/clients', data)
      .then((response) => {
        console.log('Add client response:', response.data)
        const result = response.data

        // Check multiple possible success indicators
        if (result.status === 'success' || result === 'success' || response.status === 200) {
          setMessage('Successfully added client')
          // Clear form first
          setClientName('')
          setClientAddress('')
          setClientGstno('')
          setClientPhone('')
          setEmail('')
          setPincode('')
          setState('')
          setError('')
          // Close modal
          document.getElementById("addClientModalClose").click()
          // Refresh the list after a short delay to ensure backend has processed
          setTimeout(() => {
            refresh()
          }, 100)
        } else {
          console.error('Unexpected response format:', result)
          setMessage('Error adding client')
        }
      })
      .catch((error) => {
        console.error('Error adding client:', error)
        setError('Error adding client: ' + (error.response?.data?.message || error.message))
      })
  }

  return (
    <div>
      <div
        className="modal fade"
        id="AddClient"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="AddClientLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddClientLabel">
                Add New Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientName" className="form-label">
                      Client Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientName"
                      placeholder="Enter client name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientEmail" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="clientEmail"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="clientAddress" className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientAddress"
                    placeholder="Enter address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientGstno" className="form-label">
                      GST Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientGstno"
                      placeholder="27AABCU9603R1ZX"
                      value={clientGstno}
                      onChange={(e) => setClientGstno(e.target.value.toUpperCase())}
                      maxLength="15"
                      required
                    />
                    <small className="form-text text-muted">
                      15-character GST number
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientPhone" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientPhone"
                      placeholder="Enter 10-digit phone number"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientPincode" className="form-label">
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientPincode"
                      placeholder="Enter 6-digit pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength="6"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="clientState" className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientState"
                      placeholder="Enter state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                id="addClientModalClose"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddClient}
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddClient
