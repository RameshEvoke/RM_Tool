import React, { useState, useEffect } from "react";

const WorkBreakdownStructure = ({ data, onChange }) => {
  const [wbsEntries, setWbsEntries] = useState(
    data.length === 0
      ? [
          {
            wbsName: "",
            wbsDescription: "",
            wbsStartDate: "",
            wbsEndDate: "",
            wbsLevel: "",
            assignedResources: "",
            timeReported: "",
            wbsStatus: "",
          },
        ]
      : data
  );
  const [wbsStatus, setWbsStatus] = useState([]);
  const [wbsLevel, setWbsLevel] = useState([]);

  useEffect(() => {
    getWbsStatus();
    getWbsLevel();
    onChange(wbsEntries);
  }, [wbsEntries]);

  const getWbsStatus = async () => {
    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_status",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Data Not Found");
      }
      const result = await response.json();
      setWbsStatus(result);
    } catch (error) {
      console.error("Error fetching Wbs Status:", error);
    }
  };

  const getWbsLevel = async () => {
    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/get_wbs_levels",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Data Not Found");
      }
      const result = await response.json();
      setWbsLevel(result);
    } catch (error) {
      console.error("Error fetching Wbs Levels:", error);
    }
  };
  const handleChange = (index, key, value) => {
    const updatedWbsEntries = wbsEntries.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setWbsEntries(updatedWbsEntries);
  };

  const addWbs = () => {
    setWbsEntries([
      ...wbsEntries,
      {
        wbsName: "",
        wbsDescription: "",
        wbsStartDate: "",
        wbsEndDate: "",
        wbsLevel: "",
        assignedResources: "",
        timeReported: "",
        wbsStatus: "",
      },
    ]);
  };

  const removeWbs = (index) => {
    const updatedWbsEntries = wbsEntries.filter((item, i) => i !== index);
    setWbsEntries(updatedWbsEntries);
  };

  return (
    <div>
       <h5 className="titles sub-title mt-3">Work Breakdown Structure (WBS)</h5>
      <div class="table-responsive card hor-pad pt-3 pb-0">
      <table className="table w-100">
        <thead>
          <tr>
            <th>WBS Name</th>
            <th>WBS Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>WBS Level</th>
            <th>Assigned Resources</th>
            <th>Time Reported</th>
            <th>WBS Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wbsEntries.map((item, index) => (
            <tr key={index}>
              <td className="ps-0">
                <input className='form-control'
                  type="text"
                  value={item.wbsName}
                  onChange={(e) =>
                    handleChange(index, "wbsName", e.target.value)
                  }
                />
              </td>
              <td>
                <input className='form-control'
                  type="text"
                  value={item.wbsDescription}
                  onChange={(e) =>
                    handleChange(index, "wbsDescription", e.target.value)
                  }
                />
              </td>
              <td>
                <input className='form-control'
                  type="date"
                  value={item.wbsStartDate}
                  onChange={(e) =>
                    handleChange(index, "wbsStartDate", e.target.value)
                  }
                />
              </td>
              <td>
                <input className='form-control'
                  type="date"
                  value={item.wbsEndDate}
                  onChange={(e) =>
                    handleChange(index, "wbsEndDate", e.target.value)
                  }
                />
              </td>
              <td>
                <select className='form-select ellipsis-field'
                  value={item.wbsLevel}
                  onChange={(e) =>
                    handleChange(index, "wbsLevel", e.target.value)
                  }
                >
                  <option value="">Select WBS Level</option>
                  {wbsLevel.map((option) => (
                    <option key={option.id} value={option.wbs_level}>
                      {option.wbs_level}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input className='form-control'
                  type="text"
                  value={item.assignedResources}
                  onChange={(e) =>
                    handleChange(index, "assignedResources", e.target.value)
                  }
                />
              </td>
              <td>
                <input className='form-control'
                  type="text"
                  value={item.timeReported}
                  onChange={(e) =>
                    handleChange(index, "timeReported", e.target.value)
                  }
                />
              </td>
              <td>
                <select className='form-select ellipsis-field'
                  value={item.wbsStatus}
                  onChange={(e) =>
                    handleChange(index, "wbsStatus", e.target.value)
                  }
                >
                  <option value="">Select WBS Status</option>
                  {wbsStatus.map((option) => (
                    <option key={option.id} value={option.wbs_name}>
                      {option.wbs_name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="pe-0">
                <button className="btn btn-secondary tb-remv-btn" type="button" onClick={() => removeWbs(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    <div className="text-right">
    <button className="btn btn-primary mt-3" type="button" onClick={addWbs}>
        Add WBS
      </button>
    </div>
    </div>
  );
};

export default WorkBreakdownStructure;
