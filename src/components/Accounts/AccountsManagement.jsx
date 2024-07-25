import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";

import { FaPen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce";

const PAGE_SIZE = 5; // Define your page size here

const AccountsManagement = () => {
  const { account_id } = useParams();
  const emp_id = localStorage.getItem("emp_Id");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Active");
  const [data, setData] = useState([]);
  const [accountOwners, setAccountOwners] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // modal open
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditAccountId, setIsEditAccountId] = useState(null);
  const [accountsData, setAccountsData] = useState({
    account_name: "",
    account_owner: "",
  });

  const handleRowClick = (accountId) => {
    navigate("/projects", { state: { from: "accounts", accountId } });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((searchTerm) => {
    getAllAccounts(activeTab, searchTerm);
  }, 300);

  useEffect(() => {
    getAllAccounts(activeTab, searchTerm);
    fetchAccountOwners();
  }, [activeTab, searchTerm]);

  const getAllAccounts = async (account_status = "all", search_term = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/get_all_accounts?account_status=${account_status}&search_term=${search_term}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAccountOwners = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Resources/get_Resources`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result", result);
      setAccountOwners(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterData = (status) => {
    setActiveTab(status);
    setCurrentPage(0);
    getAllAccounts(status, searchTerm);
  };

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const handleOpenAccountModal = () => {
    setIsAddAccountModalOpen(true);
  };

  const handleCloseAccountModal = () => {
    setIsAddAccountModalOpen(false);
    setIsEditMode(false);
    setAccountsData({ account_name: "", account_owner: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveAccount = async () => {
    const accountData = {
      account_name: accountsData.account_name,
      account_owner: accountsData.account_owner,
      emp_id: emp_id,
    };

    try {
      let apiUrl =
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/add_account";
      let method = "POST";

      if (isEditMode) {
        apiUrl += `/${isEditAccountId}`;
        method = "PUT";
      }

      const response = await fetch(apiUrl, {
        method: method,
        body: JSON.stringify(accountData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        getAllAccounts(activeTab, searchTerm);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleCloseAccountModal();
  };

  const handleEditAccount = (account_id) => {
    setIsEditMode(true);
    handleOpenAccountModal();
    setIsEditAccountId(account_id);
    fetchAccountById(account_id);
  };

  const fetchAccountById = async (account_id) => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/edit_account/${account_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setAccountsData({
        account_name: result.account_name,
        account_owner: result.account_owner,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //debugger;
  return (
    <div className="" style={{ width: "100%" }}>
      <div className="mb-4 mt-4">
        <b className="mr-4">Accounts</b>
        <div className="mt-3 mb-2 flex items-center relative justify-content-between">
          <input
            type="text"
            placeholder="Search Account"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-[#DFE2EF] px-3 py-2 pr-8 search-box"
          />
          <div className="flex justify-center">
            <button
              className={`px-4 ${
                activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => filterData("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => filterData("Active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Closed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => filterData("Closed")}
            >
              Closed
            </button>
          </div>
          <NavLink
            to={`/AddAccount`}
            className="btn btn-primary py-2 px-3 rounded-0 ml-4 create-btn"
            // onClick={handleOpenAccountModal}
          >
            Create Account
          </NavLink>
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
            <Typography sx={{ mt: 2 }}>Loading Accounts...</Typography>
          </Box>
        ) : (
          <table
            style={{ width: "100%" }}
            id="test-table"
            className="table-auto bg-white mb-4 table-bordered border-white"
          >
            <thead className="bg-gray-50" >
              <tr>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Account Name
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Account Manager
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Status
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Contact Info
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Industry
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Budget Allocated
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Actual Spend
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  Revenue Generated
                </th>
                <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                  P&L
                </th>
                
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.map((employee) => (
                <tr key={employee.account_id} className="cursor-pointer">
                  <td
                    className="border text-blue-500 text-sm px-3 py-3"
                    style={{ textDecoration: "underline" }}
                  >
                    <Typography className="relative inline-block">
                      {/* Ensure <Link> wraps around the content you want clickable */}
                      <Link to={`/projects/${employee.account_id}`}>
                        {employee.account_name}
                      </Link>
                    </Typography>
                  </td>

                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {employee.account_owner}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {employee.account_status}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {employee.website}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {employee.business_domain_name}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {""}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {""}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {""}
                  </td>
                  <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">
                    {""}
                  </td>
                  
                </tr>
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
      <Modal
        open={isAddAccountModalOpen}
        onClose={handleCloseAccountModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 700 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditMode ? "Update Account" : "Add Account"}
          </Typography>
          <Box
            component="form"
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                onChange={handleInputChange}
                name="account_name"
                label="Account Name"
                value={accountsData.account_name}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Account Owner</InputLabel>
                <Select
                  name="account_owner"
                  value={accountsData.account_owner}
                  onChange={handleInputChange}
                >
                  {accountOwners.map((owner) => (
                    <MenuItem key={owner.name} value={owner.emp_id}>
                      {owner.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSaveAccount}
              >
                {isEditMode ? "Update Account" : "Add Account"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleCloseAccountModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountsManagement;
