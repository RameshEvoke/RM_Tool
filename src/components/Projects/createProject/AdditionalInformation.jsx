import React from "react";

const AdditionalInformation = ({ data, onChange }) => {
  const handleChange = (e) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h5 className="titles sub-title mt-3">Additional Information</h5>
      <div className="container-fluid p-0">
        <div className="card px-3 pt-3">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="projectMilestones">Project Milestones:</label> */}
                <textarea placeholder="Project Milestones"
                  id="projectMilestones"
                  name="projectMilestones"
                  value={data.projectMilestones || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="keyDeliverables">Key Deliverables:</label> */}
                <textarea placeholder="Key Deliverables"
                  id="keyDeliverables"
                  name="keyDeliverables"
                  value={data.keyDeliverables || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="projectObjectives">Project Objectives:</label> */}
                <textarea placeholder="Project Objectives"
                  id="projectObjectives"
                  name="projectObjectives"
                  value={data.projectObjectives || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="requiredDocuments">Required Documents:</label> */}
                <textarea placeholder="Required Documents"
                  id="requiredDocuments"
                  name="requiredDocuments"
                  value={data.requiredDocumentss || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="technologies">Technologies:</label> */}
                <textarea placeholder="Technologies"
                  id="technologies"
                  name="technologies"
                  value={data.technologies || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <label htmlFor="assumptions">Assumptions/Notes :</label> */}
                <textarea placeholder="Assumptions/Notes"
                  id="assumptions"
                  name="assumptions"
                  value={data.assumptions || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="form-group">
                <label htmlFor="riskManagementPlan">Risk Management Plan:</label>
                <textarea 
                    id="riskManagementPlan" 
                    name="riskManagementPlan" 
                    value={data.riskManagementPlan || ''} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="communicationPlan">Communication Plan:</label>
                <textarea 
                    id="communicationPlan" 
                    name="communicationPlan" 
                    value={data.communicationPlan || ''} 
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="stakeholderInformation">Stakeholder Information:</label>
                <textarea 
                    id="stakeholderInformation" 
                    name="stakeholderInformation" 
                    value={data.stakeholderInformation || ''} 
                    onChange={handleChange}
                />
            </div> */}
    </div>
  );
};

export default AdditionalInformation;
