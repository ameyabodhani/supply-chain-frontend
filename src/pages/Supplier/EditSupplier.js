import axios from "axios"
import { useState, useEffect } from "react"
import { url } from '../../common/constants'

function SupplierEdit({ supplier, refresh, setMessage, setMessageId }) {
  const [editName, setEditName] = useState("")
  const [editAddress, setEditAddress] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editEmail, setEditEmail] = useState("")

  // Load supplier data when supplier changes
  useEffect(() => {
    if (supplier) {
      setEditName(supplier.sName || "")
      setEditAddress(supplier.sAddress || "")
      setEditPhone(supplier.sPhone || "")
      setEditEmail(supplier.sEmail || "")
    }
  }, [supplier])

  // Don't render if no supplier selected
  if (!supplier) {
    return null
  }

  const handleSave = () => {
    const data = {
      sName: editName,
      sAddress: editAddress,
      sPhone: editPhone,
      sEmail: editEmail
    }

    axios.put(url + "/supplier/" + supplier.id, data)
      .then((response) => {
        const result = response.data
        if (result.status === "success") {
          setMessage("Successfully updated supplier")
          refresh()
          // Close modal
          document.getElementById("editModalClose").click()
        }
      })
      .catch((error) => {
        console.error("Error updating supplier:", error)
        setMessage("Error updating supplier")
      })
  }

  return (
    <>
      <div 
        className="modal fade" 
        id="EditSupplier" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabIndex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Supplier
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="id" className="col-form-label">
                    Supplier ID
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="id" 
                    value={supplier.id}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="supplier-name" className="col-form-label">
                    Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="supplier-name"
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="col-form-label">
                    Address
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address"
                    value={editAddress} 
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="col-form-label">
                    Phone
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phone"
                    value={editPhone} 
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button 
                id="editModalClose"
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                style={{ display: "none" }}
              />
              <button 
                onClick={handleSave}
                type="button" 
                className="btn btn-success"
              >
                Save
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupplierEdit