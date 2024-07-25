import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField,Snackbar } from '@mui/material';
import dayjs from 'dayjs';


const columns = [
  { label: 'WBS' },
  { label: 'Mon' },
  { label: 'Tue' },
  { label: 'Wed' },
  { label: 'Thu' },
  { label: 'Fri' },
  { label: 'Sat' },
  { label: 'Sun' },
  { label: 'Total Hours' },
  { label: 'Action' },
];

const emp_id = localStorage.getItem('emp_Id');

export default function ColumnGroupingTable ({ selectedWeekStart, rows, setRows, handleSave, handleWithdraw, handleApprove,status,setStatus ,totalHours,setTotalHours,totalSum,setTotalSum,isSubmitted,setIsSubmitted,fetchData_TimeSheet}) {

  const startOfWeek = selectedWeekStart.startOf('week').format('DD-MM-YYYY');
  const endOfWeek = selectedWeekStart.endOf('week').format('DD-MM-YYYY');

// const [formSubmitted, setFormSubmitted] = useState(false);
//const [isSubmitted, setIsSubmitted] = useState(false);
const [validationError, setValidationError] = useState('');
const [wbsData, setWbsData] = useState([]);
const [expenses,setExpenses] = useState([]);

const [successMessage, setSuccessMessage] = useState('');
const [openSnackbar, setOpenSnackbar] = useState(false);

    
  useEffect(() => {
    fetchData();
    getExpenses();


      if (validationError) {
      const timer = setTimeout(() => {
        setValidationError('');
      }, 5000);
      return () => clearTimeout(timer);
    }

    const submitListener = (event) => {
      handleSubmit(event.detail);
    };
//debugger;
    document.addEventListener('submitClicked', submitListener);
    
     return () => {
      document.removeEventListener('submitClicked', submitListener);
    };


  }, [validationError,rows]);


/*setTimeout(() => {
  setValidationError();
}, 15000);*/


const getExpenses = async() => {
try {
      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Expenses?emp_id=${emp_id}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      setExpenses(result);
    } catch (error) {
      console.log('error', error);
    }
}



const fetchData = async () => {
    try {
      const empId = emp_id;
    const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/employee_project_details?emp_id=${empId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      setWbsData(result.WBS_ID);
    } catch (error) {
      console.log('error',error)
    }
  };


// const renderActionButtons = () => {
//     const currentWeekStart = dayjs().startOf('week').format('DD-MMM-YY');
 
//     const isCurrentOrPastWeek = selectedWeekStart.isBefore(currentWeekStart) || selectedWeekStart.isSame(currentWeekStart, 'day');
 
//     if (status === 'To Be Submitted') {
//       return (
//         <>
//           {isCurrentOrPastWeek && (
//             <Button
//               style={{
//                 backgroundColor: "#4169E1",
//                 height: '33px',
//                 borderRadius: '0px',
//                 boxShadow: 'none',
//                 alignItems: 'left'
//               }}
//               variant="contained"
//               size="large"
//               onClick={() => handleSubmit('Submit')}
//               disabled={formSubmitted}
//             >
//               Submit
//             </Button>
//           )}
 
//           <Button
//             style={{
//               backgroundColor: "#4169E1",
//               height: '33px',
//               borderRadius: '0px',
//               boxShadow: 'none',
//               alignItems: 'left'
//             }}
//             variant="contained"
//             size="large"
//             onClick={() => handleSubmit('Save')}
//             disabled={formSubmitted}
//           >
//             Save
//           </Button>
//         </>
//       );
//     } else if (status === 'To Be Approved') {
//       return (
//         <>
//           <Button
//             style={{
//               backgroundColor: "#4169E1",
//               height: '33px',
//               borderRadius: '0px',
//               boxShadow: 'none',
//               alignItems: 'left'
//             }}
//             variant="contained"
//             size="large"
//             onClick={handleWithdraw}
//           >
//             Withdraw
//           </Button>
//           <Button
//             style={{
//               backgroundColor: "#4169E1",
//               height: '33px',
//               borderRadius: '0px',
//               boxShadow: 'none',
//               alignItems: 'left'
//             }}
//             variant="contained"
//             size="large"
//             onClick={() => handleSubmit('Approve')}
//           >
//             Approve
//           </Button>
//         </>
//       );
//     } else {
//       return null;
//     }
//   };

const updatedColumns = columns.map((column, index) => {
  if (index === 0 || index === columns.length - 2 || index === columns.length - 1) 
    return column;
  //const date = selectedWeekStart.startOf('week').add(index - 1, 'day').format('D-MMM-YY').toUpperCase();
      const date = selectedWeekStart.startOf('week').add(index - 1, 'day').format('DD-MMM-YY');
    return { ...column, date };
});



const handleChange = (event, rowIndex, colIndex) => {

  let totalHoursForRow = 0;
  const updatedRows = [...rows];

  const newValue = event.target.value || 0;

    if (colIndex === 0) {
      updatedRows[rowIndex]['WBS'] = newValue;
    } else if (colIndex >= 1 && colIndex <= 7) {

      if (/^\d*\.5$|^[0-8]$/.test(newValue)) {

        if(newValue <=8 && newValue % 0.5 === 0){

        updatedRows[rowIndex][updatedColumns[colIndex].date] = newValue || 0;
      }else{
       setValidationError(`Please Enter Proper Hours like 0.5 or 1,2,3....`); 
      }
      }else{
        //alert('Please Enter Valid Number');
        setValidationError(`Please Enter 0 to 8 or 0.5 or 1.5 like......`); 
      }
    }

    for (let i = 1; i <= 7; i++) {
      const value = parseFloat(updatedRows[rowIndex][updatedColumns[i].date]) || 0;
      totalHoursForRow += value;
    }

    updatedRows[rowIndex]['Total Hours'] = parseFloat(totalHoursForRow.toFixed(1));
    setRows(updatedRows);
    updateTotalHours(updatedRows);

};


const handleSubmit = async (button) => {

  //setFormSubmitted(true);
  let apiUrl;
  let req_status ='';
  let displayMsg ='';
  let validate = true;
  try {

  if(button === 'Submit'){
     req_status = 'To Be Approved';
     displayMsg = 'Data Submitted Successfully';
  }else if(button === 'Save'){
     req_status = 'To Be Submitted';
     validate = false;
     displayMsg = 'Data Saved Successfully';
  }else if(button === 'Approve'){
    displayMsg = 'Data Approved Successfully';
     req_status = 'Approved';
  }

    const postData = saveToLocalStorage(rows,validate);
    const parsedData = JSON.parse(postData);

  if(parsedData !== false){

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
      if (!row['WBS']) {
        setValidationError(`Please Select The WBS in row ${i + 1}.`);
        return false;
      }
    }

    if(validate && !JSON.parse(postData)){
      return false;
    }
    
  const startOfWeek = selectedWeekStart.startOf('week').format('DD-MM-YYYY');
  const endOfWeek = selectedWeekStart.endOf('week').format('DD-MM-YYYY');
  
  const status = req_status;

  const postDataWithWeek = { ...JSON.parse(postData), startOfWeek, endOfWeek,status };

  if(button === 'Submit'){
    apiUrl ='https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheetSubmission';
  }else{
    apiUrl ='https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheetSubmission';
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    // Add any other headers as needed
    },
    body: JSON.stringify(postDataWithWeek),
  });

  // Check if the request was successful
  if (response.ok) {
    setSuccessMessage('Timesheet Saved successfully!');
    setOpenSnackbar(true);
    setValidationError(displayMsg);
    fetchData_TimeSheet();
  } else {
    console.log('Failed to submit data. Please try again later.');
    //alert('Failed to submit data. Please try again later.');
  }
}
  } catch (error) {
    console.log('Submittion error',error)
  }
};


const updateTotalHours = (updatedRows) => {

  const updatedTotalHours = {};
  let totalSum = 0;
  updatedRows.forEach((row,index) =>  {
  for (const [key, value] of Object.entries(row)) {

      if (key !== 'WBS' && key !== 'Total Hours') {
        if (updatedTotalHours[key]) {
          updatedTotalHours[key] += parseFloat(row[key]);
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

const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
};

const saveToLocalStorage = (rows,validate) => {

  const selectedWBS = new Set();
  for (let i = 0; i < rows.length; i++) {
    const currentWBS = rows[i]['WBS'];
    
    if (validate && selectedWBS.has(currentWBS)) {
      setValidationError(`WBS '${currentWBS}' selected multiple times.`);
      return false;
    } else {
      selectedWBS.add(currentWBS);
    }
  }

  //const rowData = [];
  const totalHoursBasedOnDate = {};
  rows.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
        // Skip non-date keys
        if (key !== 'WBS' && key !== 'Total Hours') {
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

    if(day !== 0 && day !== 6){
      if (validate && hours > 8) {
      setValidationError(`Hours exceeded for date ${date}. Max Allowed hours:8 `);
      return false;
    }
    if (validate && hours < 8) {
      setValidationError(`Please maintain 8 Hours per Day for this date : ${date}`);
      return false;
    }
    }    
  }

  // Create the final object with the "data" property containing the row data array
  const finalObject = {
      emp_id:emp_id,
      data: rows,
      expenses:expenses,
      totalHoursBasedOnDate: totalHoursBasedOnDate
  };
  //return;
  return JSON.stringify(finalObject);
  
};



  const handleDeleteRow = async (rowIndex) => {

    const updatedRows = rows.filter((_, index) => index !== rowIndex);
    const startOfWeek = selectedWeekStart.startOf('week').format('DD-MM-YYYY');
    const endOfWeek = selectedWeekStart.endOf('week').format('DD-MM-YYYY');

    const finalObject = {
      emp_id:emp_id,
      data: [
        { "WBS":rows[rowIndex].WBS},
      ],
      startOfWeek:startOfWeek,
      endOfWeek:endOfWeek
    };

    const response = await fetch('https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/TimeSheet_Deletion', {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      },
        body: JSON.stringify(finalObject),
      });

    // Check if the request was successful
    if (response.ok) {
        setSuccessMessage('Timesheet deleted successfully!');
        setOpenSnackbar(true);
      setRows(updatedRows);
      updateTotalHours(updatedRows);
    } else {
      alert('Failed to submit data. Please try again later.');
    }
  };
  
  
  return (
    <Paper variant="elevation" sx={{ width: '100%', boxShadow: '0 0 0 0' }}>
      <TableContainer sx={{ maxHeight: 440 }} className='py-2 px-2 border border-whitesmoke-200 border-top-0'>
        <Table style={{ width: '100%' }} className='table-auto overflow-visible table-bordered border border-gray-200' sx={{ '& .MuiTableCell-root': {} }} stickyHeader aria-label="sticky table">
          <TableHead style={{ width: '100%' }} className="bg-[#E8EBF9] text-slategray-100 text-xs sticky">
            <TableRow style={{ backgroundColor: "#E8EBF9", color: "#6e7391", width: '100%' }}>
              {updatedColumns.map((column, index) => (
                <TableCell
                  className='text-uppercase px-2 py-1 fw-medium' key={index} align="center" width={column.width || 'auto'}
                  style={
                    (column?.label?.includes('Sat') || column?.label?.includes('Sun')) ? {backgroundColor: '#dde1f2',color: 'inherit',lineHeight: '1.1rem',fontSize: '14px'} : {
                      backgroundColor: 'inherit',
                      color: 'inherit',
                      lineHeight: '1.1rem',
                      fontSize: '14px'
                    }
                  }
                >

                  {column.date && <><span className='whitespace-nowrap'>{column.date}</span><br /></>}
                  <span style={{ fontSize: column.label === 'WBS' || column.label === 'Total Hours' || column.label === 'Action' ? '14px' : '12px' }}>
                    {column.label}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className=''>
            {rows.map((row, rowIndex) => (

              <TableRow key={rowIndex} className='even:bg-[#e8f7ff]'>

                {updatedColumns.map((column, colIndex) => (
                  <TableCell className='px-2 py-1 border-0'
                    key={colIndex}
                    align="center"
                    style={
                      (column?.label?.includes('Sat') || column?.label?.includes('Sun')) ? {
                        backgroundColor: '#dde1f2',
                        color: '#000000'
                      } : {
                        backgroundColor: ''
                      }}
                  >
                    {colIndex === 0 ? (
                      <Select
                      fullWidth
                      value={row['WBS'] || ''}
                      align='left'
                      width='auto'
                      onChange={(event) => handleChange(event, rowIndex, colIndex)}
                      SelectDisplayProps={{ className: 'px-1 py-1' }}
                      disabled={status === 'To Be Approved' || status === 'Approved'}
                    >
                      {wbsData.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                      
                    </Select>

                    ) : colIndex === updatedColumns.length - 1 ? (
                      <div style={{ display: 'flex' }}>

                        <IconButton onClick={() => handleDeleteRow(rowIndex)} disabled={status === 'Approved' ||status === 'To Be Approved'}> <DeleteIcon /></IconButton>
                      </div>
                    ) : 
                    (
                      <TextField type ="number" value={column.label === 'Total Hours' ? row['Total Hours'] || '' : row[column.date] || ''}
                      sx={{ '& fieldset': { backgroundColor: '#fff' }, '& input': { zIndex: 1 }, className: 'py-2 text-xs' }}
                      /*inputProps={{ className: 'py-1 px-1 text-xs' }}*/
                      inputProps={{ step: 0.5,min: 0,max: 8,className: 'py-1 px-1 text-xs', inputMode: 'decimal', pattern: '^\\d*\\.?\\d*$' }}
                      style={{ width: column.label === 'Total Hours' ? '60px' : '40px' }}
                      onChange={(event) => handleChange(event, rowIndex, colIndex)}
                      disabled={status === 'To Be Approved' || status === 'Approved'}
                    />
                    
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow style={{ backgroundColor: "#e9ebfb" }}>
              {updatedColumns.map((column, colIndex) => (
                <TableCell key={colIndex} align="center" className=''
                  style={
                    (colIndex === 6 || colIndex === 7) ? {
                      backgroundColor: '#dde1f2',
                      color: '#000000',
                      fontSize: "1.2rem"
                    } : {
                      backgroundColor: '#dde1f2',
                      color: '#000000',
                      fontSize: "1.2rem",
                      padding: (colIndex === columns.length - 1) && '0px'
                    }}>
                    
                  {colIndex === 0 ? ("Total Hours") : (totalHours[column.date])}
                  {colIndex === 8 ? (totalSum) : ''}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />

      {validationError && <div className="text-red-500"><b>{validationError}</b></div>}
    </Paper>


  );
}
//export default ColumnGroupingTable;