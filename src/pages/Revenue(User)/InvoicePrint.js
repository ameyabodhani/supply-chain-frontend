import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import PdfRecord from './PdfRecord';



function InvoicePrint({suppliedOrder}) {
    const componentRef = useRef();
    return (
        <>
            <div className="modal fade " id="Pdf_staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Invoice</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                   
                <PdfRecord suppliedOrder ={suppliedOrder}ref={componentRef}/>
                </div>
                <div className="modal-footer">
                <ReactToPrint
                    trigger={() => <button type="button" className="btn btn-success" data-bs-dismiss="modal">Generate Invoice</button>}
                    content={() => componentRef.current}
                /> 
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default InvoicePrint
