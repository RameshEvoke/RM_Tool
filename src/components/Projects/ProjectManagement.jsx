import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const PAGE_SIZE = 3;

import { FaPen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import debounce from "lodash.debounce";
import { NavLink, Link } from "react-router-dom";
import { Box, Typography, CircularProgress,Tooltip  } from "@mui/material";
import { useParams } from "react-router-dom";

const ProjectManagement = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("in-progress");
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditProjectId, setIsEditProjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  let { account_id, project_code } = useParams();

  if (!account_id) {
    account_id = "";
  }

  const handleRowClick = (emplId) => {
    setSelectedEmployeeId(emplId === selectedEmployeeId ? null : emplId);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((searchTerm) => {
    getAllProjects(activeTab, searchTerm);
  }, 300);

  useEffect(() => {
    getAllProjects(activeTab, searchTerm);
  }, [activeTab, searchTerm]);

  const handleEditProject = (projectCode) => {
    setIsEditMode(true);
    setIsEditProjectId(projectCode);
  };

  const getAllProjects = async (project_status = "all", search_term = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/projects/get_all_projects?project_status=${project_status}&search_term=${search_term}&account_id=${account_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterData = (status) => {
    if (status === "all") {
      setData(data);
    } else {
      const filteredData = data.filter((item) => item.status === status);
      setData(filteredData);
    }
    setActiveTab(status);
    setCurrentPage(0);
    getAllProjects(status, searchTerm);
  };
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  return (
    <div className="" style={{ width: "100%" }}>
      <div className="mb-1 mt-4">
        {!account_id &&  <h5 className="pt-2 titles">Projects</h5>}

        <div className="mt-3 mb-2 flex items-center relative justify-content-between">
        <div className="pos-rel">
         <input
            type="text"
            placeholder="Search Account"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-box"
          />
          <span className="searchicon">
            <img src="./search-icon.svg"/>
          </span>
         </div>

          <div className="flex justify-center account-tabs">
            <button
              className={`px-4  ${
                activeTab === "all" ? "bg-sctive" : "tab-gray"
              }`}
              onClick={() => filterData("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "in-progress"
                  ?  "bg-sctive"
                  : "tab-gray"
              }`}
              onClick={() => filterData("in-progress")}
            >
              In Progress
            </button>
            <button
              className={`px-4 py-2  ${
                activeTab === "completed"
                  ? "bg-sctive"
                  : "tab-gray"
              }`}
              onClick={() => filterData("completed")}
            >
              Completed
            </button>
          </div>

          <div className="">
            <NavLink
              to={"/AddProject"}
              className="btn btn-primary py-2 px-3 rounded-0 ml-4 create-btn"
            >
              Create Project
              {/* {isEditMode ? "Update Project" : "Add New Project"} */}
            </NavLink>
            {/* </button> */}
          </div>
        </div>
      </div>
      <div class="table-responsive">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading Projects...</Typography>
          </Box>
        ) : (
          <table
            style={{ width: "100%" }}
            id="test-table"
            className=" table-auto bg-white mb-4 table-bordered border-white tbl-pad"
          >
            <thead className="bg-gray-50">
              <tr>
                <th className="tbl-heads">
                  Project Name
                </th>
                <th className="tbl-heads">
                  Project Manager
                </th>
                <th className="tbl-heads">
                  Status
                </th>
                <th className="tbl-heads">
                  Technologies
                </th>
                <th className="tbl-heads">
                  Project Start Date
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100  text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Project End Date
                </th>
                <th className="tbl-heads">
                  No Of Resources
                </th>
                <th className="tbl-heads">
                  Budget
                </th>
                <th className="tbl-heads">
                  Key Deliverable
                </th>
                <th className="tbl-heads">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white font-14">
              {data.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr className="cursor-pointer ">
                    <td>

                    {employee.project_name.length > 10 ? (
                      <Typography className="relative inline-block">
                        <Tooltip title={employee.project_name}>
                        <Link to={`/project/${employee.project_code}`}  className="account-name">
                          <span>
                            {employee.project_name.substring(0, 20)}...
                          </span>
                          </Link>
                        </Tooltip>
                        </Typography>
                      ) : (
                      <Typography className="relative inline-block">
                      <Link to={`/project/${employee.project_code}`} className="account-name">
                        {employee.project_name}
                        </Link>
                        </Typography>
                      )}

                    </td>
                    <td>
                      {employee.project_delivery_manager}
                    </td>
                    <td>
                      {employee.project_status}
                    </td>
                    <td>
                      {employee.technologies}
                    </td>
                    <td>
                      {employee.project_start_date}
                    </td>
                    <td>
                      {employee.project_end_date}
                    </td>
                    <td>
                      {employee.team_size}
                    </td>
                    <td>
                      {0}
                    </td>
                    <td>
                      {employee.key_deliverables.length > 20 ? (
                        <Tooltip title={employee.key_deliverables}>
                          <span>
                            {employee.key_deliverables.substring(0, 10)}.......
                          </span>
                        </Tooltip>
                      ) : (
                        employee.key_deliverables
                      )}
                    </td>
                    
                    <td>
                      <Link to={`/AddProject/${employee.project_code}`}  className="account-name">
                        {<FaPen />}
                      </Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
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

export default ProjectManagement;
