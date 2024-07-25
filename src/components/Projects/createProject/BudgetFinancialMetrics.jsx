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
      <div className="container-fluid p-0">
        <h3 className="mt-3">Budget/Financial Metrics</h3>
        <div className="row mx-0">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="totalBudget">Total Budget:</label>
              <input
                type="text"
                id="totalBudget"
                name="totalBudget"
                value={data.totalBudget || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="plannedRevenue">Planned Revenue:</label>
              <input
                type="text"
                id="plannedRevenue"
                name="plannedRevenue"
                value={data.plannedRevenue || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="actualRevenue">Actual Revenue:</label>
              <input
                type="text"
                id="actualRevenue"
                name="actualRevenue"
                value={data.actualRevenue || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="plannedCost">Planned Cost:</label>
              <input
                type="text"
                id="plannedCost"
                name="plannedCost"
                value={data.plannedCost || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="actualCost">Actual Cost:</label>
              <input
                type="text"
                id="actualCost"
                name="actualCost"
                value={data.actualCost || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="pl">Profit & Loss (P&L):</label>
              <input
                type="text"
                id="pl"
                name="pl"
                value={data.pl || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="etc">Estimation to Complete (ETC):</label>
              <input
                type="text"
                id="etc"
                name="etc"
                value={data.etc || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="forecast">Forecast:</label>
              <input
                type="text"
                id="forecast"
                name="forecast"
                value={data.forecast || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="billingRate">Billing Rate:</label>
              <input
                type="text"
                id="billingRate"
                name="billingRate"
                value={data.billingRate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="costRate">Cost Rate:</label>
              <input
                type="text"
                id="costRate"
                name="costRate"
                value={data.costRate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="bidType">Bid Type:</label>
              <select
                id="bidType"
                name="bidType"
                value={data.bidType || ""}
                onChange={handleChange}
              >
                <option value="">Select Bid Type</option>
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
  );
};

export default BudgetFinancialMetrics;
