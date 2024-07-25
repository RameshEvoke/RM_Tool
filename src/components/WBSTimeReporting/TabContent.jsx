import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import updateLocale from 'dayjs/plugin/updateLocale';
import WeekPicker from './WeekPicker';
import TableComponent from './TableComponent';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });
moment.updateLocale('en', { week: { dow: 1 } });

const emp_id = localStorage.getItem('emp_Id');

const TabContent = ({ selectedWeekStart, handlePrevWeek, handleNextWeek,status,setStatus }) => {
  //debugger;
  const [rows, setRows] = useState([{}]);
  // const [status, setStatus] = useState('To Be Submitted');
  const [totalHours, setTotalHours] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalSum, setTotalSum] = useState();

  useEffect(() => {
    fetchData_TimeSheet();
  }, [selectedWeekStart]);

  const fetchData_TimeSheet = async () => {
    try {
      const empId = emp_id;
      const startOfWeek = selectedWeekStart.startOf('week').format('DD-MM-YYYY');
      const endOfWeek = selectedWeekStart.endOf('week').format('DD-MM-YYYY');

      const response = await fetch(`https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Employee_Weekly_TimeSheet?emp_id=${empId}&startOfWeek=${startOfWeek}&endOfWeek=${endOfWeek}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      if (result.data[0] !== "No Records found") {
        setRows(result.data);
        setTotalHours(result.totalHoursBasedOnDate);
        calculateTotalHours(result.data);
        setStatus(result.status);
      } else {
        setRows([{}]);
        setTotalHours({});
        setTotalSum('');
        setStatus('To Be Submitted');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const calculateTotalHours = (data) => {
    let totalHoursSum = 0;
    data.forEach(row => {
      totalHoursSum += row['Total Hours'];
    });
    setTotalSum(totalHoursSum);
  };

  const handleAddRow = () => {
    const newRow = {};
    setRows([...rows, newRow]);
  };

  const handleSave = () => {
    //alert("Saved data");
  };

  const handleApprove = () => {
    setStatus('Approved');
  };

  const handleWithdraw = () => {
    setStatus('To Be Submitted');
    setIsSubmitted(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="self-stretch box-border flex flex-col items-end justify-start pt-[8px] pb-[5px] max-w-full text-left text-sm text-darkslateblue-100 font-poppins border-r-[1px] border-solid border-whitesmoke-200 border-b-[0px] border-l-[1px] pe-2">
        <div className="self-stretch flex flex-row items-center text-center justify-between max-w-full gap-[10px] mq750:flex-wrap mq1050:flex-wrap">
          <div className="flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap mq750:gap-[12px]">
            <div className="flex-1 flex text-center flex-row items-center justify-start gap-[0px] min-w-[240px]">
            </div>
  
          </div>
          {status !== 'Approved' &&
            (<button className="border-[#DFE2EF] btn btn-outline-primary py-2 px-3 rounded-0 bg-white flex flex-row items-center justify-start gap-[5px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center" onClick={handleAddRow} >
              <img className="h-5 w-5 relative min-h-[20px] me-1" loading="lazy" src="/addicon.svg" />
              <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block min-w-[61px]">
                Add Row
              </div>
            </button>)}

          </div>
          </div>
<TableComponent
        rows={rows}
        selectedWeekStart={selectedWeekStart}
        setRows={setRows}
        handleSave={handleSave}
        handleWithdraw={handleWithdraw}
        handleApprove={handleApprove}
        totalHours={totalHours}
        setTotalHours={setTotalHours}
        totalSum={totalSum}
        setTotalSum={setTotalSum}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        fetchData_TimeSheet={fetchData_TimeSheet}
        status={status}
        setStatus={setStatus}
      />
    </LocalizationProvider>
  );
};

export default TabContent;
