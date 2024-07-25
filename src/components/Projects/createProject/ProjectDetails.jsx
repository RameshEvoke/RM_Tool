import React, { useState, useEffect } from "react";

const ProjectDetails = ({ data, onChange }) => {
  const [projectManager, setProjectManager] = useState([]);
  const handleChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getProjectManager();
  }, []);

  const getProjectManager = async () => {
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
      setProjectManager(result);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };
  return (
    <div>
<div className="container-fluid p-0">
<h3 className="mt-3">Project Details</h3>
  <div className="row mx-0">
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={data.projectName || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectId">Project ID/Code:</label>
        <input
          type="text"
          id="projectId"
          name="projectId"
          value={data.projectId || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectStartDate">Project Start Date:</label>
        <input
          type="date"
          id="projectStartDate"
          name="projectStartDate"
          value={
            data.projectStartDate || new Date().toISOString().substring(0, 10)
          }
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectEndDate">Project End Date:</label>
        <input
          type="date"
          id="projectEndDate"
          name="projectEndDate"
          value={data.projectEndDate || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectManager">Project Manager:</label>
        <select
          id="projectManager"
          name="projectManager"
          value={data.projectManager || ""}
          onChange={handleChange}
        >
          <option value="">Select Project Manager</option>
          {projectManager.map((manager) => (
            <option key={manager.emp_id} value={manager.name}>
              {manager.name}({manager.emp_id})
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="clientName">Client/Customer Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={data.clientName || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectStatus">Project Status:</label>
        <select
          id="projectStatus"
          name="projectStatus"
          value={data.projectStatus || ""}
          onChange={handleChange}
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectType">Project Type:</label>
        <select
          id="projectType"
          name="projectType"
          value={data.projectType || ""}
          onChange={handleChange}
        >
          <option value="Development">Development</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Research">Research</option>
        </select>
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="clientContact">
          Client/Customer Contact Information:
        </label>
        <textarea
          id="clientContact"
          name="clientContact"
          value={data.clientContact || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={data.projectDescription || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default ProjectDetails;
