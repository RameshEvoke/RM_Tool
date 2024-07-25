import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
const PAGE_SIZE = 3;
import { FaPen, FaSearch, FaChevronLeft, FaChevronRight,FaChevronDown,FaChevronUp } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const WbsTimeReporting = () => {
  
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

useEffect(()=>{
  getAllWbs();
},[]);



const getAllWbs = async () => {
    try {
      //setLoading(true);
      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/get_all_wbs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result);
      //setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };


  
  const employees = [
    {
      account_name: 'CSC',
      project_name: 'Acc1',
      account_owner: 'Pushpa',
      customer_poc: 'Pushpa',
      status: 'in-progress',
      Start_Date: '2020-01-15',
        End_Date: '2020-11-15',
    },
    {
      account_name: 'BMS',
      project_name: 'Acc1',
      account_owner: 'Raju',
      customer_poc: 'Raju',
      status: 'in-progress',
      Start_Date: '2020-01-15',
        End_Date: '2020-11-15',
    },
    {
      account_name: 'CLOPAY',
      project_name: 'Acc1',
      account_owner: 'Venky',
      customer_poc: 'Venky',
      status: 'completed',
      Start_Date: '2020-01-15',
        End_Date: '2020-11-15',
    },
    // Add more employee objects as needed
  ];



const filterData = (status) => {
    if (status === 'all') {
      setData(employees);
    } else {
      const filteredData = employees.filter(item => item.status === status);
      setData(filteredData);
    }
    setActiveTab(status);
    setCurrentPage(0);
  };


  const filteredEmployees = searchTerm ? employees.filter(filterEmployees) : data.length ? data : employees;
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredEmployees.length);
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="" style={{width:'100%'}}>
      <div className="mb-4">
      <div className="mt-3 mb-2 flex items-center relative justify-content-between">
          <input
            type="text"
            placeholder="Search WBS"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-[#DFE2EF] px-8 py-2 pr-8"
          />



<div className="flex justify-center">
      <button
        className={`px-4  ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => filterData('all')}
      >
        All WBS
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => filterData('in-progress')}
      >
        In Progress
      </button>
      <button
        className={`px-4 py-2  ${activeTab === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => filterData('completed')}
      >
        Completed
      </button>
    </div>




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
      <div style={{width:'100%'}} >
      <table style={{width:'100%'}}  id ="test-table" className=" table-auto bg-white mb-4  table-bordered border-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              TASKTR-WBS
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              PROJECT NAME
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              RESOURCE ID
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              START DATE
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              END DATE
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              STATUS
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              GIVEN BY
            </th>
            <th className="bg-[#E8EBF9] text-slategray-100  text-center text-uppercase px-3 py-3 text-nowrap fw-medium text-sm">
              aCTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((wbs) => (
            <React.Fragment key={wbs.WBS_ID}>
              <tr className="cursor-pointer " >
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3" onClick={() => handleRowClick(wbs.WBS_ID)}> {wbs.WBS_ID}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.project_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.emp_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.project_start_date}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.project_end_date}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.project_status_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.emp_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{<FaPen />}</td>
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

export default WbsTimeReporting;
