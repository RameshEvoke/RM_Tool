import React, { useState,useEffect} from 'react';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE = 500;
import { FaPen, FaSearch, FaChevronLeft, FaChevronRight,FaChevronDown,FaChevronUp } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const ResourcesManagement = () => {

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm,setSearchTerm] =useState('');
  const [empdata,setEmpData] =useState([]);
  //const [loading, setLoading] = useState(true);

useEffect(()=>{
    fetchData();
  },[]); 


  const fetchData = async () => {
  try {
    const apiUrl = 'https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Resource_Info';
    const response = await axios.get(apiUrl);
    setEmpData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    setTimeout(fetchData, 5000); // Retry after 5 seconds
  }
};


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
    //debugger;

    return employee.emp_Name.toLowerCase().includes(searchTerm.toLowerCase());
  };

   // debugger;

  const filteredEmployees = empdata.filter(filterEmployees);
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredEmployees.length);
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto w-100">
      <div className="mb-4">
      <b className="mr-4">Resources</b>
      <div className="mt-3 mb-2 flex items-center relative justify-content-between">
          <input
            type="text"
            placeholder="Search Resource"
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
            <button className='btn btn-primary py-2 px-3 rounded-0 ml-4'>Add New Resource</button>
          </div>
        </div>

      </div>
      <table id ="test-table" className="w-100 table-auto bg-white overflow-visible mb-4  table-bordered border-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Emp ID
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Emp Name
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Email
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Skill
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Designation
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {currentEmployees.map((employee) => (
            <React.Fragment key={employee.emp_Id}>
              <tr className="cursor-pointer " >
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3" onClick={() => handleRowClick(employee.emp_Id)}>{<FaChevronDown />} {employee.emp_Id}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.emp_Name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.email}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.emp_Skill}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{employee.emp_designation}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-4 py-3">{<FaPen />}</td>
              </tr>
              {selectedEmployeeId === employee.emp_Id && (
                <tr>
                  <td colSpan="6">
                    <div className="min-w-full divide-y divide-gray-200  px-3 py-3 bg-[#F3FBFF]">
                      <table  style={{width: "100%"}} className="table-auto bg-skyblue overflow-visible border ">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              PROJECT NAME
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              START DATE
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              END DATE
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              ALLOCATION %
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              PROJECT MANAGER
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              STATUS
                            </th>
                            <th className="bg-white  text-[#6E7391] text-sm border border-gray-200 text-left px-3 py-3 text-nowrap fw-medium">
                              ROLE
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">

                          {/* Render additional employee information */}
                          

                            <tr key={employee.emp_Id}>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project_StartDate}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project_endDate}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project_Alloc}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project_Manager}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.project_Status}</td>
                              <td className="border border-gray-200 px-4 py-3  text-[#6E7391] text-sm">{employee.additional_Info.emp_Role}</td>
                            </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

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

export default ResourcesManagement;
