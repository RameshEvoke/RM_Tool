import { useState, useEffect } from "react";
import WBSContentManagement from "./WBSContentManagement";

const WBSContentProjectEstimate = ({
  projectEstimate,
  setProjectEstimate,
  managementData,
  setManagementData,
}) => {
  // const [plannedDuration, setPlannedDuration] = useState({
  //   months: 0,
  //   days: 0,
  // });
  const [plannedHours, setPlannedHours] = useState("");
  const [plannedCost, setPlannedCost] = useState("");

  const constructProjectEstimateJSON = () => {
    return {
      // plannedDuration: plannedDuration,
      plannedHours: plannedHours,
      plannedCost: plannedCost,
    };
  };

  useEffect(() => {
    const projectEstimate = constructProjectEstimateJSON();
    console.log("projectEstimate", projectEstimate);
    setProjectEstimate(projectEstimate);
  }, [plannedHours, plannedCost]);

  return (
    <div className="w-100">
      <div className="py-4 px-3 pe-2 border border-t-0 border-b-2 border-whitesmoke-200 rounded-b-[20px] w-100 border-x-0">
        <h5 className="text-darkslateblue-100 fw-bold mb-3">
          Project Estimation
        </h5>

        <div className="row">
          <div className="col-4">
            <label className="text-slategray-200 mb-1 d-block">
              Planned Hours
            </label>

            <div className="text-royalblue-200 fw-bold text-xl">
              {plannedHours}
            </div>
          </div>

          <div className="col-5">
            <label className="text-slategray-200 mb-1 d-block">
              Planned Duration
            </label>

            <div className="text-royalblue-200 fw-bold text-xl">
              0 months & 0 days
            </div>
          </div>

          <div className="col-3">
            <label className="text-slategray-200 mb-1 d-block">
              Planned Costs
            </label>

            <div className="text-royalblue-200 fw-bold text-xl">
              {plannedCost}
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 px-3">
        <WBSContentManagement
          plannedHours={plannedHours}
          plannedCost={plannedCost}
          setPlannedHours={setPlannedHours}
          setPlannedCost={setPlannedCost}
          // setPlannedDuration={setPlannedDuration}
          managementData={managementData}
          setManagementData={setManagementData}
        />
      </div>
    </div>
  );
};

export default WBSContentProjectEstimate;
