import { useState, useEffect } from "react";
import TimeReportTab from "./TimeReportTab";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import updateLocale from "dayjs/plugin/updateLocale";
import WeekPicker from "../WBSTimeReporting/WeekPicker";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField, Snackbar } from "@mui/material";

function Timereport({ selectedWeekStart, rows, setRows, 
  status, setStatus,totalHours,setTotalHours,totalSum,setTotalSum,qemp_id,qstart_week,qend_week,
 // approvalEmployeeName,
  setApprovalEmployeeName,
  //employeeExpenseAmount,
  setEmployeeExpenseAmount }) {
  

  let startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
  let endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");
  let emp_id = localStorage.getItem("emp_Id");

  const holidays = ["28-06-2024"];

  if(qemp_id){
     emp_id=qemp_id;
  }
//debugger;
  if(qemp_id){
     startOfWeek= qstart_week;
     endOfWeek= qend_week
  }

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [validationError, setValidationError] = useState("");

  // const [status, setStatus] = useState('To Be Submitted');
  //const [totalHours, setTotalHours] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  //const [totalSum, setTotalSum] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const columns = [
    { label: "WBS" },
    { label: "Mon" },
    { label: "Tue" },
    { label: "Wed" },
    { label: "Thu" },
    { label: "Fri" },
    { label: "Sat" },
    { label: "Sun" },
    { label: "Total Hours" },
    { label: "Action" },
  ];
  const [wbsData, setWbsData] = useState([]);

  const updatedColumns = columns.map((column, index) => {
    if (
      index === 0 ||
      index === columns.length - 2 ||
      index === columns.length - 1
    )
      return column;
    //const date = selectedWeekStart.startOf('week').add(index - 1, 'day').format('D-MMM-YY').toUpperCase();
    const date = selectedWeekStart.startOf("week").add(index - 1, "day").format("DD-MMM-YY");
    return { ...column, date };
  });

  useEffect(() => {
    // getExpenses();
    if (validationError) {
      const timer = setTimeout(() => {
        setValidationError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validationError]);

  useEffect(() => {
    fetchData();
    if(qemp_id){
      fetchData_TimeSheet();
    }
    // getExpenses();

  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const updateTotalHours = (updatedRows) => {
    const updatedTotalHours = {};
    let totalSum = 0;
    updatedRows.forEach((row, index) => {
      for (const [key, value] of Object.entries(row)) {
        if (key !== "WBS" && key !== "Total Hours") {
          if (updatedTotalHours[key]) {
            updatedTotalHours[key] += parseFloat(row[key]);
            console.log("key",key,row[key])
          } else {
            updatedTotalHours[key] = parseFloat(row[key]);
          }
        }
      }
    });

    for (const hours of Object.values(updatedTotalHours)) {
      totalSum += hours;
    }

    setTotalHours(updatedTotalHours);
    setTotalSum(totalSum);
  };

  const handleChange = (event, rowIndex, colIndex) => {
    let totalHoursForRow = 0;
    const updatedRows = [...rows];

    const newValue = event.target.value || 0;

    if (colIndex === 0) {
      updatedRows[rowIndex]["WBS"] = newValue;
    } else if (colIndex >= 1 && colIndex <= 7) {
      if (/^\d*\.5$|^[0-8]$/.test(newValue)) {
        if (newValue <= 8 && newValue % 0.5 === 0) {
          updatedRows[rowIndex][updatedColumns[colIndex].date] = newValue || 0;
        } else {
          setValidationError(`Please Enter Proper Hours like 0.5 or 1,2,3....`);
        }
      } else {
        setValidationError(`Please Enter 0 to 8 or 0.5 or 1.5 like......`);
      }
    }

    for (let i = 1; i <= 7; i++) {
      const value =
        parseFloat(updatedRows[rowIndex][updatedColumns[i].date]) || 0;
      totalHoursForRow += value;
    }

    updatedRows[rowIndex]["Total Hours"] = parseFloat(
      totalHoursForRow.toFixed(1)
    );
    setRows(updatedRows);
    updateTotalHours(updatedRows);
  };
  const calculateTotalHours = (data) => {
    let totalHoursSum = 0;
    data.forEach((row) => {
      totalHoursSum += row["Total Hours"];
    });
    setTotalSum(totalHoursSum);
  };


  const handleAddRow = () => {
    const newRow = {};
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = async (rowIndex) => {
    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    const startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
    const endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");

    const finalObject = {
      emp_id: emp_id,
      data: [{ WBS: rows[rowIndex].WBS }],
      startOfWeek: startOfWeek,
      endOfWeek: endOfWeek,
    };

    const response = await fetch(
      "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheet_Deletion",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalObject),
      }
    );

    // Check if the request was successful
    if (response.ok) {
      setSuccessMessage("Timesheet deleted successfully!");
      setOpenSnackbar(true);
      setRows(updatedRows);
      updateTotalHours(updatedRows);
    } else {
      alert("Failed to submit data. Please try again later.");
    }
  };

  // api calls
  const fetchData = async () => {
    try {
      const empId = emp_id;
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/employee_project_details?emp_id=${empId}`,
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

  const fetchData_TimeSheet = async () => {
    try {
      const empId = emp_id;
      /*const startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
      const endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");
*/
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Employee_Weekly_TimeSheet?emp_id=${empId}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("result timsheet", result);
      //debugger;
      if (result.data[0] !== "No Records found") {
        setRows(result.data);
        setTotalHours(result.totalHoursBasedOnDate);
        calculateTotalHours(result.data);
        setStatus(result.status);
        setApprovalEmployeeName(result.emp_name);
        setEmployeeExpenseAmount(result.total_expenses_amount);

      } else {
        setRows([{}]);
        setTotalHours({});
        setTotalSum("");
        setStatus("To Be Submitted");
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <>
    
      <div className="">
        <div className="">
          <div className="">
            <div className=""></div>
          </div>
          {!qemp_id && status !== "Approved" && (
            /*<button
              className="border-[#DFE2EF] btn btn-outline-primary py-2 px-3 rounded-0 bg-white flex flex-row items-center justify-start gap-[5px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center"
              onClick={handleAddRow}
            >
              <img
                className="h-5 w-5 relative min-h-[20px] me-1"
                loading="lazy"
                src="/addicon.svg"
              />
              <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block min-w-[61px]">
                Add Row
              </div>
            </button>*/

        <div className="px-3 pt-3 pb-2">
          <h5 className="add-row-title"><span className='aliagn-self-center'> Timesheet Details</span> 
          <span className="add-row-icon"><img src="/add-btn.svg" onClick={handleAddRow}></img> </span> 
          </h5>
        </div>

          )}
        </div>
      </div>
      <Paper variant="elevation" sx={{ width: "100%", boxShadow: "0 0 0 0" }}>
        <TableContainer
          sx={{ maxHeight: 440 }}
          className="py-2 px-2 border border-whitesmoke-200 border-top-0 border-bottom-0"
        >
          <Table
            style={{ width: "100%" }}
            className="table-auto overflow-visible sp-inputs border border-gray-200"
            sx={{ "& .MuiTableCell-root": {} }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead
              style={{ width: "100%" }}
              className="bg-[#E8EBF9] text-slategray-100 text-xs sticky"
            >
              <TableRow
                style={{
                  backgroundColor: "#fff",
                  color: "#6e7391",
                  width: "100%",
                }}
              >
                {updatedColumns.map((column, index) => (
                  <TableCell
                    className="text-uppercase px-2 py-1 fw-medium"
                    key={index}
                    align="center"
                    width={column.width || "auto"}
                    style={
                      column?.label?.includes("Sat") ||
                      column?.label?.includes("Sun")
                        ? {
                            backgroundColor: "#f3f3f3",
                            color: "inherit",
                            lineHeight: "1.1rem",
                            fontSize: "14px",
                          }
                        : {
                            backgroundColor: "inherit",
                            color: "inherit",
                            lineHeight: "1.1rem",
                            fontSize: "14px",
                          }
                    }
                  >
                    {column.date && (
                      <>
                        <span className="whitespace-nowrap">{column.date}</span>
                        <br />
                      </>
                    )}
                    <span
                      style={{
                        fontSize:
                          column.label === "WBS" ||
                          column.label === "Total Hours" ||
                          column.label === "Action"
                            ? "14px"
                            : "12px",
                      }}
                    >
                      {column.label}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="">
              {rows &&
                rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="even:bg-[#e8f7ff]">
                    {updatedColumns.map((column, colIndex) => (
                      <TableCell
                        className="px-2 py-1 border-0"
                        key={colIndex}
                        align="center"
                        style={
                          column?.label?.includes("Sat") ||
                          column?.label?.includes("Sun")
                            ? {
                                backgroundColor: "#f3f3f3",
                                color: "#000000",
                              }
                            : {
                                backgroundColor: "",
                              }
                        }
                      >
                        {colIndex === 0 ? (
                          <Select
                            fullWidth
                            value={row["WBS"] || ""}
                            align="left"
                            width="auto"
                            onChange={(event) =>
                              handleChange(event, rowIndex, colIndex)
                            }
                            SelectDisplayProps={{ className: "px-1 py-1" }}
                            disabled={
                              status === "To Be Approved" ||
                              status === "Approved"
                            }
                          >
                            {wbsData.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>

                        ) : colIndex === updatedColumns.length - 1 ? (
                          <div style={{ display: "flex" }}>
                            <IconButton onClick={() => handleDeleteRow(rowIndex)}
                              disabled={status === "Approved" || status === "To Be Approved"}>
                              {" "}
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          <TextField
                            type="number"
                            value={column.label === "Total Hours"? row["Total Hours"] || "" : row[column.date] || ""}
                            sx={{"& fieldset": { backgroundColor: "#fff" },"& input": { zIndex: 1 },
    className: "py-2 text-xs",
                            }}
                            /*inputProps={{ className: 'py-1 px-1 text-xs' }}*/
                            inputProps={{step: 0.5,min: 0,max: 8,className: "py-1 px-1 text-xs",inputMode: "decimal",
                              pattern: "^\\d*\\.?\\d*$",
                            }}
                            style={{width:column.label === "Total Hours"? "60px": "40px"}}
                            onChange={(event) =>handleChange(event, rowIndex, colIndex)}
                            disabled={status === "To Be Approved" ||status === "Approved"}
                          />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>

              <TableRow className="tbl-total" style={{ backgroundColor: "#e9ebfb" }}>
                {updatedColumns.map((column, colIndex) => (
                  
                  <TableCell key={colIndex} align="center"
                    className=""style={colIndex === 6 || colIndex === 7
                        ? {
                            backgroundColor: "#e8ebf9",
                            color: "#000000",
                            fontSize: "1.2rem",
                          }
                        : {
                            backgroundColor: "#E8EBF9",
                            color: "#000000",
                            fontSize: "1.2rem",
                            padding: colIndex === columns.length - 1 && "0px",
                          }
                    }>
                    {colIndex === 0 ? "Total Hours" : totalHours[column.date]}
                    {colIndex === 8 ? totalSum : ""}
                    {/*colIndex === 8 ? (1 || 0) : ''*/}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {/* <div className="flex flex-row justify-end gap-2 mt-4">
      {renderActionButtons()}
    </div> */}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />

        {validationError && (
          <div className="text-red-500">
            <b>{validationError}</b>
          </div>
        )}
      </Paper>
    </>
  );
}

export default Timereport;
