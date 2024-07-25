import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Timereport from "./Timereport";

import Expenses from "./Expenses";

const TimeReportTab = ({selectedWeekStart,rows,
  expenses,
  status,
  setRows,
  setStatus,
  setExpenses,
  totalHours,
  setTotalHours,
  totalSum,
  setTotalSum,
  qemp_id,
  qstart_week,
  qend_week,
  setApprovalEmployeeName,
  setEmployeeExpenseAmount

}) => {
  const [activeTab, setActiveTab] = useState("TimeReport");
  const location = useLocation();

  const [selectedAccount, setSelectedAccount] = useState("");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-100">
     <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 [row-gap:20px] text-left text-sm text-black font-poppins border-b-[1px] border-solid border-whitesmoke-200 lg:flex-wrap lg:pr-[463px] lg:box-border mq450:flex-wrap mq450:pl-5 mq450:pt-5 mq450:pr-5 mq450:box-border mq750:pr-[231px] mq750:box-border mq1125:pr-[463px] mq1125:box-border">
        <div
          className={`cursor-pointer ${activeTab === 'TimeReport' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('TimeReport')}
        >
        Time Report
        </div>
 
        <div
          className={`cursor-pointer ${activeTab === 'Expenses' ? 'font-semibold border-b-2 border-black' : 'text-gray-400'} bg-transparent flex flex-row items-center justify-center py-[9.5px] px-[15px] text-slategray-200 pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick('Expenses')}
        >
          Expenses
        </div>
      </div>

      <div>
        {activeTab === "TimeReport" && (
          <Timereport
            selectedWeekStart={selectedWeekStart}
            rows={rows}
            setRows={setRows}
            status={status}
            setStatus={setStatus}
            totalHours={totalHours}
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
        {activeTab === "Expenses" && (
          <Expenses
            selectedWeekStart={selectedWeekStart}
            rows={rows}
            expenses={expenses}
            setRows={setRows}
            status={status}
            setStatus={setStatus}
            setExpenses={setExpenses}
            // this is for for approve of employee
            qemp_id = {qemp_id}
            qstart_week = {qstart_week} 
            qend_week ={qend_week}
            setEmployeeExpenseAmount={setEmployeeExpenseAmount}
          />
        )}
      </div>
    </div>
  );
};

export default TimeReportTab;
