import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE = 3;
import { FaPen, FaSearch, FaChevronLeft, FaChevronRight,FaChevronDown,FaChevronUp } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProjectPlanningManagement = () => {
  
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
      account_name: 'CSC',
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
      <div className="mb-4">
      <b className="mr-4">All Project Plans</b>
      <div className="mt-3 mb-2 flex items-center relative justify-content-between">
          <input
            type="text"
            placeholder="Search Project Plans"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-[#DFE2EF] px-8 py-2 pr-8"
          />




          <div className=''>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="border-[#DFE2EF] btn btn-outline-primary py-2 px-3 rounded-0"
              table="test-table"
              filename="employees"
              sheet="employees"
              buttonText="Export to Excel"
            />
            <button className='btn btn-primary py-2 px-3 rounded-0 ml-4'>Add New Plan</button>
          </div>
        </div>

      </div>
      <div style={{width:'100%'}} >
      <table style={{width:'100%'}}  id ="test-table" className=" table-auto bg-white mb-4  table-bordered border-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              PROJECT NAME
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              PROJECT ID
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              ACCOUNT
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              CREATED BY
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              TECHNOLOGIES
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentEmployees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr className="cursor-pointer " >
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3" onClick={() => handleRowClick(employee.account_name)}> {employee.account_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.id}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.account_owner}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.customer_poc}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.technologies}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{<FaPen />}</td>
              </tr>
              
            </React.Fragment>
          ))}
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

export default ProjectPlanningManagement;
