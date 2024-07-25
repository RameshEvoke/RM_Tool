import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectDetail from "./ProjectManagement";
// import ClientDetails from "./ClientDetails";
import ResourceMapped from "./ResourceMapped";
import { useParams } from "react-router-dom";

const ProjectTab = () => {
  const [activeTab, setActiveTab] = useState("project");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountData, setAccountData] = useState({
    account_name: "",
    website: "",
    office: "",
    business_domain: "",
    relation_start_date: "",
  });

  const [accountDetails, setAccountDetails] = useState([]);

  const { account_id } = useParams();
  const location = useLocation();

  useEffect(() => {
    setSelectedAccount(account_id);
    fetchData(account_id);
    fetchAccountsDetails(account_id);
  }, [account_id]);

  const fetchAccountsDetails = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/associated_projects?account_id=${account_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setAccountDetails(result.account_data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData = async (account_id) => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/associated_projects?account_id=${account_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch account data");
      }
      const result = await response.json();
      const {
        account_name,
        website,
        office,
        business_domain,
        relation_start_date,
      } = result.account_data;
      setAccountData({
        account_name,
        website,
        office,
        business_domain,
        relation_start_date,
      });
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full p-4">
      <h4>Account Summary</h4>
      <div className="flex justify-between space-x-4">
        <div className="w-1/2 border rounded-md">
          <h3 className="text-xl mb-2  py-2">Evoke Information</h3>
          <div className="mb-2 px-2">
            <strong>Account Name:</strong> {accountDetails.account_name}
          </div>
          <div className="mb-2 px-2">
            <strong>Account Manager:</strong> ""
          </div>
          
          <div className="mb-2 px-2">
            <strong>Contact Info:</strong> 99**122, suresh.k@evoketechnologies.com
          </div>
          <div className="mb-2 px-2">
            <strong>Status:</strong> Active
          </div>
          <div className="mb-2 px-2">
            <strong>Industry:</strong> {accountData.business_domain}

          </div>
          <div className="mb-2 px-2">
            <strong>Location:</strong> Hyderabad
          </div>
        </div>

        <div className="w-1/2 border rounded-md ml-4">
          <h3 className="text-xl mb-2  py-2">Client Information</h3>
{/*          <img src="/solenis-1@2x.png" alt="Solenis Image" className="rounded-full h-15 w-15 mr-4 px-2" />
*/}          <div className="mb-2 px-2">
            <strong>Website:</strong> {accountData.website}
          </div>
          <div className="mb-2 px-2">
            <strong>Office:</strong> {accountData.office}
          </div>
          <div className="mb-2 px-2">
            <strong>Business Domain:</strong> {accountData.business_domain}
          </div>
          <div className="mb-2 px-2">
            <strong>Relation Start Date:</strong> {accountData.relation_start_date}
          </div>
          <div className="mb-2 px-2">
            <strong>Point Of Contact:</strong> ****
          </div>
          <div className="mb-2 px-2">
            <strong>Contact Info:</strong> 010-2323112
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start justify-start py-4 gap-20 text-left text-sm text-black font-poppins border-b-[1px] border-solid border-whitesmoke-200 lg:flex-wrap lg:pr-[463px] lg:box-border mq450:flex-wrap mq450:pl-5 mq450:pt-5 mq450:pr-5 mq450:box-border mq750:pr-[231px] mq750:box-border mq1125:pr-[463px] mq1125:box-border">
        <div
          className={`cursor-pointer ${
            activeTab === "project"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick("project")}
        >
          Projects
        </div>

        {/*<div
          className={`cursor-pointer ${
            activeTab === "client"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center py-[9.5px] px-[15px] text-slategray-200 pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick("client")}
        >
          Client Details
        </div>*/}
        <div
          className={`cursor-pointer ${
            activeTab === "resourcemapped"
              ? "font-semibold border-b-2 border-black"
              : "text-gray-400"
          } bg-transparent flex flex-row items-center justify-center pt-[9.5px] px-[15px] pb-2 whitespace-nowrap  border-solid border-black`}
          onClick={() => handleTabClick("resourcemapped")}
        >
          Employee Information
        </div>
      </div>

      <div>
        {activeTab === "project" && <ProjectDetail accountId={selectedAccount} />}
        {/*{activeTab === "client" && <ClientDetails />}*/}
        {activeTab === "resourcemapped" && <ResourceMapped />}
      </div>
    </div>
  );
};

export default ProjectTab;
