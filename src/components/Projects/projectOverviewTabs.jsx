import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProjectOverview from "./ProjectOverview";
import ResourceAllocation from "./ResourceAllocation"
import Expenses from "./Expenses"
import FinanceMetrics from "./FinanceMetrics"
import Invoice from "./Invoice"

const ProjectOverviewTabs = () => {
  const [activeTab, setActiveTab] = useState("projectOverview");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountData, setAccountData] = useState({
    account_name: "",
    website: "",
    office: "",
    business_domain: "",
    relation_start_date: "",
  });

  const { account_id } = useParams();
  const location = useLocation();

  useEffect(() => {
    setSelectedAccount(account_id);
  }, [account_id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 gap-20 text-left text-sm text-black font-poppins border-b-[1px] border-solid border-whitesmoke-200 lg:flex-wrap lg:pr-[463px] lg:box-border mq450:flex-wrap mq450:pl-5 mq450:pt-5 mq450:pr-5 mq450:box-border mq750:pr-[231px] mq750:box-border mq1125:pr-[463px] mq1125:box-border mt-4">
        <div
          className={`cursor-pointer ${
            activeTab === "projectOverview"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap border-solid border-black`}
          onClick={() => handleTabClick("projectOverview")}
        >
          Project Overview
        </div>

        <div
          className={`cursor-pointer ${
            activeTab === "ResourceAllocation"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center py-[9.5px] px-[15px] text-slategray-200 pb-2 whitespace-nowrap border-solid border-black`}
          onClick={() => handleTabClick("ResourceAllocation")}
        >
          Resource Allocation
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Expenses"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap border-solid border-black`}
          onClick={() => handleTabClick("Expenses")}
        >
          Expenses
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "FinanceMetrics"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap border-solid border-black`}
          onClick={() => handleTabClick("FinanceMetrics")}
        >
          Finance Metrics
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "Invoices"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap border-solid border-black`}
          onClick={() => handleTabClick("Invoices")}
        >
          Invoices
        </div>
      </div>

      <div>
        {activeTab === "projectOverview" && <ProjectOverview />}
        {activeTab === "ResourceAllocation" && <ResourceAllocation />}
        {activeTab === "Expenses" && <Expenses />}
        {activeTab === "FinanceMetrics" && <FinanceMetrics />}
        {activeTab === "Invoices" && <Invoice />}
      </div>
    </div>
  );
};

export default ProjectOverviewTabs;
