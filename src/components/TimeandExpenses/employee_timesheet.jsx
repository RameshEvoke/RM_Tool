import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmployeeTimesheetDetails = () => {
  const { emp_id, start_week, end_week } = useParams();
  const [timesheetDetails, setTimesheetDetails] = useState([]);

  useEffect(() => {
    fetchEmployeeTimesheetDetails();
  }, [emp_id, start_week, end_week]);


  const fetchEmployeeTimesheetDetails = async () => {
    try {
      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/get_Employee_timeSheet?emp_id=${emp_id}&startOfWeek=${start_week}&endOfWeek=${end_week}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setTimesheetDetails(result);
    } catch (error) {
      console.error('Error fetching timesheet details:', error);
    }
  };

  return (
    <Box className="w-full relative bg-aliceblue-100 flex flex-col items-start justify-start text-left text-sm text-lightslategray-100 font-poppins">
      <Box className="flex-1 flex flex-col items-center justify-start gap={2} text-darkslateblue-100 font-header-header-2-bold-18">
        <Box className="self-stretch flex flex-col items-start justify-start pt-0 px={3} pb={3} gap={2} text-xl text-gray-300">
          <Box className="self-stretch flex flex-col items-start justify-start gap={2}">
            <Typography variant="h6" className="relative tracking-[-0.02em] leading-[30px] font-semibold">Employee Timesheet Details</Typography>
          </Box>
          <TableContainer component={Paper} className="shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.05)] rounded-8xs">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="body2" className="font-semibold">Week</Typography></TableCell>
                  <TableCell><Typography variant="body2" className="font-semibold">Planned Time</Typography></TableCell>
                  <TableCell><Typography variant="body2" className="font-semibold">Recorded Time</Typography></TableCell>
                  <TableCell><Typography variant="body2" className="font-semibold">Status</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timesheetDetails.map((detail) => (
                  <TableRow >
                    <TableCell>
                      <Typography variant="body2" className="relative tracking-[-0.04em] leading-[140%]">
                        {detail.Time_sheet_period}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="relative tracking-[-0.04em] leading-[140%]">
                        {detail.planned_hours}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="relative tracking-[-0.04em] leading-[140%]">
                        {detail.records_hours}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="relative tracking-[-0.04em] leading-[140%]">
                        {detail.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeTimesheetDetails;
