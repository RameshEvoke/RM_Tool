import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FaPen, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { NavLink, Link,useParams } from "react-router-dom";
import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS configured in your project
import { Box, Typography, CircularProgress } from "@mui/material";

import { emp_id } from '../../Utiles';

const PAGE_SIZE = 3;

const ProjectOverview = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [data, setData] = useState([]);
  const [projectData,setProjectData] =useState([]);

  let { project_code } = useParams();
  //debugger;

  if (!project_code) {
    project_code = "";
  }

 /* const handleRowClick = (emplId) => {
    setSelectedEmployeeId(emplId === selectedEmployeeId ? null : emplId);
  };*/

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  /*const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };*/

  /*const filterEmployees = (employee) => {
    return employee.account_name.toLowerCase().includes(searchTerm.toLowerCase());
  };
*/
  useEffect(() => {
    getProjectDetailsByCode();
    getAllWbs();
    const id = emp_id();
    console.log('idsss', id);
  }, []);
//debugger;

  const getAllWbs = async () => {
    try {
      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/projects/projects_based_wbs_id?project_id=${project_code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("error", error);
    }
  };


const getProjectDetailsByCode = async () => {
    try {
      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/projects/get_project_new_temp_wbs
?project_id=${project_code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setProjectData(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  /*const employees = [
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
*/
  /*const filterData = (status) => {
    if (status === 'all') {
      setData(employees);
    } else {
      const filteredData = employees.filter(item => item.status === status);
      setData(filteredData);
    }
    setActiveTab(status);
    setCurrentPage(0);
  };
*/
  /*const filteredEmployees = searchTerm ? employees.filter(filterEmployees) : data.length ? data : employees;
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredEmployees.length);
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);
*/
  return (
    <div className="pt-4 flex flex-wrap">
    <div className="w-full md:w-2/3 pr-4 mb-4">
      <div className="mb-4">
        <div className="mt-1 mb-2 flex items-center justify-between">
          
             <form className="flex flex-wrap gap-4 rounded-md justify-space overview-div">
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Project Name</label>
              <span>{projectData?.[0]?.project_name || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Account Name</label>
              <span>{projectData?.[0]?.account_name || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Project Status</label>
              <span>{projectData?.[0]?.project_status || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Project Manager</label>
              <span>{projectData?.[0]?.project_delivery_manager || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Start Date</label>
              <span>{projectData?.[0]?.project_start_date || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">End Date</label>
              <span>{projectData?.[0]?.project_end_date || "***"}</span>
            </div>
            <div className="flex flex-col w-3/3">
              <label className="text-sm font-semibold">Estimation To Complete</label>
              <span>{ "***"}</span>
            </div>
          </form>
        </div>

      </div>
<div className="flex justify-end mb-4">
          <NavLink to={`/AddWBS/${project_code}`} className="btn btn-primary py-2 px-3 rounded-0 ml-4 create-btn">Create WBS
          </NavLink>
</div>

      <div style={{ width: '100%' }}>
        <table style={{ width: '100%' }} id="test-table" className="table-auto bg-white mb-4 table-bordered border-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left text-uppercase px-3 py-3 text-nowrap fw-bold text-sm">WBS</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">Start Date</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">End Date</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">Status</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">Time Reported</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">Billable (Y/N)</th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">Expenses Reported</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((wbs) => (
              <tr className="cursor-pointer" key={wbs.wbs_id} onClick={() => handleRowClick(wbs.wbs_id)}>
                <td className=" cursor-pointer border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                
                <Typography className="relative inline-block">
                      
                      <Link to={`/addWBS/${wbs.wbs_id}`}>
                        {wbs.wbs_id}
                      </Link>
                    </Typography>

               
                </td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.wbs_start_date}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.wbs_end_date}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{wbs.project_status_name}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"10 Hours"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"Y"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">₹{"5000"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <ReactPaginate
          pageCount={10}
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
    </div>
  );
};

export default ProjectOverview;
