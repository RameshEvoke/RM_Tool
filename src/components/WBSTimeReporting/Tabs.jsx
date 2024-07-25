import React, { useState } from 'react';
import ExpenseTabContent from './ExpenseTabContent';
import TabContent from './TabContent';

const Tabs = ({ selectedWeekStart,handlePrevWeek,handleNextWeek,status,setStatus,activeTab,setActiveTab}) => {

  
  //const [activeTab, setActiveTab] = useState('timeReporting'); 

const startOfWeek = selectedWeekStart.startOf('week').format('DD-MM-YYYY');
const endOfWeek = selectedWeekStart.endOf('week').format('DD-MM-YYYY');
  

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };

  return (
  <div className='w-100'>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[927px] pl-0 [row-gap:20px] text-left text-sm text-black font-poppins border-b-[1px] border-solid border-whitesmoke-200 lg:flex-wrap lg:pr-[463px] lg:box-border mq450:flex-wrap mq450:pl-5 mq450:pt-5 mq450:pr-5 mq450:box-border mq750:pr-[231px] mq750:box-border mq1125:pr-[463px] mq1125:box-border">
        <div
          className={`cursor-pointer ${activeTab === 'timeReporting' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('timeReporting')}
        >
          Time reporting
        </div>

        <div
          className={`cursor-pointer ${activeTab === 'expenses' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center py-[9.5px] px-[15px] text-slategray-200 pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('expenses')}
        >
          Expenses
        </div>
      </div>


      <div>
        {activeTab === 'timeReporting' && <TabContent selectedWeekStart = { selectedWeekStart } status ={status} setStatus={setStatus}/>}
        {activeTab === 'expenses'  && <ExpenseTabContent startOfWeek = { startOfWeek } endOfWeek ={endOfWeek} status ={status}/>}
      </div>
    </div>
  );
};

export default Tabs;
