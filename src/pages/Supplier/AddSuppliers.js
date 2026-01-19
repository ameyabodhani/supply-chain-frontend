import axios from 'axios'
import { useState } from 'react'
import { url } from '../../common/constants'
import './AddSuppliers.css'

const AddSuppliers = ({ refresh, setMessage }) => {
  const [sName, setSName] = useState('')
  const [sAddress, setSAddress] = useState('')
  const [sPhone, setSPhone] = useState('')
  const [sEmail, setSEmail] = useState('')
  const [error, setError] = useState('')

  const validateForm = () => {
    setError('')

    if (!sName.trim()) {
      setError('Supplier name is required')
      return false
    }
    if (!sAddress.trim()) {
      setError('Address is required')
      return false
    }
    if (!sPhone.trim()) {
      setError('Phone number is required')
      return false
    }
    if (!/^\d{10}$/.test(sPhone)) {
      setError('Phone number must be 10 digits')
      return false
    }
    if (!sEmail.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail)) {
      setError('Please enter a valid email')
      return false
    }
    return true
  }

  const handleAddSupplier = () => {
    if (!validateForm()) {
      return
    }

    const data = {
      sName: sName.trim(),
      sAddress: sAddress.trim(),
      sPhone: sPhone.trim(),
      sEmail: sEmail.trim()
    }

    axios.post(url + '/supplier', data)
      .then((response) => {
        const result = response.data
        if (result.status === 'success') {
          setMessage('Successfully added supplier')
          refresh()
          // Clear form
          setSName('')
          setSAddress('')
          setSPhone('')
          setSEmail('')
          setError('')
          // Close modal
          document.getElementById("addSupplierModalClose").click()
        } else {
          setMessage('Error adding supplier')
        }
      })
      .catch((error) => {
        console.error('Error adding supplier:', error)
        setMessage('Error adding supplier')
      })
  }

  return (
    <div>
      <div 
        className="modal fade" 
        id="AddSupplier" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="AddSupplierLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddSupplierLabel">
                Add New Supplier
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
                <div className="mb-3">
                  <label htmlFor="supplierName" className="form-label">
                    Supplier Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="supplierName" 
                    placeholder="Enter supplier name"
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="supplierAddress" className="form-label">
                    Address
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="supplierAddress" 
                    placeholder="Enter address"
                    value={sAddress}
                    onChange={(e) => setSAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="supplierPhone" className="form-label">
                    Phone
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="supplierPhone" 
                    placeholder="Enter 10-digit phone number"
                    value={sPhone}
                    onChange={(e) => setSPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="supplierEmail" className="form-label">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="supplierEmail" 
                    placeholder="Enter email address"
                    value={sEmail}
                    onChange={(e) => setSEmail(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button 
                id="addSupplierModalClose"
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
                onClick={handleAddSupplier}
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSuppliers