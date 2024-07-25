// src/components/ResourceAllocations.js
import React, { useState, useEffect } from "react";

const ResourceAllocations = ({ data, onChange }) => {
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState([]);
  const [skillset, setSkillset] = useState([]);

  // Initialize with one resource by default if empty
  const initialData =
    data.length === 0
      ? [
          {
            resourceName: "",
            role: "",
            skillSet: "",
            allocationStartDate: "",
            allocationEndDate: "",
            allocationPercentage: "",
            nextAvailabilityDate: "",
            reportingManager: "",
            hoursAllocated: "",
            hoursReported: "",
          },
        ]
      : data;
  const [resources, setResources] = useState(initialData);
  const [reportingManager, setReportingManager] = useState([]);

  useEffect(() => {
    getRole();
    getSkillset();
    getReportingManager();
    onChange(resources);
  }, [resources]);

  const getReportingManager = async () => {
    try {
      const response = await fetch(
        "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Resources/get_Resources",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Data Not Found");
      }
      const result = await response.json();
      setReportingManager(result);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };
  const getRole = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Roles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setRole(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getSkillset = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/accounts/technology_vertical`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setSkillset(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (index, key, value) => {
    const updatedResources = resources.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setResources(updatedResources);

    // Simple validation logic
    setErrors({
      ...errors,
      [key]: value ? "" : `${key} is required`,
    });
  };

  const addResource = () => {
    setResources([
      ...resources,
      {
        resourceName: "",
        role: "",
        skillSet: "",
        allocationStartDate: "",
        allocationEndDate: "",
        allocationPercentage: "",
        nextAvailabilityDate: "",
        reportingManager: "",
        hoursAllocated: "",
        hoursReported: "",
      },
    ]);
  };

  const removeResource = (index) => {
    const updatedResources = resources.filter((item, i) => i !== index);
    setResources(updatedResources);
  };

  return (
    <div>
      <h3 className="mt-3">Resource Allocations</h3>
      <div class="table-responsive">
      <table className="table w-100">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Role</th>
            <th>Skill Set</th>
            <th>Allocation Start Date</th>
            <th>Allocation End Date</th>
            <th>% Allocation</th>
            <th>Next Availability Date</th>
            <th>Reporting Manager</th>
            <th>Hours Allocated</th>
            <th>Hours Reported</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((item, index) => (
            <tr key={index}>
              {/* <td>
               <input className='form-control'
                  type="text"
                  value={item.resourceName}
                  onChange={(e) =>
                    handleChange(index, "resourceName", e.target.value)
                  }
                />
              </td> */}
              <td>
               <select className='form-select'
                  value={item.resourceName}
                  onChange={(e) =>
                    handleChange(index, "resourceName", e.target.value)
                  }
                >
                  <option value="">Select Resource</option>
                  {reportingManager.map((manager) => (
                    <option key={manager.emp_id} value={manager.name}>
                      {manager.name}({manager.emp_id})
                    </option>
                  ))}
                </select>
              </td>
              {/* <td>
               <input className='form-control'
                  type="text"
                  value={item.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                />
              </td>
              <td>
               <input className='form-control'
                  type="text"
                  value={item.skillSet}
                  onChange={(e) =>
                    handleChange(index, "skillSet", e.target.value)
                  }
                />
              </td> */}
              <td>
               <select className='form-select'
                  value={item.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                >
                  <option value="">Select Role</option>
                  {role.map((option) => (
                    <option key={option.id} value={option.role_name}>
                      {option.role_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
               <select className='form-select'
                  value={item.skillSet}
                  onChange={(e) =>
                    handleChange(index, "skillSet", e.target.value)
                  }
                >
                  <option value="">Select Skillset</option>
                  {skillset.map((option) => (
                    <option
                      key={option.technology_vertical_id}
                      value={option.technology_vertical_name}
                    >
                      {option.technology_vertical_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
               <input className='form-control'
                  type="date"
                  value={item.allocationStartDate}
                  onChange={(e) =>
                    handleChange(index, "allocationStartDate", e.target.value)
                  }
                />
              </td>
              <td>
               <input className='form-control'
                  type="date"
                  value={item.allocationEndDate}
                  onChange={(e) =>
                    handleChange(index, "allocationEndDate", e.target.value)
                  }
                />
              </td>
              <td>
               <input className='form-control'
                  type="text"
                  value={item.allocationPercentage}
                  onChange={(e) =>
                    handleChange(index, "allocationPercentage", e.target.value)
                  }
                />
              </td>
              <td>
               <input className='form-control'
                  type="date"
                  value={item.nextAvailabilityDate}
                  onChange={(e) =>
                    handleChange(index, "nextAvailabilityDate", e.target.value)
                  }
                />
              </td>
              {/* <td>
               <input className='form-control'
                  type="text"
                  value={item.reportingManager}
                  onChange={(e) =>
                    handleChange(index, "reportingManager", e.target.value)
                  }
                />
              </td> */}
              <td>
               <select className='form-select'
                  value={item.reportingManager}
                  onChange={(e) =>
                    handleChange(index, "reportingManager", e.target.value)
                  }
                >
                  <option value="">Select Reporting Manager</option>
                  {reportingManager.map((manager) => (
                    <option key={manager.emp_id} value={manager.name}>
                      {manager.name}({manager.emp_id})
                    </option>
                  ))}
                </select>
              </td>
              <td>
               <input className='form-control'
                  type="text"
                  value={item.hoursAllocated}
                  onChange={(e) =>
                    handleChange(index, "hoursAllocated", e.target.value)
                  }
                />
              </td>
              <td>
               <input className='form-control'
                  type="text"
                  value={item.hoursReported}
                  onChange={(e) =>
                    handleChange(index, "hoursReported", e.target.value)
                  }
                />
              </td>
              <td>
                <button className="btn btn-secondary" type="button" onClick={() => removeResource(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button className="btn primary-btn" type="button" onClick={addResource}>
        Add Resource
      </button>
    </div>
  );
};

export default ResourceAllocations;
