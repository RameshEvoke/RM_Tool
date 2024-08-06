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
      <div className="mb-1 mt-4">
        <h5 className="pt-2 titles">Accounts</h5>
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
              className={`px-4 ${
                activeTab === "all" ? "bg-sctive" : "tab-gray"
              }`}
              onClick={() => filterData("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Active"
                  ? "bg-sctive"
                  : "tab-gray"
              }`}
              onClick={() => filterData("Active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "Closed"
                  ? "bg-sctive"
                  : "tab-gray"
              }`}
              onClick={() => filterData("Closed")}
            >
              Closed
            </button>
          </div>
          <NavLink
            to={`/AddAccount`}
            className="btn btn-primary"
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
            className="table-auto bg-white mb-4 table-bordered border-white tbl-pad"
          >
            <thead className="bg-gray-50" >
              <tr>
                <th className="tbl-heads">
                  Account Name
                </th>
                <th className="tbl-heads">
                  Account Manager
                </th>
                <th className="tbl-heads">
                  Status
                </th>
                <th className="tbl-heads">
                  Contact Info
                </th>
                <th className="tbl-heads">
                  Industry
                </th>
                <th className="tbl-heads">
                  Budget Allocated
                </th>
                <th className="tbl-heads">
                  Actual Spend
                </th>
                <th className="tbl-heads">
                  Revenue Generated
                </th>
                <th className="tbl-heads">
                  P&L
                </th>
                
              </tr>
            </thead>

            <tbody className="bg-white font-14">
              {data.map((employee) => (
                <tr key={employee.account_id} className="cursor-pointer">
                  <td
                   
                  >
                    <Typography className="relative inline-block">
                      {/* Ensure <Link> wraps around the content you want clickable */}
                      <Link to={`/projects/${employee.account_id}`} className="account-name">
                        {employee.account_name}
                      </Link>
                    </Typography>
                  </td>

                  <td>
                    {employee.account_owner}
                  </td>
                  <td>
                    {employee.account_status}
                  </td>
                  <td>
                    {employee.website}
                  </td>
                  <td>
                    {employee.business_domain_name}
                  </td>
                  <td>
                    {" - "}
                  </td>
                  <td>
                    {" - "}
                  </td>
                  <td>
                    {" - "}
                  </td>
                  <td>
                    {" - "}
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
