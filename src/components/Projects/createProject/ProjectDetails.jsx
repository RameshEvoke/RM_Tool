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
    <div className="container-fluid  p-0">
        <h5 className="titles sub-title">Project Details</h5>
        <form>
          <div className="card px-3 pt-3">
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectName">Project Name:</label> */}
                  <input placeholder="Project Name *"
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={data.projectName || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <select className="form-select">
                    <option>Account Name</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectStartDate">Project Start Date:</label> */}
                  <input placeholder="Project Start Date"
                    type="text"
                    id="projectStartDate"
                    name="projectStartDate"
                    // value={
                    //   data.projectStartDate || new Date().toISOString().substring(0, 10)
                    // }
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectEndDate">Project End Date:</label> */}
                  <input placeholder="Project End Date"
                    type="text"
                    id="projectEndDate"
                    name="projectEndDate"
                    // value={data.projectEndDate || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectManager">Project Manager:</label> */}
                  <select className="form-select"
                    id="projectManager"
                    name="projectManager"
                    value={data.projectManager || ""}
                    onChange={handleChange}
                  >
                    <option value="">Project Manager</option>
                    {projectManager.map((manager) => (
                      <option key={manager.emp_id} value={manager.name}>
                        {manager.name}({manager.emp_id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="clientName">Client Name:</label> */}
                  <select className="form-select"
                    id="clientName"
                    name="clientName"
                    value={data.clientName || ""}
                    onChange={handleChange}>
                    <option>Client Name</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectType">Project Type:</label> */}
                  <select
                    id="projectType"
                    name="projectType"
                    value={data.projectType || ""}
                    onChange={handleChange}>
                    <option>Project Type</option>
                    <option value="Development">Development</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectType">Project Type:</label> */}
                  <select className="form-select" id="" name="" value="">
                    <option>Bid Type</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  {/* <label htmlFor="projectName">Planned Revenue:</label> */}
                  <input
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
                  {/* <label htmlFor="projectType">Project Type:</label> */}
                  <select className="form-select" id="" name="" value="">
                    <option>Approval Status</option>
                  </select>
                </div>
              </div>
             

              {/* <div className="col-md-6">
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
            </div> */}
           
             <div className="row mx-0 px-0">
             <div className="col-md-6">
                <div className="form-group">
                <textarea
                    id="clientContact" placeholder="Client Contact Information"
                    name="clientContact"
                    value={data.clientContact || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
                  {/* <label htmlFor="projectDescription">Project Description:</label> */}
                  <textarea placeholder="Project Description"
                    id="projectDescription"
                    name="projectDescription"
                    value={data.projectDescription || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
             </div>

              {/* <div className="col-md-6">
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
              </div> */}


            </div>
          </div>
        </form>
    </div>
  );
};

export default ProjectDetails;
