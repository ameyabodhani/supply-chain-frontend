import { useState } from "react"
import axios from "axios"
import { url } from "../../common/constants"
const AddPart=({vendor, toggle, refresh})=>{
    console.log(vendor)

    const [partId, setId] = useState(0)
    const [partName,setName]=useState('')
    const [partPrice,setPrice]=useState(0)
    const [availableStock,setStock]=useState(0)

    const addPartToDB=()=>{
        const data = new FormData()
        data.append('partId',partId)
        data.append('partName',partName)
        data.append('partPrice',partPrice)
        data.append('availableStock',availableStock)
        data.append('vendorId',vendor.id)

        axios.post(url + '/parts', data).then((response) => {
            const result = response.data
            if (result.status === 'success') {
              alert('successfully added an part')
              // go to the list of artists
              refresh();
            } else {
              alert('error while adding part')
            }
        })
    }
    return (
        <>
        <div className="modal fade" id="AddPart-staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add New Vendor</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-1">
                    <input type="hidden" className="form-control" onChange={(e) => {
                  setId(e.target.value)
                }}/>
                </div>
  
                <div className="mb-1">
                    <label for="part-name" className="col-form-label">Name</label>
                    <input type="text" className="form-control" id="part-name" onChange={(e)=>setName(e.target.value)}/>
                </div>
                
                <div className="mb-1">
                    <label for="part-price" className="col-form-label">Price :</label>
                    <input type="text" className="form-control" id="part-price" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
  
                <div className="mb-1">
                    <label for="available-stock" className="col-form-label">Available Stock :</label>
                    <input type="number" className="form-control" id="available-stock" onChange={(e)=>setStock(e.target.value)}/>
                </div>
  
                </form> 
            </div>
            <div className="modal-footer">
                <button onClick={addPartToDB} type="button" className="btn btn-success" data-bs-dismiss="modal">Add</button>
            </div>
            </div>
        </div>
        </div>
        </>
  
    )   
}

export default AddPart