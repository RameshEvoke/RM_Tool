import { useState, useEffect } from "react";
import TimeReportTab from "./TimeReportTab";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import updateLocale from "dayjs/plugin/updateLocale";
import WeekPicker from "../WBSTimeReporting/WeekPicker";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams,useNavigate } from 'react-router-dom';
import { Typography,Box,CircularProgress,TextareaAutosize,IconButton, TextField, Snackbar,MenuItem,Select,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableFooter,TableRow} from "@mui/material";

//import { TextareaAutosize } from '@mui/base/TextareaAutosize';


dayjs.extend(updateLocale);
dayjs.updateLocale("en", { weekStart: 1 });
moment.updateLocale("en", { week: { dow: 1 } });

const TimeReportContent = () => {

  let emp_id = localStorage.getItem("emp_Id"); // loged user approver id
  const { qemp_id, qstart_week, qend_week } = useParams(); // employee id for approve
  const navigate = useNavigate();

  if(qemp_id){
     emp_id=qemp_id;
  }

  const columns = [
  { label: "WBS" },{ label: "Mon" },{ label: "Tue" },{ label: "Wed" },{ label: "Thu" },{ label: "Fri" },
  { label: "Sat" },{ label: "Sun" },{ label: "Total Hours" },{ label: "Action" },
  ];


  const [rows, setRows] = useState([""]);
  const [expenses, setExpenses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs().startOf("week"));
  const [status, setStatus] = useState("To Be Submitted");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [totalHours, setTotalHours] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalSum, setTotalSum] = useState();
  const [validationError, setValidationError] = useState("");
  let startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
  let endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");
  const [comments,setComments] =useState("");

  // this is for we are getting employee name and total expense amount from another
  const [approvalEmployeeName,setApprovalEmployeeName] =useState("");
  const [employeeExpenseAmount,setEmployeeExpenseAmount]=useState(0);
  const [loading, setLoading] = useState(false);

  //let [approver_submitted_by,Setapprover_submitted_by] =useState("");

  if(qemp_id){
     startOfWeek= qstart_week;
     endOfWeek= qend_week
  }

  useEffect(() => {
    if (qstart_week && qend_week) {
      setSelectedWeekStart(dayjs(qstart_week, "DD-MM-YYYY"));
    }
  }, [qstart_week, qend_week]);


  useEffect(() => {
    if(!qemp_id){
      fetchData_TimeSheet();
    }
    getExpenses();
  }, [selectedWeekStart]);


  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => {
        setValidationError("");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [validationError]);


  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };


  const fetchData_TimeSheet = async () => {
    try {
      setLoading(true);
     // debugger;
      //const empId = emp_id;
      //const startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
      //const endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");

      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Employee_Weekly_TimeSheet?emp_id=${emp_id}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      //debugger;
      if (result.data[0] !== "No Records found") {
        setRows(result.data);
        setTotalHours(result.totalHoursBasedOnDate);
        calculateTotalHours(result.data);
        setStatus(result.status);
        setApprovalEmployeeName(result.emp_name);
        setEmployeeExpenseAmount(result.total_expenses_amount);
        setLoading(false);
      } else {
        setRows([{}]);
        setTotalHours({});
        setTotalSum("");
        setStatus("To Be Submitted");
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (button) => {
    
    let apiUrl;
    let req_status = "";
    let displayMsg = "";
    let validate = true;
    let submitted_by ="";

    try {
      if (button === "Submit") {
        req_status = "To Be Approved";
        displayMsg = "Data Submitted Successfully";
      } else if (button === "Save") {
        req_status = "To Be Submitted";
        validate = false;
        displayMsg = "Data Saved Successfully";
      } else if (button === "Approve") {
        displayMsg = "Data Approved Successfully";
        req_status = "Approved";
        submitted_by = localStorage.getItem("emp_Id");
      }else if (button === "Reject") {
        displayMsg = "Timesheet Rejected Successfully";
        req_status = "Rejected";
        submitted_by = localStorage.getItem("emp_Id");
      }

      const postData = saveToLocalStorage(rows, validate);
      const parsedData = JSON.parse(postData);

      // comments validation added here

      if(button === "Reject" && comments === ""){
        setValidationError('Enter Comments to proceed further');
        return false;
      }

      if (parsedData !== false) {
        if (validate && parsedData.data.length === 0) {
          setValidationError(`Select atleast one WBS.`);
          return false;
        }

        const WeekedDays = [];
        const firstRow = rows[0];

        for (let i = 1; i <= 5; i++) {
          const date = updatedColumns[i].date;
          if (!firstRow[date]) {
            WeekedDays.push({ rowIndex: 0, date });
          }
        }

        if (validate && WeekedDays.length > 0) {
          const firstMissing = WeekedDays[0];
          setValidationError(`Please Enter Hours for ${firstMissing.date}.`);
          return false;
        }

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (!row["WBS"]) {
            setValidationError(`Please Select The WBS in row ${i + 1}.`);
            return false;
          }
        }

        if (validate && !JSON.parse(postData)) {
          return false;
        }

        const startOfWeek = selectedWeekStart.startOf("week").format("DD-MM-YYYY");
        const endOfWeek = selectedWeekStart.endOf("week").format("DD-MM-YYYY");
        const status = req_status;
        

        let postDataWithWeek = {};
      if(qemp_id){
       postDataWithWeek = {...JSON.parse(postData),startOfWeek,endOfWeek,status,submitted_by};
    }else{
       postDataWithWeek = {...JSON.parse(postData),startOfWeek,endOfWeek,status,comments};
    }

    
        /*if (button === "Submit") {
          apiUrl ="https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheetSubmission";
        } else {
          apiUrl ="https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheetSubmission";
        }*/
      
      apiUrl ="https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheetSubmission";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postDataWithWeek),
        });

        // Check if the request was successful
        if (response.ok) {
          setSuccessMessage("Timesheet Saved successfully!");
          setOpenSnackbar(true);
          setValidationError(displayMsg);
          setComments("");


          setTimeout(() => {
            if(qemp_id){
            navigate('/teApproval');
            }else{
            fetchData_TimeSheet();
            }
          }, 3000);

          /*if(qemp_id){
            navigate('/teApproval');
          }else{
            fetchData_TimeSheet();
          }*/
        } else {
          console.log("Failed to submit data. Please try again later.");
          //alert('Failed to submit data. Please try again later.');
        }
      }
    } catch (error) {
      console.log("Submittion error", error);
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

  const saveToLocalStorage = (rows, validate) => {
    const selectedWBS = new Set();
    for (let i = 0; i < rows.length; i++) {
      const currentWBS = rows[i]["WBS"];

      if (validate && selectedWBS.has(currentWBS)) {
        setValidationError(`WBS '${currentWBS}' selected multiple times.`);
        return false;
      } else {
        selectedWBS.add(currentWBS);
      }
    }

    //const rowData = [];
    const totalHoursBasedOnDate = {};
    rows.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        // Skip non-date keys
        if (key !== "WBS" && key !== "Total Hours") {
          if (totalHoursBasedOnDate[key]) {
            totalHoursBasedOnDate[key] += parseFloat(value);
          } else {
            totalHoursBasedOnDate[key] = parseFloat(value);
          }
        }
      }
    });

    for (const [date, hours] of Object.entries(totalHoursBasedOnDate)) {
      const checkDate = new Date(date);
      const day = checkDate.getDay();

      if (day !== 0 && day !== 6) {
        if (validate && hours > 8) {
          setValidationError(
            `Hours exceeded for date ${date}. Max Allowed hours:8 `
          );
          return false;
        }
        if (validate && hours < 8) {
          setValidationError(
            `Please maintain 8 Hours per Day for this date : ${date}`
          );
          return false;
        }
      }
    }

    // Create the final object with the "data" property containing the row data array
    const finalObject = {
      emp_id: emp_id,
      data: rows,
      expenses: expenses,
      totalHoursBasedOnDate: totalHoursBasedOnDate,
    };
    //return;
    return JSON.stringify(finalObject);
  };

  const calculateTotalHours = (data) => {
    let totalHoursSum = 0;
    data.forEach((row) => {
      totalHoursSum += row["Total Hours"];
    });
    setTotalSum(totalHoursSum);
  };

  const handleWithdraw = () => {
    setStatus("To Be Submitted");
    console.log("status withdraw", status);
    setIsSubmitted(false);
  };
  const updatedColumns = columns.map((column, index) => {
    if (
      index === 0 ||
      index === columns.length - 2 ||
      index === columns.length - 1
    )
      return column;
    //const date = selectedWeekStart.startOf('week').add(index - 1, 'day').format('D-MMM-YY').toUpperCase();
    const date = selectedWeekStart
      .startOf("week")
      .add(index - 1, "day")
      .format("DD-MMM-YY");
    return { ...column, date };
  });

  const renderActionButtons = () => {
    const currentWeekStart = dayjs().startOf("week").format("DD-MMM-YY");

    const isCurrentOrPastWeek =
      selectedWeekStart.isBefore(currentWeekStart) ||
      selectedWeekStart.isSame(currentWeekStart, "day");
      if (!qemp_id && status === "To Be Submitted") {
        return (
          <div className="flex justify-end gap-2 w-full">
            { isCurrentOrPastWeek && (
              <Button
                style={{
                  backgroundColor: "#4169E1",
                  height: "33px",
                  borderRadius: "0px",
                  boxShadow: "none",
                }}
                variant="contained"
                size="large"
                onClick={() => handleSubmit("Submit")}
                disabled={formSubmitted}
              >
                Submit
              </Button>
            )}

            <Button
              style={{
                backgroundColor: "#4169E1",
                height: "33px",
                borderRadius: "0px",
                boxShadow: "none",
              }}
              variant="contained"
              size="large"
              onClick={() => handleSubmit("Save")}
              disabled={formSubmitted}
            >
              Save
            </Button>
          </div>
        );
      } else if (!qemp_id && status === "To Be Approved") {
        return (
          <div className="flex justify-end gap-2 w-full">
            <Button
              style={{
                backgroundColor: "#4169E1",
                height: "33px",
                borderRadius: "0px",
                boxShadow: "none",
              }}
              variant="contained"
              size="large"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </div>
        );
      }
      else if (qemp_id && status === "To Be Approved") {
        return (
          <div className="flex justify-end gap-2 w-full">
            <Button
              style={{
                backgroundColor: "#4169E1",
                height: "33px",
                borderRadius: "0px",
                boxShadow: "none",
              }}
              variant="contained"
              size="large"
              onClick={() => handleSubmit("Approve")}
            >
              Approve
            </Button>

            <Button
              style={{
                backgroundColor: "#4169E1",
                height: "33px",
                borderRadius: "0px",
                boxShadow: "none",
              }}
              variant="contained"
              size="large"
              onClick={() => handleSubmit("Reject")}
            >
              Reject
            </Button>

          </div>
        );
      }else {
        return null;
      }
  };

  const handlePrevWeek = () => {
    setSelectedWeekStart(selectedWeekStart.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setSelectedWeekStart(selectedWeekStart.add(1, "week"));
  };

  return (
    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border gap-[20px] max-w-full text-left text-xl text-black font-poppins">
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-sm">
        <div className="self-stretch box-border flex flex-col items-end justify-start pt-[8px] pb-[5px] max-w-full text-left text-sm text-darkslateblue-100 font-poppins border-r-[1px] border-solid border-whitesmoke-200 border-b-[0px] border-l-[1px] pe-2">
          <div className="self-stretch flex flex-row items-center text-center justify-between max-w-full gap-[10px] mq750:flex-wrap mq1050:flex-wrap">
            <div className="flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap mq750:gap-[12px]">
              <div className="flex-1 flex text-center flex-row items-center justify-start gap-[0px] min-w-[240px]">
                {!qemp_id && (
                <img
                  className="h-[26px] w-[26px] relative object-contain min-h-[26px]"
                  loading="lazy"
                  alt=""
                  src="/arrowlefticon@2x.png"
                  onClick={handlePrevWeek}
                />
                )}
                <div className="flex-1 relative font-semibold inline-block min-w-[90px]">
                  {selectedWeekStart.format("D-MMM-YY")}
                </div>
                <div className="relative font-semibold inline-block min-w-[5px]">
                  -
                </div>
                <div className="flex-1 relative font-semibold inline-block min-w-[90px]">
                  {selectedWeekStart.endOf("week").format("D-MMM-YY")}
                </div>

                {!qemp_id && (
                <img
                  className="h-[26px] w-[26px] relative object-cover min-h-[26px]"
                  loading="lazy"
                  alt=""
                  src="/arrowrighticon@2x.png"
                  onClick={handleNextWeek}
                />
                )}
              </div>


              {qstart_week && qend_week ? (
                <WeekPicker
                value={[dayjs(qstart_week, "DD-MM-YYYY"), dayjs(qend_week, "DD-MM-YYYY")]}
                onChange={(week) => {
                setSelectedWeekStart(week[0]);
                }}
            
                />
              ) : (
                <WeekPicker
                value={selectedWeekStart}
                label="Select Date"
                setValue={(date) =>
                  setSelectedWeekStart(dayjs(date).startOf("week"))
                }

                /*onChange={(week) => {
                setSelectedWeekStart(week[0]);
                }}*/
                />
              )}


              {/*<WeekPicker
                value={selectedWeekStart}
                label="Select Date"
                setValue={(date) =>
                  setSelectedWeekStart(dayjs(date).startOf("week"))
                }
                style={{ paddingTop: "0px" }}
              />*/}
            </div>
            <div className="flex flex-row items-center w-[180px]">
              <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left">
                Status:{" "}
                <span
                  className={
                    status === "To Be Submitted"? "text-blue": status === "To Be Approved"? "text-danger":"text-success"
                  }
                >
                  {status}
                </span>
              </div>
            </div>
            <button className="border-[#DFE2EF] btn btn-outline-primary py-1 px-1 rounded-0 bg-white flex flex-row items-center justify-start gap-[4px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center">
              <img
                className="h-5 w-5 relative min-h-[20px] me-1"
                loading="lazy"
                alt=""
                src="/vuesaxlineardocumentdownload.svg"
              />
              
            </button>
          </div>
        </div>


      <div className="w-100 self-stretch box-border flex flex-col items-end justify-start pt-[8px] pb-[5px] max-w-full text-left text-sm text-darkslateblue-100 font-poppins border-r-[1px] border-solid border-whitesmoke-200 border-b-[0px] border-l-[1px] pe-2">
        <div className="w-100 self-stretch flex flex-row items-center text-center justify-between max-w-full gap-[10px] mq750:flex-wrap mq1050:flex-wrap">
          <div className="w-100 justify-between flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap mq750:gap-[12px]">
          <div className="relative text-sm font-semibold font-inter text-left pl-[15px]">
              Employee Name :
              <span className="text-royalblue-300 px-2">
                 { approvalEmployeeName ? approvalEmployeeName : localStorage.getItem("emp_UserName")}
              </span>
          </div>
          <div className="relative text-sm font-semibold font-inter text-left">
               Hours :
              <span className="text-royalblue-300 px-2">
                 {totalSum ? totalSum :0}/40
              </span>
          </div>
          {/*<div className="relative text-sm font-semibold font-inter text-left">
              Total Hours Reported:
              <span className="text-royalblue-300">
                 {totalSum}
              </span>
          </div>*/}
          {qemp_id &&(
          <div className="relative text-sm font-semibold font-inter text-left">
              Total Expenses:
              <span className="text-royalblue-300">
                 ₹{employeeExpenseAmount}
              </span>
          </div>)}
          </div>
        </div>
      </div>


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
             <Typography sx={{ mt: 5 }}>Please wait ...</Typography>
          </Box>
        ) : (

        <TimeReportTab
          selectedWeekStart={selectedWeekStart}
          rows={rows}
          expenses={expenses}
          status={status}
          setRows={setRows}
          setStatus={setStatus}
          setExpenses={setExpenses}
          totalHours= {totalHours}
          setTotalHours={setTotalHours}
          totalSum={totalSum}
          setTotalSum={setTotalSum}
          qemp_id = {qemp_id}
          qstart_week = {qstart_week} 
          qend_week ={qend_week}
          setApprovalEmployeeName={setApprovalEmployeeName}
          setEmployeeExpenseAmount={setEmployeeExpenseAmount}

        />
        )}
      </div>
      {status === "To Be Approved" && (
      <TextareaAutosize
          minRows={3}
          placeholder="Comments"
          value={comments}
          name="comments"
          onChange={handleCommentsChange}
          style={{ width: '100%', marginTop: '5px', padding: '2px' }}
        />
      )}
      <div className="flex items-start justify-end w-full pl-2">
        {renderActionButtons()}
      </div>
      {validationError && (<div className="text-red-500"><b>{validationError}</b></div>)}
    </div>
  );
};

export default TimeReportContent;
