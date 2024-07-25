import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE = 3;
import { FaPen, FaSearch, FaChevronLeft, FaChevronRight,FaChevronDown,FaChevronUp } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Expenses = () => {
  
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // for accountName
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm,setSearchTerm] =useState('');
  const [activeTab,setActiveTab] =useState('all');
  const [data,setData] =useState([]);

  const handleRowClick = (emplId) => {
    setSelectedEmployeeId(emplId === selectedEmployeeId ? null : emplId);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterEmployees = (employee) => {
    return employee.account_name.toLowerCase().includes(searchTerm.toLowerCase());
  };


  
  const employees = [
    {
      resource: 'CSC',
      id: '121',
      account_owner: 'Pushpa',
      customer_poc: 'Pushpa',
      status: 'in-progress',
      technologies:'Node',
    },
    {
      account_name: 'BMS',
      id: '122',
      account_owner: 'Raju',
      customer_poc: 'Raju',
      status: 'in-progress',
      technologies:'Node',
    },
    {
      account_name: 'CLOPAY',
      id: '123',
      account_owner: 'Venky',
      customer_poc: 'Venky',
      status: 'completed',
      technologies:'Node',
    },
    // Add more employee objects as needed
  ];



  const filteredEmployees = searchTerm ? employees.filter(filterEmployees) : data.length ? data : employees;
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredEmployees.length);
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="" style={{width:'100%'}}>
      
      <div style={{width:'100%',paddingTop: '26px'}} >
      <table style={{width:'100%'}}  id ="test-table" className=" table-auto bg-white mb-4  table-bordered border-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Expenses Category
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Date
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Amount
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Description
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Status
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
              Invoice No
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          
            <React.Fragment >
              <tr className="cursor-pointer " >
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3" onClick={() => handleRowClick(employee.account_name)}> {"Client Meeting"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"20-Aug-2024"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"20"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"Internal Meeting"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"Approved"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"Inv-0010"}</td>
     
              </tr>
              
            </React.Fragment>
          
        </tbody>
      </table>
      </div>

      <div className="flex justify-end mt-4">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
          breakLabel="..."
          breakClassName="break-me"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Expenses;
