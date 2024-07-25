import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const WBSContentBasicDetails = ({ basicDetails, setBasicDetails }) => {
  const [projectOptions, setProjectOptions] = useState([]);
  const [wbsOptions, setWbsOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWBS, setSelectedWBS] = useState(null);
  const [selectedApprover, setSelectedApprover] = useState(null);
  const [status, setStatus] = useState("Active");
  const [version, setVersion] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [approverSearch, setApproverSearch] = useState("");

  // useEffect(() => {
  //   if (basicDetails) {
  //     if (!selectedProject) {
  //       setSelectedProject(basicDetails.project);
  //     }
  //     if (!selectedWBS) {
  //       setSelectedWBS(basicDetails.wbs);
  //     }
  //     if (!selectedApprover) {
  //       setSelectedApprover(basicDetails.approver);
  //     }
  //     if (!version) {
  //       setVersion(basicDetails.version);
  //     }
  //     setStatus(basicDetails.status);
  //   }
  // }, [basicDetails]);

  useEffect(() => {
    const fetchProjectsAndWbs = async () => {
      try {
        const response = await fetch(
          `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/get_Projectname?emp_id=2011`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        const projects = result.map((item) => item.Name);
        const wbsCodes = result.map((item) => item.Project_Code);
        setProjectOptions(projects);
        setWbsOptions(wbsCodes);
      } catch (error) {
        console.error("Error fetching projects and WBS data:", error);
      }
    };
    fetchProjectsAndWbs();
  }, []);

  const handleChange = (event, updateValue) => {
    updateValue(event.target.value);
  };

  const constructBasicDetailsJSON = () => {
    return {
      project: selectedProject,
      wbs: selectedWBS,
      approver: selectedApprover,
      status: status,
      version: version,
    };
  };

  useEffect(() => {
    const basicDetails = constructBasicDetailsJSON();
    console.log("basicDetails", basicDetails);
    setBasicDetails(basicDetails);
  }, [selectedProject, selectedWBS, selectedApprover, status, version]);

  return (
    <div className="pt-4 pb-3 px-3 whitesmoke-500 w-100">
      <h5 className="text-darkslateblue-100 fw-bold mb-2">
        Enter Basic details
      </h5>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div style={{ flex: "1 1 200px" }}>
          <label className="text-slategray-100 mb-1 d-block">
            Project Name
          </label>
          <Autocomplete
            options={projectOptions}
            value={selectedProject}
            onChange={(event, newValue) => {
              setSelectedProject(newValue);
              // Filter WBS options based on selected project
              const wbs = wbsOptions.filter(
                (_, index) => projectOptions[index] === newValue
              );
              setSelectedWBS(wbs[0] || null);
            }}
            inputValue={projectSearch}
            onInputChange={(event, newInputValue) =>
              setProjectSearch(newInputValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": { height: 40 },
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
        <div style={{ flex: "1 1 100px" }}>
          <label className="text-slategray-100 mb-1 d-block">WBS</label>
          <Autocomplete
            options={selectedProject ? [selectedWBS] : []}
            value={selectedWBS}
            onChange={(event, newValue) => setSelectedWBS(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  width: "180px",
                  "& .MuiOutlinedInput-root": { height: 40 },
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <label className="text-slategray-200 mb-1 d-block">Approver</label>
          <Autocomplete
            options={["Suresh Babu Kethepalli", "Hari Prasad Ala"]}
            value={selectedApprover}
            onChange={(event, newValue) => setSelectedApprover(newValue)}
            inputValue={approverSearch}
            onInputChange={(event, newInputValue) =>
              setApproverSearch(newInputValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  width: "200px",
                  "& .MuiOutlinedInput-root": { height: 40 },
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
        <div style={{ flex: "1 1 150px" }}>
          <label className="text-slategray-100 mb-1 d-block">Status</label>
          <TextField
            value={status}
            onChange={(e) => handleChange(e, setStatus)}
            variant="outlined"
            sx={{ width: "100%", "& .MuiOutlinedInput-root": { height: 40 } }}
            inputProps={{
              style: { paddingTop: "9px", paddingBottom: "9px" },
            }}
          />
        </div>
        <div style={{ flex: "1 1 100px" }}>
          <label className="text-slategray-100 mb-1 d-block">Version</label>
          <Autocomplete
            options={["V1", "V2", "V3"]}
            value={version}
            onChange={(e, newValue) => setVersion(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                sx={{
                  width: "150px",
                  "& .MuiOutlinedInput-root": { height: 40 },
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default WBSContentBasicDetails;
