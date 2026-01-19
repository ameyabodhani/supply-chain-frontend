import axios from "axios"
import { url } from '../../common/constants'

function SupplierDelete({ supplier, refresh, setMessage, setMessageId }) {
  
  // Don't render if no supplier selected
  if (!supplier) {
    return null
  }

  const handleDelete = () => {
    axios.delete(url + "/supplier/" + supplier.id)
      .then((response) => {
        const result = response.data
        if (result.status === "success") {
          setMessage("Successfully deleted supplier")
          refresh()
          // Close modal
          document.getElementById("deleteModalClose").click()
        }
      })
      .catch((error) => {
        console.error("Error deleting supplier:", error)
        setMessage("Error deleting supplier")
      })
  }

  return (
    <>
      <div 
        className="modal fade" 
        id="DeleteSupplier" 
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
                Delete Supplier
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to delete supplier <strong>{supplier.sName}</strong>?
              </p>
              <p style={{ color: "red", fontSize: "12px" }}>
                This action cannot be undone.
              </p>
            </div>

            <div className="modal-footer">
              <button 
                id="deleteModalClose"
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
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupplierDelete