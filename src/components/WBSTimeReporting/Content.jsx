import Tabs from "./Tabs";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import updateLocale from 'dayjs/plugin/updateLocale';
import WeekPicker from './WeekPicker';
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';


//import ExpenseTabContent from './ExpenseTabContent';
//import TabContent from './TabContent';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', { weekStart: 1 });
moment.updateLocale('en', { week: { dow: 1 } });


const Content = () => {
  const [selectedWeekStart, setSelectedWeekStart] = useState(dayjs().startOf('week'));
  const [status, setStatus] = useState('To Be Submitted');
  const [formSubmitted, setFormSubmitted] = useState(false);


  const [activeTab, setActiveTab] = useState('timeReporting');


const handlePrevWeek = () => {
  setSelectedWeekStart(selectedWeekStart.subtract(1, 'week'));
};

const handleNextWeek = () => {
  setSelectedWeekStart(selectedWeekStart.add(1, 'week'));
};


const handleSubmit = (button) => {
    const submitEvent = new CustomEvent('submitClicked', { detail: button });
    document.dispatchEvent(submitEvent);
};


const handleWithdraw = () => {
    setStatus('To Be Submitted');
    //setIsSubmitted(false);
  };

const renderActionButtons = () => {
  const currentWeekStart = dayjs().startOf('week').format('DD-MMM-YY');

  const isCurrentOrPastWeek = selectedWeekStart.isBefore(currentWeekStart) || selectedWeekStart.isSame(currentWeekStart, 'day');

  if (status === 'To Be Submitted') {
    return (
      <>
        {isCurrentOrPastWeek && (
          <Button
            style={{
              backgroundColor: "#4169E1",
              height: '33px',
              borderRadius: '0px',
              boxShadow: 'none',
              alignItems: 'left'
            }}
            variant="contained"
            size="large"
            onClick={() => handleSubmit('Submit')}
            disabled={formSubmitted}
          >
            Submit
          </Button>
        )}

        <Button
          style={{
            backgroundColor: "#4169E1",
            height: '33px',
            borderRadius: '0px',
            boxShadow: 'none',
            alignItems: 'left'
          }}
          variant="contained"
          size="large"
          onClick={() => handleSubmit('Save')}
          disabled={formSubmitted}
        >
          Save
        </Button>
      </>
    );
  } else if (status === 'To Be Approved') {
    return (
      <>
        <Button
          style={{
            backgroundColor: "#4169E1",
            height: '33px',
            borderRadius: '0px',
            boxShadow: 'none',
            alignItems: 'left'
          }}
          variant="contained"
          size="large"
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
        {/*<Button
          style={{
            backgroundColor: "#4169E1",
            height: '33px',
            borderRadius: '0px',
            boxShadow: 'none',
            alignItems: 'left'
          }}
          variant="contained"
          size="large"
          onClick={() => handleSubmit('Approve')}
        >
          Approve
        </Button>*/}
      </>
    );
  } else {
    return null;
  }
};
  return (
    <div className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border gap-[0px] max-w-full text-left text-xl text-black font-poppins">
      <h3 className="m-0 relative text-inherit font-semibold font-inherit mq450:text-base">
        Time & Expenses Reporting
      </h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="self-stretch box-border flex flex-col items-end justify-start pt-[8px] pb-[5px] max-w-full text-left text-sm text-darkslateblue-100 font-poppins border-r-[1px] border-solid border-whitesmoke-200 border-b-[0px] border-l-[1px] pe-2">
        <div className="self-stretch flex flex-row items-center text-center justify-between max-w-full gap-[10px] mq750:flex-wrap mq1050:flex-wrap">
          <div className="flex flex-row items-center justify-start gap-[10px] max-w-full mq750:flex-wrap mq750:gap-[12px]">
            <div className="flex-1 flex text-center flex-row items-center justify-start gap-[0px] min-w-[240px]">
              <img
                className="h-[26px] w-[26px] relative object-contain min-h-[26px]"
                loading="lazy"
                alt=""
                src="/arrowlefticon@2x.png"
                onClick={handlePrevWeek}
              />
              <div className="flex-1 relative font-semibold inline-block min-w-[90px]">
                {selectedWeekStart.format('D-MMM-YY')}
              </div>
              <div className="relative font-semibold inline-block min-w-[5px]">-</div>
              <div className="flex-1 relative font-semibold inline-block min-w-[90px]">
                {selectedWeekStart.endOf('week').format('D-MMM-YY')}
              </div>
              <img
                className="h-[26px] w-[26px] relative object-cover min-h-[26px]"
                loading="lazy"
                alt=""
                src="/arrowrighticon@2x.png"
                onClick={handleNextWeek}
              />
            </div>
            <WeekPicker
              value={selectedWeekStart}
              label="Select Date"
              setValue={(date) => setSelectedWeekStart(dayjs(date).startOf('week'))}
              style={{ paddingTop: '0px' }}
            />
          </div>
          <div className="flex flex-row items-center w-[180px]">
            <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left">
              Status: <span className={status === 'To Be Submitted' ? 'text-blue' : status === 'To Be Approved' ? 'text-danger' : 'text-success'}>{status}</span>
            </div>
          </div>
      <button className="border-[#DFE2EF] btn btn-outline-primary py-2 px-2 rounded-0 bg-white flex flex-row items-center justify-start gap-[5px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center">
            <img className="h-5 w-5 relative min-h-[20px] me-2" loading="lazy" alt="" src="/vuesaxlineardocumentdownload.svg" />
            <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block min-w-[120px]">
              Export Excel Data
            </div>
          </button>
          </div>
          </div>
          </LocalizationProvider>
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-sm">
        <Tabs selectedWeekStart={selectedWeekStart} handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek} status={status} setStatus={setStatus} activeTab={activeTab}
          setActiveTab={setActiveTab}/>
      </div>
      <div className="flex flex-row justify-end gap-2 mt-4 w-100">
        
        {activeTab === 'timeReporting' && renderActionButtons()} 
      {/* {renderActionButtons()}*/}
      </div>
    </div>
  );
};

export default Content;
