import React, { useState, useEffect } from "react";

const BudgetFinancialMetrics = ({ data, onChange }) => {
  const [bidType, setBidType] = useState([]);

  useEffect(() => {
    getBidTypes();
  }, []);

  const getBidTypes = async () => {
    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/projects/project_contract_type",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Data Not Found");
      }
      const result = await response.json();
      setBidType(result);
    } catch (error) {
      console.error("Error fetching bid types:", error);
    }
  };

  const handleChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h5 className="titles sub-title mt-3">Budget/Financial Metrics</h5>
      <div className="card px-3 pt-3">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="totalBudget">Total Budget:</label> */}
                <input placeholder="Total Budjet"
                  type="text"
                  id="totalBudget"
                  name="totalBudget"
                  value={data.totalBudget || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="plannedRevenue">Planned Revenue:</label> */}
                <input placeholder="Planned Revenue"
                  type="text"
                  id="plannedRevenue"
                  name="plannedRevenue"
                  value={data.plannedRevenue || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="actualRevenue">Actual Revenue:</label> */}
                <input placeholder="Actual Revenue"
                  type="text"
                  id="actualRevenue"
                  name="actualRevenue"
                  value={data.actualRevenue || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="plannedCost">Planned Cost:</label> */}
                <input placeholder="Planned Cost"
                  type="text"
                  id="plannedCost"
                  name="plannedCost"
                  value={data.plannedCost || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="actualCost">Actual Cost:</label> */}
                <input placeholder="Actual Cost"
                  type="text"
                  id="actualCost"
                  name="actualCost"
                  value={data.actualCost || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="pl">Profit & Loss (P&L):</label> */}
                <input placeholder="Profit & Loss (P&L)"
                  type="text"
                  id="pl"
                  name="pl"
                  value={data.pl || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="etc">Estimation to Complete (ETC):</label> */}
                <input placeholder="Estimation to Complete (ETC)"
                  type="text"
                  id="etc"
                  name="etc"
                  value={data.etc || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="forecast">Forecast:</label> */}
                <input placeholder="Forecast"
                  type="text"
                  id="forecast"
                  name="forecast"
                  value={data.forecast || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="billingRate">Billing Rate:</label> */}
                <input placeholder="Billing Rate"
                  type="text"
                  id="billingRate"
                  name="billingRate"
                  value={data.billingRate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="costRate">Cost Rate:</label> */}
                <input placeholder="Cost Rate"
                  type="text"
                  id="costRate"
                  name="costRate"
                  value={data.costRate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                {/* <label htmlFor="bidType">Bid Type:</label> */}
                <select className="form-select"
                  id="bidType"
                  name="bidType"
                  value={data.bidType || ""}
                  onChange={handleChange}
                >
                  <option value="">Bid Type</option>
                  {bidType.map((type) => (
                    <option key={type.contract_type_id} value={type.contract_type_name}>
                      {type.contract_type_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetFinancialMetrics;
