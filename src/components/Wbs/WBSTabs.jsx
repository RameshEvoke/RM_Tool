import React, { useState } from 'react';
import WbsTimeReporting from './WbsTimeReporting';
import WbsExpenses from './WbsExpenses';

const WBSTabs = () => {
  const [activeTab, setActiveTab] = useState('wbstimeReporting'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };

  return (
    <div className ="w-100">
      <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 [row-gap:20px] text-left text-sm text-black font-poppins border-b-[1px] border-solid border-whitesmoke-200 lg:flex-wrap lg:pr-[463px] lg:box-border mq450:flex-wrap mq450:pl-5 mq450:pt-5 mq450:pr-5 mq450:box-border mq750:pr-[231px] mq750:box-border mq1125:pr-[463px] mq1125:box-border">
        <div
          className={`cursor-pointer ${activeTab === 'wbstimeReporting' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('wbstimeReporting')}
        >
          WBS Time reporting
        </div>

        <div
          className={`cursor-pointer ${activeTab === 'wbsexpenses' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center py-[9.5px] px-[15px] text-slategray-200 pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('wbsexpenses')}
        >
          WBS Expenses
        </div>
      </div>

      <div>
        {activeTab === 'wbstimeReporting' && <WbsTimeReporting />}
        {activeTab === 'wbsexpenses' && <WbsExpenses />}
      </div>
    </div>



  );
};

export default WBSTabs;
