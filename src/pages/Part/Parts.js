import ReactPaginate from 'react-paginate'
import { useState } from 'react'
import { url } from '../../common/constants';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Parts = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  const { data: partsResponse, loading, error } = useFetch(url + '/parts')
  const parts = partsResponse?.data || []

  const filteredParts = parts.filter((part) =>
    part.partName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const PartRow = filteredParts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((part) => {
      return (
        <tr>
          <td>{part.partId}</td>
          <td>{part.partName}</td>
          <td>{part.partPrice}</td>
          <td>{part.availableStock}</td>
        </tr>
      );
    });

  const pageCount = Math.ceil(filteredParts.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h4>All Parts</h4>
        <input type="text"
          placeholder="Search by part name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)
          }
        />
      </div>
      <div className="page-table-div">
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : loading ? (
          <p>Parts are loading...</p>
        ) : parts.length === 0 ? (
          <p>No Parts Found</p>
        ) : (
          <>
            <table id="page-table" className="table table-striped table-sm" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th className="th-sm id">Id</th>
                  <th className="th-sm">Name</th>
                  <th className="th-sm">Price</th>
                  <th className="th-sm">AvailableStocks</th>
                </tr>
              </thead>
              <tbody>
                {PartRow}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </>
        )}
      </div>
      <Link to="/vendors">
        <div className="page-button-div">
          <button className="btn btn-danger">Back</button>
        </div>
      </Link>
      <Link to="/orders">
        <div className="page-button-div">
          <button className="btn btn-success">View Order</button>
        </div>
      </Link>
    </div>
  )
}

export default Parts