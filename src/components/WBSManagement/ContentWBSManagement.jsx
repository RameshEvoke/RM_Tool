import WBSContentBasicDetails from "./WBSContentBasicDetails";
import WBSContentProjectEstimate from "./WBSContentProjectEstimate";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const ContentWBSManagement = () => {
  const [basicDetails, setBasicDetails] = useState({});
  const [projectEstimate, setProjectEstimate] = useState({});
  const [managementData, setManagementData] = useState({});

  const handleSubmit = () => {
    // Create a JSON payload with data from all components
    const payload = {
      basicDetails: basicDetails,
      projectEstimate: projectEstimate,
      managementData: managementData,
    };

    // Perform any action with the payload, such as sending it to an endpoint
    console.log("Submitted Payload:", payload);
  };

  // useEffect to update the state variables with the submitted data on page load or refresh
  // useEffect(() => {
  //   // Sample submitted data (replace this with actual submitted data)
  //   const submittedData = {
  //     basicDetails: {
  //       project: "PMO",
  //       wbs: "PMO-2024",
  //       approver: "Hari Prasad Ala",
  //       status: "Draft",
  //       version: "V1",
  //     },
  //     projectEstimate: {
  //       plannedHours: 150,
  //       plannedCost: 200,
  //     },
  //     managementData: {
  //       Resources: [
  //         {
  //           resourceName: "Kamyaka Kasani",
  //           id: "2001",
  //           startDate: "13 Jun 2024",
  //           endDate: "16 Jun 2024",
  //           totalHours: 50,
  //           totalCost: 100,
  //           grantedBy: "Avinash ",
  //           grantedOn: "13 Jun 2024",
  //           collapseTable: {
  //             "Jan-24": "",
  //             "Feb-24": "",
  //             "Mar-24": "",
  //             "Apr-24": "",
  //             "May-24": "",
  //             "Jun-24": "50",
  //             "Jul-24": "",
  //             "Aug-24": "",
  //             "Sep-24": "",
  //             "Oct-24": "",
  //             "Nov-24": "",
  //             "Dec-24": "",
  //           },
  //         },
  //         {
  //           resourceName: "Vedika",
  //           id: "2005",
  //           startDate: "13 Jun 2024",
  //           endDate: "30 Jun 2024",
  //           totalHours: 100,
  //           totalCost: 100,
  //           grantedBy: "Shreyanka Kalvacharla",
  //           grantedOn: "13 Jun 2024",
  //           collapseTable: {
  //             "Jan-24": "",
  //             "Feb-24": "",
  //             "Mar-24": "",
  //             "Apr-24": "",
  //             "May-24": "",
  //             "Jun-24": "100",
  //             "Jul-24": "",
  //             "Aug-24": "",
  //             "Sep-24": "",
  //             "Oct-24": "",
  //             "Nov-24": "",
  //             "Dec-24": "",
  //           },
  //         },
  //       ],
  //     },
  //   };

  //   // Update state variables with submitted data
  //   setBasicDetails(submittedData.basicDetails);
  //   setProjectEstimate(submittedData.projectEstimate);
  //   setManagementData(submittedData.managementData);
  // }, []);

  return (
    <div
      style={{ width: "100%" }}
      className="self-stretch flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border max-w-full text-left text-xl text-black font-poppins"
    >
      <h3 className="m-0 relative text-inherit font-semibold font-inherit mq450:text-base mb-4">
        WBS Access Management
      </h3>
      <div className="self-stretch flex flex-col items-start justify-start max-w-full text-sm border border-whitesmoke-200  rounded-t-[20px] border-1">
        <WBSContentBasicDetails
          setBasicDetails={setBasicDetails}
          basicDetails={basicDetails} // Pass basicDetails as prop
        />
        <WBSContentProjectEstimate
          setProjectEstimate={setProjectEstimate}
          setManagementData={setManagementData}
          projectEstimate={projectEstimate}
          managementData={managementData} // Pass projectEstimate as prop
        />
      </div>
      <div className="bg-[#F2F4FB] py-3 px-4 w-100 rounded-b-[20px] justify-content-end flex">
        <Button
          onClick={handleSubmit}
          className="px-4 me-3"
          style={{
            background: "#C2C2C2",
            fontSize: "13px",
            fontWeight: 700,
            color: "#38355b",
          }}
        >
          SUBMIT
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-4"
          style={{
            background: "#C2C2C2",
            fontSize: "13px",
            fontWeight: 700,
            color: "#38355b",
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default ContentWBSManagement;
