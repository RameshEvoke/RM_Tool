import { useState, useEffect } from "react";
import {
  CircularProgress,
  Snackbar,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const WorkflowRequest = () => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [empId, setEmpId] = useState(localStorage.getItem("emp_Id"));
  const [loading, setLoading] = useState(false);
  const [approvingAll, setApprovingAll] = useState(false); // State to track Approve All operation

  useEffect(() => {
    if (empId) {
      getEmployeeApprovals();
    } else {
      const interval = setInterval(() => {
        const storedEmpId = localStorage.getItem("emp_Id");
        if (storedEmpId) {
          setEmpId(storedEmpId);
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [empId]);

  const getEmployeeApprovals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Get_Timesheet_to_be_Approved?emp_id=${empId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setApprovalRequests(result);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRequests(approvalRequests.map((request) => request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRequests((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRequests((prevSelected) =>
        prevSelected.filter((requestId) => requestId !== id)
      );
    }
  };

  const handleApproveAll = async () => {
    setApprovingAll(true); // Set state to indicate Approve All in progress

    const requestsToApprove = approvalRequests.filter((request) =>
      selectedRequests.includes(request.id)
    );

    const approvalRequestData = requestsToApprove.map((requests) => ({
      emp_id: requests.emp_id,
      start_week: requests.start_week,
      end_week: requests.end_week,
      status: "approved",
    }));

    const approved_By = localStorage.getItem("emp_Id");

    const allEmployeeData = { approvalRequestData, approved_By };

    try {
      let apiUrl =
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/approve_all_timesheet";
      let method = "POST";

      const response = await fetch(apiUrl, {
        method: method,
        body: JSON.stringify(allEmployeeData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setSuccessMessage("Timesheets Approved successfully!");
        setOpenSnackbar(true);
        getEmployeeApprovals();
      } else {
        setSuccessMessage("Error:", response.statusText);
        setOpenSnackbar(true);
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setSuccessMessage("Error:", error);
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 5000);
      console.error("Error:", error);
    } finally {
      setApprovingAll(false); // Reset state after Approve All operation completes
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const approveSingleRequest = async (request, status) => {
    const approvalRequestData = [{
      emp_id: request.emp_id,
      start_week: request.start_week,
      end_week: request.end_week,
      status: status,
    }];
    const approved_By = localStorage.getItem("emp_Id");

    const allEmployeeData = { approvalRequestData, approved_By };

    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/approve_all_timesheet",
        {
          method: "POST",
          body: JSON.stringify(allEmployeeData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        setSuccessMessage(`Timesheet ${status} successfully!`);
        setOpenSnackbar(true);
        getEmployeeApprovals();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmployeeTimesheetDetails = (emp_id) => {
    //alert(emp_id);
  };

  return (
    <Box className="w-full relative bg-aliceblue-100 flex flex-col items-start justify-start text-left text-sm text-lightslategray-100 font-poppins">
      <Box className="w-100 flex-1 flex flex-col items-center justify-start gap={2} text-darkslateblue-100 font-header-header-2-bold-18">
        <Box className="self-stretch flex flex-col items-start justify-start pt-0 px={3} pb={3} gap={2} text-xl text-gray-300">
          <Box className="self-stretch flex flex-col items-start justify-start gap={2}">
            <Typography
              variant="h6"
              className="relative tracking-[-0.02em] leading-[30px] font-semibold"
            >
              My Workflow Requests
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              className="w-100"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedRequests.length === approvalRequests.length}
                      onChange={handleSelectAll}
                    />
                  }
                  label=""
                />
                <Typography
                  variant="body2"
                  className="relative tracking-[-0.03em] leading-[140%] capitalize font-semibold"
                >
                  Select All
                </Typography>
              </Box>
              <Button
                disableElevation
                color="primary"
                variant="contained"
                sx={{ borderRadius: 1 }}
                onClick={handleApproveAll}
                disabled={
                selectedRequests.length === 0 || approvingAll} // Disable Approve All when no requests selected or already approving
              >
                Approve All ({selectedRequests.length})
              </Button>
            </Box>
          </Box>

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
              <Typography sx={{ mt: 2 }}>Loading Approval Requests...</Typography>
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              className="shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.05)] rounded-8xs"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Select
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Requested by
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Period
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Time
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Expenses
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Date Initiated
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="font-semibold">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvalRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={selectedRequests.includes(request.id)}
                              onChange={(event) => handleSelect(event, request.id)}
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src="/profilepic@2x.png"
                            alt=""
                            className="w-[60px] rounded-11xl h-[60px] object-cover"
                          />
                          <Box ml={2}>
                            <Typography className="relative inline-block">
                              <span>Timesheet for </span>
                              <span className="font-semibold">
                                <Typography className="relative inline-block">
                                  <Link
                                    to={`/wbstimereporting/${request.emp_id}/${request.start_week}/${request.end_week}`}
                                    className="font-semibold"
                                    onClick={() =>
                                      getEmployeeTimesheetDetails(request.emp_id)
                                    }
                                  >
                                    {request.name}
                                  </Link>
                                </Typography>
                              </span>
                            </Typography>
                            <Typography
                              variant="body2"
                              className="relative tracking-[-0.04em] leading-[140%] text-slategray-300"
                            >
                              {request.role}, {request.location}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%]"
                        >
                          From:{" "}
                          <span className="text-text-colors-text-tints-ev-text-80">
                            {request.start_week}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%]"
                        >
                          To:{" "}
                          <span className="text-text-colors-text-tints-ev-text-80">
                            {request.end_week}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%]"
                        >
                          Planned Time:{" "}
                          <span className="text-text-colors-text-tints-ev-text-80">
                            {request.plannedTime}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%]"
                        >
                          Recorded Time:{" "}
                          <span className="text-text-colors-text-tints-ev-text-80">
                            {request.recordedTime}
                          </span>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%] text-text-colors-text-tints-ev-text-80"
                        >
                          ₹{request.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className="relative tracking-[-0.04em] leading-[140%] text-text-colors-text-tints-ev-text-80"
                        >
                          {request.dateInitiated}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          disableElevation
                          color="primary"
                          variant="contained"
                          sx={{ borderRadius: 1 }}
                          onClick={() =>
                            approveSingleRequest(request, "Approved")
                          }
                          disabled={selectedRequests.length !== 1 || !selectedRequests.includes(request.id)}
                        >
                          Approve
                        </Button>

                        <Button
                          disableElevation
                          color="primary"
                          variant="contained"
                          sx={{ borderRadius: 1}}
                          onClick={() =>
                            approveSingleRequest(request, "Rejected")
                          }
                          disabled={selectedRequests.length !== 1 || !selectedRequests.includes(request.id)}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default WorkflowRequest;
