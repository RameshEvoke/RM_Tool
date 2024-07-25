import React, { useState, useEffect } from "react";
import {
  Snackbar,
  CircularProgress,
  InputAdornment,
  Autocomplete,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Button,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import updateLocale from "dayjs/plugin/updateLocale";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import {
  FaPen,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
//import {handleSubmit} from '/src/components/WBSTimeReporting/TableComponent.jsx';

dayjs.extend(updateLocale);
dayjs.updateLocale("en", { weekStart: 1 });
moment.updateLocale("en", { week: { dow: 1 } });

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



const Expenses = ({ selectedWeekStart,status,expenses,setExpenses,qemp_id,qstart_week,qend_week,setEmployeeExpenseAmount }) => {
  
  let emp_id = localStorage.getItem("emp_Id");

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  //const [projectNames, setProjectNames] = useState([]);
  //const [wbsList, setWbsList] = useState([]);
  const [errors, setErrors] = useState({});

  // for update expenses
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditExpenseId, setIsEditExpenseId] = useState(null);
  const [showOtherPurposeField, setShowOtherPurposeField] = useState(false);

  // get expenses
  // const [expenses, setExpenses] = useState([]);

  const [expenseData, setExpenseData] = useState({
    project_code: "",
    wbs_id: "",
    date: "",
    purpose_id: "",
    purpose_name: "",
    amount: "",
    otherPurpose: "",
  });

  // loader added

  const [isLoading, setIsLoading] = useState(false);

  // display message
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  let startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
  let endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");
  const [wbsData, setWbsData] = useState([]);
  const [purposes, setPurposes] = useState([]);

  if(qemp_id){
     emp_id=qemp_id;
  }
//debugger;
  if(qemp_id){
     startOfWeek= qstart_week;
     endOfWeek= qend_week
  }



  useEffect(() => {
    //fetchProjectNames();
    fetchExpenses();
     getExpenses();
     fetchPurposes();
     getExpensesAmountOnly();
  }, [startOfWeek, endOfWeek]);



const getExpensesAmountOnly = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses/get_week_expenses?emp_id=${emp_id}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      //debugger;
      setEmployeeExpenseAmount(result[0].total_amount);
      
    } catch (error) {
      console.log("error", error);
    }
  };

const fetchPurposes = async () => {
    try {
      //const empId = emp_id;
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses/exp_purpose`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result in time report", result);
      setPurposes(result);
    } catch (error) {
      console.log("error", error);
    }
  };


const fetchExpenses = async () => {
    try {
      //const empId = emp_id;
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/employee_project_details?emp_id=${emp_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result in time report", result);
      setWbsData(result.WBS_ID);
    } catch (error) {
      console.log("error", error);
    }
  };



  const getExpenses = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses?emp_id=${emp_id}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setExpenses(result);
    } catch (error) {
      console.log("error", error);
    }
  };

 
  const handleRemoveFile = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...newFiles]);
    //documents: '',
    setErrors((prevErrors) => ({
      ...prevErrors,
      documents: "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleOpenAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  const handleCloseAddExpenseModal = () => {
    setIsAddExpenseModalOpen(false);
    setIsEditMode(false);
    setIsEditExpenseId(null);
    setExpenseData({
      //project_code: "",
      wbs_id: "",
      date: "",
      purpose_id: "",
      purpose_name: "",
      amount: "",
      otherPurpose: "",
    });
    setErrors({});
    setSelectedFiles([]);
    setShowOtherPurposeField(false);
  };

  const validateFields = () => {
    const expErrors = {};
    /*if (!expenseData.project_code) {
      expErrors.projectName = "Project name is required";
    }*/
    if (!expenseData.wbs_id) {
      expErrors.wbs = "WBS is required";
    }
    if (!expenseData.date) {
      expErrors.date = "Date is required";
    }

    if (!expenseData.purpose_id) {
      expErrors.purpose = "Purpose is required";
    }
    if (expenseData.purpose_name === "Others" && !expenseData.otherPurpose) {
      expErrors.otherPurpose = "Other Purpose is required";
    }
    if (!expenseData.amount) {
      expErrors.amount = "Amount is required";
    }
    if (selectedFiles.length === 0) {
      expErrors.documents = "At least one document is required";
    }

    setErrors(expErrors);

    return Object.keys(expErrors).length === 0;
  };

  const handleSaveExpense = async () => {
    //debugger;
    if (!validateFields()) {
      return false;
    }

    setIsLoading(true);

    const expensesData = {
      //project_code: expenseData.project_code,
      wbs_id: expenseData.wbs_id,
      date: expenseData.date,
      purpose_id: expenseData.purpose_id,
      purpose_name: expenseData.purpose_name,
     // purpose_name: expenseData.purpose_name === "Others" ? expenseData.otherPurpose : expenseData.purpose_name,
      otherPurpose: expenseData.purpose_name === "Others" ? expenseData.otherPurpose :"",
      amount: expenseData.amount,
      documents: [],
      startOfWeek: startOfWeek,
      endOfWeek: endOfWeek,
      emp_id: emp_id,
    };

    const filePromises = selectedFiles.map((file) => {
      if (file instanceof File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              content: reader.result.split(",")[1],
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        return Promise.resolve(file);
      }
    });

    try {
      const filesData = await Promise.all(filePromises);
      expensesData.documents = filesData.filter((file) => file);
    } catch (error) {
      setIsLoading(false);
      console.error("Error reading files:", error);
      return;
    }

    try {
      let apiUrl =
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/add_expenses";
      let method = "POST";

      if (isEditMode) {
        apiUrl = `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses/Update_Expenses`;
        method = "POST";
        expensesData.id = isEditExpenseId;
      }

      const response = await fetch(apiUrl, {
        method: method,
        body: JSON.stringify(expensesData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);

        setSuccessMessage(
          isEditMode
            ? "Expenses updated successfully!"
            : "Expenses added successfully!"
        );
        setOpenSnackbar(true);
        getExpenses();
        getExpensesAmountOnly();
      } else {
        setSuccessMessage("Error:", response.statusText);
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setSuccessMessage("Error:", error);
      console.error("Error:", error);
    }
    setIsLoading(false);
    handleCloseAddExpenseModal();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fetchExpensesByWbsId = async (wbsId) => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses/Get_Expenses_ID?id=${wbsId}`
      );

      if (response.ok) {
        const data = await response.json();
        const expenses = data[0];

        setExpenseData({
          //project_code: expenses.project_code,
          wbs_id: expenses.wbs_id,
          date: expenses.date,
          purpose_id: expenses.purpose_id,
          purpose_name: expenses.purpose_name,
          otherPurpose: expenses.purpose_name === "Others" ? expenses.otherPurpose :"",
          amount: expenses.amount,
          //if(expenses.purpose_name)
          //otherPurpose: expenses.purpose_name,
        });
setShowOtherPurposeField(expenses.purpose_name === "Others");
        setSelectedFiles(expenses.documents || []);
        //await fetchWbsList(expenses.project_code);
      } else {
        console.error("Failed to fetch expense details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  const handleEditExpense = (wbsId) => {
    handleOpenAddExpenseModal();
    setIsEditMode(true);
    setIsEditExpenseId(wbsId);

    fetchExpensesByWbsId(wbsId);
  };

  const handleDeleteExpense = async (wbsId) => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses/delete_expenses?id=${wbsId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Expense deleted successfully");
        setSuccessMessage("Expense deleted successfully!");
        setOpenSnackbar(true);
        getExpenses();
        getExpensesAmountOnly();
      } else {
        setSuccessMessage("Error deleting expense:", response.statusText);
        setOpenSnackbar(true);
        console.error("Error deleting expense:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handlePurposeChange = (event, value) => {
    setExpenseData((prevState) => ({
      ...prevState,
      purpose_id: value ? value.purpose_id : "",
      purpose_name: value ? value.purpose_name : "",

    }));
    if (value && value.purpose_name === "Others") {
      //debugger;
      setShowOtherPurposeField(true);
    } else {
      setShowOtherPurposeField(false);
    }
  };
//debugger;
  return (
    <div className="self-stretch box-border flex flex-col items-end justify-start pt-[8px] pb-[5px] max-w-full text-left text-sm text-darkslateblue-100 font-poppins border-solid border-whitesmoke-200 border-[1px] border-t-[0] px-2">
      <div className="self-stretch flex flex-row items-center text-center justify-between max-w-full gap-[10px] mq750:flex-wrap mq1050:flex-wrap">
        <div className="flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap mq750:gap-[17px]">
          <div className="flex-1 flex text-center flex-row items-center justify-start gap-[0px] min-w-[240px]"></div>
        </div>

        {status === "To Be Submitted" && (
          <button
            className="border-[#DFE2EF] btn btn-outline-primary py-2 px-2 rounded-0 bg-white flex flex-row items-center justify-start gap-[5px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center"
            onClick={handleOpenAddExpenseModal}
          >
            <img
              className="h-5 w-5 relative min-h-[20px] me-1"
              loading="lazy"
              src="/addicon.svg"
            />
            <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block min-w-[120px]">
              Add Expenses
            </div>
          </button>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      </div>
      <TableContainer
        sx={{ width: "100%", boxShadow: "0 0 0 0", border: "0px" }}
        component={Paper}
        className="py-2 py-2 "
      >
        <Table
          aria-label="simple table"
          className="table-auto overflow-visible table-bordered border border-gray-200 w-100"
        >
          <TableHead className="bg-[#E8EBF9] text-slategray-100 w-100">
            <TableRow
              style={{
                backgroundColor: "#E8EBF9",
                color: "#6e7391",
                width: "100%",
              }}
            >
              
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-4 py-4 fw-medium text-center"
              >
                WBS
              </TableCell>
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-2 py-2 fw-medium text-center"
              >
                DATE
              </TableCell>
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-2 py-2 fw-medium text-center"
              >
                PURPOSE
              </TableCell>
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-2 py-2 fw-medium text-center"
              >
                AMOUNT
              </TableCell>
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-2 py-2 fw-medium text-center"
              >
                DOCUMENTS
              </TableCell>
              <TableCell
                style={{ color: "#6e7391" }}
                className="text-uppercase px-4 py-4 fw-medium text-center"
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-100">
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                
                <TableCell className="px-2 py-2 text-center">
                  {expense.task_wbsId}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  {expense.date}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  {expense.purpose}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  ₹{expense.amount}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  {expense.documents && expense.documents.length > 0 ? (
                    expense.documents.map((doc, index) => (
                      <div key={index}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    <span>No documents</span>
                  )}
                </TableCell>
                <TableCell className="px-2 py-2 text-center">
                  {status === "To Be Submitted" && (
                    <>
                      <IconButton onClick={() => handleEditExpense(expense.id)}>
                        {" "}
                        <FaPen />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={isAddExpenseModalOpen}
        onClose={handleCloseAddExpenseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 700 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditMode ? "Update Expenses" : "Add Expenses"}
          </Typography>

          <Box
            component="form"
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              
              <Autocomplete
                name="wbs"
                options={wbsData}
                getOptionLabel={(option,index) => option}
                onChange={(event, value) => {
                  setExpenseData({
                    ...expenseData,
                    wbs_id: value ? value: "",
                  });
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    wbs_id: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="WBS"
                    error={!!errors.wbs}
                    helperText={errors.wbs}
                  />
                )}
                fullWidth
                value={
                   expenseData.wbs_id ||
                  null
                }
              />

              <TextField
                name="date"
                label="Date"
                type="date"
                value={expenseData.date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.date}
                helperText={errors.date}
              />

            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
        
            <Autocomplete sx={{ width:"100%" }}
            options={purposes}
            getOptionLabel={(option) => option.purpose_name}
            onChange={(event, newValue) => {
              setExpenseData((prevState) => ({
                ...prevState,
                purpose_id: newValue ? newValue.purpose_id : "",
                purpose_name: newValue ? newValue.purpose_name : "",
              }));
              setShowOtherPurposeField(newValue && newValue.purpose_name === "Others");
              setErrors((prevErrors) => ({
                ...prevErrors,
                purpose: "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Purpose"
                fullWidth
                margin="normal"
                error={!!errors.purpose}
                helperText={errors.purpose}
              />
            )}

            value={
              purposes.find((purpose) => purpose.purpose_id === expenseData.purpose_id) || null
            }
          />

          {showOtherPurposeField && (
            <TextField
              label="Other Purpose"
              name="otherPurpose"
              value={expenseData.otherPurpose}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.otherPurpose}
              helperText={errors.otherPurpose}
            />
          )}

              <TextField sx={{ "margin-top":"15px" }}
                name="amount"
                label="Amount"
                type="number"
                value={expenseData.amount}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}

              />

            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>  
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <label htmlFor="file-upload" style={{ marginBottom: "8px" }}>
                  Documents
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ marginBottom: "8px" }}
                />

                {errors.documents && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.documents}
                  </span>
                )}
              </div>
            </Box>

            {selectedFiles.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="col-6 px-2 py-2"><b>Name</b></TableCell>
                    <TableCell className="col-6 px-2 py-2"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedFiles.map((file) => (
                    <TableRow
                      key={file.name}
                      className="row align-items-center"
                    >
                      <TableCell className="col-6 px-2 py-2">
                        {file.name}
                      </TableCell>
                      <TableCell className="col-6 px-2 py-2">
                        <Button onClick={() => handleRemoveFile(file.name)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSaveExpense}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : ""}
                {isEditMode ? "Update Expense" : "Add Expense"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleCloseAddExpenseModal}
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
export default Expenses;
