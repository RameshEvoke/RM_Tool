import React, { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import {TextField,FormControl,InputLabel,Select,MenuItem,Button,Table,TableHead,TableBody,TableCell,TableRow,
  TableContainer,
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const AddWBS = () => {

  const navigate = useNavigate();

  let { project_code } = useParams();

  const [formData, setFormData] = useState({

    wbsName: "", startDate: "", endDate: "", duration: "",wbs_type: "",billable: "",utilization: "",budgetCost: "",
    actualCost: "", invoiceSubmitted: "", plannedRevenue: "",actualRevenue: "",completionStatus: "",milestones: "",
    risksIssues: "", commentsNotes: "",project_code:project_code,invoice_documents:[],sow_documents:[],
    
    resources: [
      {
        resourceName: "", emp_Id: "", role: "",skills: [],
        startDate: "",endDate: "",plannedHours: "",reportedHours: "",
        billableRate: "",costPerHour: "",workedHours:"",resourceUtilization:"",
      },
    ],

  });

  const [invoiceFile, setInvoiceFile] = useState([]);
  const [sowFile, setSowFile] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const [wbsTypes,setWbsTypes]=useState([]);
  const [billableTypes,setBillableTypes]=useState([]);
  const [utilizationTypes,setUtilizationTypes]=useState([]);
  const [wbsStatus,setWbsStatus]=useState([]);
  const [skills,setSkills]=useState([]);
  const [roles,setRoles]=useState([]);




  useEffect(() => {
    getProjectNameByProjectCode(); getEmployees(); getWbsTypes();
    getBillabeTypes(); getUtilizationTypes(); getWbsStatus();
    getSkills();getRoles();

    //setFormData(data);
  }, []);

  useEffect(() => {
    calculateDuration();
  }, [formData.startDate, formData.endDate]);

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setFormData((prevData) => ({
        ...prevData,
        duration: duration > 0 ? duration : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        duration: "",
      }));
    }
  };


const getSkills = async () => {
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
      setSkills(result);
    } catch (error) {
      console.log("error", error);
    }
  };


const getRoles = async () => {
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
      setRoles(result);
    } catch (error) {
      console.log("error", error);
    }
  };



const getUtilizationTypes = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_utilization`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setUtilizationTypes(result);
    } catch (error) {
      console.log("error", error);
    }
  };


  const getWbsStatus = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_status`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setWbsStatus(result);
    } catch (error) {
      console.log("error", error);
    }
  };



const getBillabeTypes = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_billable_details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setBillableTypes(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Resource_Info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setResourcesData(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProjectNameByProjectCode = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_new_temp?project_id=${project_code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      //setProjectData(result[0]);
      setFormData(prevData => ({
        ...prevData,
        projectData: result[0],
      }));
    } catch (error) {
      console.log("error", error);
    }
  };

  const getWbsTypes = async () => {
    try {
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/projects/project_contract_type`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setWbsTypes(result);
    } catch (error) {
      console.log("error", error);
    }
  };


  const handleAddResource = () => {
    setFormData(prevData => ({
      ...prevData,
      resources: [
        ...prevData.resources,
        {
          resourceName: "",
          emp_Id: "",
          role: "",
          skills: [],
          startDate: "",
          endDate: "",
          plannedHours: "",
          reportedHours: "",
          billableRate: "",
          costPerHour: "",
          workedHours:"",
          resourceUtilization:"",
        },
      ],
    }));
  };

  const handleDeleteResource = (index) => {
    setFormData(prevData => {
      const updatedResources = [...prevData.resources];
      updatedResources.splice(index, 1);
      return { ...prevData, resources: updatedResources };
    });
  };

const handleInvoiceSubmitChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      invoiceSubmitted: event.target.value,
    }));
  };


const handleFileChangeSOW = (event) => {
    const newFiles = Array.from(event.target.files);
    setSowFile([...sowFile, ...newFiles]);
};

const handleRemoveSOWFile = (fileName) => {
    const updatedFiles = sowFile.filter((file) => file.name !== fileName);
    setSowFile(updatedFiles);
};

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setInvoiceFile([...invoiceFile, ...newFiles]);
  };

const handleRemoveFile = (fileName) => {
    const updatedFiles = invoiceFile.filter((file) => file.name !== fileName);
    setInvoiceFile(updatedFiles);
};



const handleSkillsChange = (event, index) => {
    const { value } = event.target;
    setFormData(prevData => {
      const updatedResources = [...prevData.resources];
      updatedResources[index] = {
        ...updatedResources[index],
        skills: value,
      };
      return { ...prevData, resources: updatedResources };
    });
};


const calculateWorkdays = (start, end) => {
    let count = 0;
    const curDate = new Date(start);
    while (curDate <= end) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  };


const handleWorkHoursChange = async (workedHours, startDate, endDate, index) => {
 
    if (!workedHours || !startDate || !endDate) return;

    const response = await fetch(
      `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/utilization_percentage?utilization_number=${workedHours}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    const utilization = result[0]?.utilization_percentage || "";

    const workdays = calculateWorkdays(new Date(startDate), new Date(endDate));
    const plannedHours = workdays * workedHours;

    setFormData((prevData) => {
      const updatedResources = [...prevData.resources];
      updatedResources[index] = {
        ...updatedResources[index],
        resourceUtilization: utilization,
        plannedHours,
      };
      return { ...prevData, resources: updatedResources };
    });
  };


  const handleResourceChange = (value, field, index) => {
    setFormData(prevData => {
      const updatedResources = [...prevData.resources];
      if (field === "resourceName") {
        const selectedEmployee = resourcesData.find(
          (emp) => emp.emp_Name === value
        );
        updatedResources[index] = {
          ...updatedResources[index],
          resourceName: value,
          emp_Id: selectedEmployee?.emp_Id || "",
        };
      } else {
        updatedResources[index] = {
          ...updatedResources[index],
          [field]: value,
        };
      }


if (["startDate", "endDate", "workedHours"].includes(field)) {
        const { workedHours, startDate, endDate } = updatedResources[index];
        handleWorkHoursChange(workedHours, startDate, endDate, index);
}

      return { ...prevData, resources: updatedResources };
    });
  };

  
  /*const handleCreateWBS = async () => {
  
    const wbsData = { ...formData };
    const formDataToSend = new FormData();
    formDataToSend.append("wbsData", JSON.stringify(wbsData));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if(sowFile.length > 0){
      const filePromises1 = sowFile.map((file) => {
      if (file instanceof File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              content: reader.result.split(",")[1],
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        return Promise.resolve(file);
      }
    });

    try {
       await delay(2000);
      const filesData = await Promise.all(filePromises1);
      formData.sow_documents = filesData.filter((file) => file);
    } catch (error) {
      console.error("Error reading files:", error);
      return;
    }
  }

  if (formData.invoiceSubmitted === "Yes" && invoiceFile) { 
    const filePromises = invoiceFile.map((file) => {
      if (file instanceof File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              content: reader.result.split(",")[1],
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        return Promise.resolve(file);
      }
    });

    try {
      await delay(2000);
      const filesData = await Promise.all(filePromises);
      formData.invoice_documents = filesData.filter((file) => file);
    } catch (error) {
      console.error("Error reading files:", error);
      return;
    }
  }

    try {
      const response = await fetch("https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_creation", {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("WBS created successfully:", result);
      handleResetForm();
    } catch (error) {
      console.error("Error creating WBS:", error);
    }
  };*/



/*const handleCreateWBS = async () => {
  const wbsData = { ...formData };
  const formDataToSend = new FormData();
  formDataToSend.append("wbsData", JSON.stringify(wbsData));

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result.split(",")[1],
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files) => {
    const filePromises = files.map((file) => {
      if (file instanceof File) {
        return readFileAsBase64(file);
      } else {
        return Promise.resolve(file);
      }
    });

    try {
      await delay(2000);
      const filesData = await Promise.all(filePromises);
      return filesData.filter((file) => file);
    } catch (error) {
      console.error("Error reading files:", error);
      throw error;
    }
  };

  try {
    if (sowFile.length > 0) {
      formData.sow_documents = await processFiles(sowFile);
    }

    if (formData.invoiceSubmitted === "Yes" && invoiceFile) {
      formData.invoice_documents = await processFiles(invoiceFile);
    }

    formDataToSend.append("sow_documents", JSON.stringify(formData.sow_documents || []));
    formDataToSend.append("invoice_documents", JSON.stringify(formData.invoice_documents || []));

    const response = await fetch("https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_creation", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("WBS created successfully:", result);
    handleResetForm();
  } catch (error) {
    console.error("Error creating WBS:", error);
  }
};*/



const handleCreateWBS = async () => {
  const wbsData = { ...formData };
  const formDataToSend = new FormData();
  formDataToSend.append("wbsData", JSON.stringify(wbsData));

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result.split(",")[1],
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files) => {
    const filePromises = files.map((file) => {
      if (file instanceof File) {
        return readFileAsBase64(file);
      }
      return Promise.resolve(null); // Handle cases where the file is not a File object
    });

    try {
      await delay(2000); // Simulating delay
      const filesData = await Promise.all(filePromises);
      return filesData.filter((file) => file !== null); // Filter out null values
    } catch (error) {
      console.error("Error reading files:", error);
      throw error;
    }
  };

  try {
    if (sowFile && sowFile.length > 0) {
      formData.sow_documents = await processFiles(sowFile);
    }

    if (formData.invoiceSubmitted === "Yes" && invoiceFile && invoiceFile.length > 0) {
      formData.invoice_documents = await processFiles(invoiceFile);
    }

    formDataToSend.append("sow_documents", JSON.stringify(formData.sow_documents || []));
    formDataToSend.append("invoice_documents", JSON.stringify(formData.invoice_documents || []));

    const response = await fetch("https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/wbs/wbs_creation", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("WBS created successfully:", result);
    setTimeout(() => {
          navigate("/projects");
        }, 3000);
    handleResetForm();

  } catch (error) {
    console.error("Error creating WBS:", error);
  }
};






  const handleResetForm = () => {
    setFormData({
      wbsName: "",
      startDate: "",
      endDate: "",
      duration: "",
      wbs_type: "",
      billable: "",
      utilization: "",
      budgetCost: "",
      actualCost: "",
      invoiceSubmitted: "",
      plannedRevenue: "",
      actualRevenue: "",
      completionStatus: "",
      milestones: "",
      risksIssues: "",
      commentsNotes: "",
      invoiceFile:[],
      sowFile:[],
    
      resources: [
        {
          resourceName: "",
          emp_Id: "",
          role: "",
          skills: [],
          startDate: "",
          endDate: "",
          plannedHours: "",
          reportedHours: "",
          billableRate: "",
          costPerHour: "",
          workedHours:"",
          resourceUtilization:"",
        },
      ],
    });
    setInvoiceFile([]);
    setSowFile([]);
  };

  return (
    <div className="container-fluid card mt-2">
      <Typography variant="h6">
        <div className="my-3">Create WBS</div>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="project-name"
            label="Project Name:"
            value={formData.projectData?.projectName || ""}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="wbs-id"
            label="WBS ID/Code:"
            value={formData.projectData?.wbsId || ""}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="wbs-name"
            label="WBS Name/Description:"
            value={formData.wbsName}
            onChange={(e) => setFormData({ ...formData, wbsName: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <TextField
            id="start-date"
            label="Start Date:"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                startDate: e.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="end-date"
            label="End Date:"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                endDate: e.target.value,
              }))
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="duration"
            label="Duration (in days):"
            value={formData.duration}
            InputProps={{ readOnly: true }}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type:</InputLabel>
        <Select
            labelId="type-label"
            id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, wbs_type: e.target.value })}
              >
              {wbsTypes.map((option) => (
                <MenuItem key={option.contract_type_id} value={option.contract_type_id}>
                  {option.contract_type_name} 
                </MenuItem>
            ))}
        </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="billable-label">Billable:</InputLabel>
              <Select
                labelId="billable-label"
                id="billable"
                  value={formData.billable}
                  onChange={(e) => setFormData({ ...formData, billable: e.target.value })}
                  >
                  {billableTypes.map((option) => (
                    <MenuItem key={option.billable_type_id} value={option.billable_type_id}>
                      {option.billable_type_name} 
                  </MenuItem>
                ))}
              </Select>

          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="utilization-label">Utilization:</InputLabel>
              <Select
              labelId="utilization-label"
              id="utilization"
                value={formData.utilization}
                onChange={(e) => setFormData({ ...formData, utilization: e.target.value })}
                >
                {utilizationTypes.map((option) => (
                  <MenuItem key={option.utilzation_id} value={option.utilzation_id}>
                    {option.utilization_name} 
                  </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Typography variant="h6" className="section-title">
          <div className="mb-3">Resources</div>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resource Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Utilization Hours</TableCell>
                <TableCell>Utilization (%)</TableCell>
                <TableCell>Planned Hours</TableCell>
                <TableCell>Reported Hours</TableCell>
                <TableCell>Billable Rate ($)</TableCell>
                <TableCell>Cost per Hour ($)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.resources.map((resource, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select
                      labelId={`resource-name-label-${index}`}
                      id={`resource-name-${index}`}
                      value={resource.resourceName}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "resourceName",
                          index
                        )
                      }
                    >
                      {resourcesData.map((option) => (
                        <MenuItem key={option.emp_Id} value={option.emp_Name}>
                          {option.emp_Name} ({option.emp_Id})
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>

<Select
                      labelId={`resource-roles-${index}`}
                      id={`resource-roles-${index}`}
                      value={resource.role}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "role",
                          index
                        )
                      }
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.role_name}
                        </MenuItem>
                      ))}
                    </Select>

                  </TableCell>
                  <TableCell>
                  <Select
                  multiple
                      labelId={`resource-skills-${index}`}
                      id={`resource-skills-${index}`}
                      value={resource.skills}
                      onChange={(e) => handleSkillsChange(e, index)}
                    >
                      {skills.map((option) => (
                        <MenuItem key={option.technology_vertical_id} value={option.technology_vertical_id}>
                          {option.technology_vertical_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      name="startDate"
                      value={resource.startDate}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "startDate",
                          index
                        )
                      }
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      name="endDate"
                      value={resource.endDate}
                      onChange={(e) =>
                        handleResourceChange(e.target.value, "endDate", index)
                      }
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                  <Select
                      id={`worked-hours-${index}`}
                      value={resource.workedHours}
                      /*onChange={(e) =>
                      handleWorkHoursChange(e.target.value, index)
                    }*/
                       onChange={(e) =>
                      handleResourceChange(e.target.value, "workedHours", index)
                    }
                    >
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="8">8</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={resource.resourceUtilization} 
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "resourceUtilization",
                          index
                        )
                      }
                      fullWidth
                      disabled
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      value={resource.plannedHours}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "plannedHours",
                          index
                        )
                      }
                      fullWidth
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={resource.reportedHours}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "reportedHours",
                          index
                        )
                      }
                      fullWidth
                      disabled
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={resource.billableRate}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "billableRate",
                          index
                        )
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={resource.costPerHour}
                      onChange={(e) =>
                        handleResourceChange(
                          e.target.value,
                          "costPerHour",
                          index
                        )
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteResource(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} textAlign="left">
          <Button
            className="primary-btn"
            variant="contained"
            color="primary"
            onClick={handleAddResource}
          >
            Add Resource
          </Button>
        </Box>
      </Box>

      <Box mt={1}>
        <Typography variant="h6" className="section-title">
          <div className="mb-3">Budget Metrics</div>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="budget-cost"
              label="Budget Cost:"
              value={formData.budgetCost}
            onChange={(e) => setFormData({ ...formData, budgetCost: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="actual-cost"
              label="Actual Cost:"
              value={formData.actualCost}
            onChange={(e) => setFormData({ ...formData, actualCost: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="invoice-submitted-label">
                Invoice Submitted:
              </InputLabel>
              <Select
                labelId="invoice-submitted-label"
                id="invoice-submitted"
                value={formData.invoiceSubmitted}
            onChange={handleInvoiceSubmitChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="planned-revenue"
              label="Planned Revenue:"
              value={formData.plannedRevenue}
            onChange={(e) => setFormData({ ...formData, plannedRevenue: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="actual-revenue"
              label="Actual Revenue:"
              value={formData.actualRevenue}
            onChange={(e) => setFormData({ ...formData, actualRevenue: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
           {formData.invoiceSubmitted === "Yes" && (
            <Button
              className="primary-btn"
              variant="contained"
              component="label"
            >
              Upload Invoice
              <input
                type="file"
                className="ms-2"
                onChange={handleFileChange}
              />
            </Button>
            )}
          </Grid>

          {invoiceFile.length > 0 && (
            <div className="tbl-border">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="col-6 px-2 py-2"><b> Invoice Name</b></TableCell>
                    <TableCell className="col-6 px-2 py-2"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceFile.map((file) => (
                    <TableRow
                      key={file.name}
                      className="row align-items-center"
                    >
                      <TableCell className="col-6 px-2 py-2">
                        {file.name}
                      </TableCell>
                      <TableCell className="col-6 px-2 py-2">
                        <Button onClick={() => handleRemoveFile(file.name)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            )}

        </Grid>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" className="section-title">
          <div className="mb-3">Deliverables</div>
        </Typography>
        <Grid container spacing={2}>
        
          <Grid item md={6}>
            <TextField
              id="milestones"
              label="Milestones:"
              multiline
              rows={2}
              value={formData.milestones}
            onChange={(e) => setFormData({ ...formData, milestones: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="comments-notes"
              label="Comments/Notes:"
              multiline
              rows={2}
              value={formData.commentsNotes}
            onChange={(e) => setFormData({ ...formData, commentsNotes: e.target.value })}
              fullWidth
            />
          </Grid>
            <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Completion Status:</InputLabel>
                  <Select
                      labelId="completionStatus-label"
                      id="completionStatus"
                        value={formData.completionStatus}
                        onChange={(e) => setFormData({ ...formData, completionStatus: e.target.value })}
                        >
                        {wbsStatus.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.wbs_name} 
                          </MenuItem>
                      ))}

                  </Select>
            </FormControl>

          </Grid>
          <Grid item md={6}>

              <Button
                className="primary-btn"
                variant="contained"
                component="label"
                >
                Upload SOW
                <input
                type="file"
                className="ms-2"
                onChange={handleFileChangeSOW}
                />
              </Button>


            {/*<TextField
              id="risks-issues"
              label="Risks/Issues:"
              multiline
              rows={2}
              value={formData.risksIssues}
            onChange={(e) => setFormData({ ...formData, risksIssues: e.target.value })}
              fullWidth
            />*/}
          </Grid>
          

 {sowFile.length > 0 && (
  <div className="tbl-border">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="col-6 px-2 py-2"><b>Name</b></TableCell>
                    <TableCell className="col-6 px-2 py-2"><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sowFile.map((file) => (
                    <TableRow
                      key={file.name}
                      className="row align-items-center"
                    >
                      <TableCell className="col-6 px-2 py-2">
                        {file.name}
                      </TableCell>
                      <TableCell className="col-6 px-2 py-2">
                        <Button onClick={() => handleRemoveSOWFile(file.name)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            )}

        </Grid>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <div className="my-3">
          <Button
            variant="contained"
            className="primary-btn me-2"
            color="primary"
            onClick={handleCreateWBS}
          >
            Create WBS
          </Button>
          <Button
            variant="contained"
            className="btn btn-secondary"
            onClick={handleResetForm}
          >
            Reset
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddWBS;
