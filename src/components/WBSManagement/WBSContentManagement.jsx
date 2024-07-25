import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";

const WBSContentManagement = ({
  setPlannedCost,
  setPlannedHours,
  setPlannedDuration,
  setManagementData,
  managementData,
}) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [resourceName, setResourceName] = useState("");
  const [grantedBy, setGrantedBy] = useState("");
  const [grantedOn, setGrantedOn] = useState("");

  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    // Fetch data from API endpoint
    fetch(
      "https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/Resources/get_Resources"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setResourceData(data);
        console.log("resourceData", resourceData.name);
      })
      .catch((error) => {
        console.error("Error fetching resource data:", error);
      });
  }, []);
  // useEffect(() => {
  //   console.log("managementData", managementData);
  //   if (managementData && managementData.Resources) {
  //     const rowsData = managementData.Resources.map((resource) => ({
  //       resourceName: resource.resourceName,
  //       id: resource.id,
  //       startDate: resource.startDate
  //         ? dayjs(resource.startDate, "DD MMM YYYY")
  //         : null,
  //       endDate: resource.endDate
  //         ? dayjs(resource.endDate, "DD MMM YYYY")
  //         : null,
  //       grantedOn: resource.grantedOn
  //         ? dayjs(resource.grantedOn, "DD MMM YYYY")
  //         : null,
  //       editing: false,
  //       totalHours: resource.totalHours,
  //       totalCost: resource.totalCost,
  //       grantedBy: resource.grantedBy,
  //       monthlyData: Object.entries(resource.collapseTable).map(
  //         ([month, value]) => ({
  //           month,
  //           hours: value,
  //         })
  //       ),
  //       monthHeaders: Object.keys(resource.collapseTable),
  //     }));
  //     setRows(rowsData);
  //   }
  // }, [managementData]);
  const handleResourceNameChange = (newValue, index) => {
    const newRows = [...rows];
    newRows[index].resourceName = newValue;
    setRows(newRows);
    setResourceName(newValue); // Update resourceName state here
    const selectedResource = resourceData.find(
      (resource) => resource.name === newValue
    );
    if (selectedResource) {
      newRows[index].id = selectedResource.emp_id;
      setRows(newRows);
    }
  };

  const handleGrantedByChange = (newValue, index) => {
    const newRows = [...rows];
    newRows[index].grantedBy = newValue;
    setRows(newRows);
    setGrantedBy(newValue);
  };

  const handleGrantedOnChange = (date, index) => {
    const newRows = [...rows];
    newRows[index].grantedOn = dayjs(date);
    setRows(newRows);
    setGrantedOn(dayjs(date));
  };

  const handleStartDateChange = (date, index) => {
    if (!date || !dayjs(date).isValid()) return; // Ensure valid date
    const newRows = [...rows];
    newRows[index].startDate = dayjs(date);
    newRows[index].monthHeaders = getMonthHeaders(
      dayjs(date),
      newRows[index].endDate
    );
    setRows(newRows);
  };

  const handleEndDateChange = (date, index) => {
    if (!date || !dayjs(date).isValid()) return; // Ensure valid date
    const newRows = [...rows];
    newRows[index].endDate = dayjs(date);
    newRows[index].monthHeaders = getMonthHeaders(
      newRows[index].startDate,
      dayjs(date)
    );
    setRows(newRows);
  };

  const handleIdChange = (newValue, index) => {
    const newRows = [...rows];
    newRows[index].id = newValue;
    setRows(newRows);
    const selectedResource = resourceData.find(
      (resource) => resource.emp_id === newValue
    );
    if (selectedResource) {
      newRows[index].resourceName = selectedResource.name;
      setRows(newRows);
    }
  };

  const toggleEditMode = (index) => {
    const newRows = [...rows];
    newRows[index].editing = !newRows[index].editing;
    setRows(newRows);
    setEditMode(true);
  };

  const handleSave = (index) => {
    const newRows = [...rows];
    newRows[index].editing = false;
    setEditMode(false);
    setRows(newRows);
    setFieldsDisabled(true);
    calculateTotals(newRows);
  };

  const handleRowClick = () => {
    setOpen(!open);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = rows.map((_, index) => index);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

  const handleMonthlyDataChange = (rowIndex, monthIndex, field, value) => {
    const newRows = [...rows];
    if (!newRows[rowIndex].monthlyData) {
      newRows[rowIndex].monthlyData = Array(12).fill({ hours: "", cost: "" });
    }
    const updatedMonthlyData = [...newRows[rowIndex].monthlyData];
    updatedMonthlyData[monthIndex] = {
      ...updatedMonthlyData[monthIndex],
      [field]: value,
    };
    newRows[rowIndex].monthlyData = updatedMonthlyData;

    // Calculate total hours and cost
    let totalHours = 0;
    let totalCost = 0;
    newRows[rowIndex].monthlyData.forEach((data) => {
      totalHours += parseFloat(data.hours) || 0;
      totalCost += parseFloat(data.cost) || 0;
    });
    newRows[rowIndex].totalHours = totalHours;
    newRows[rowIndex].totalCost = totalCost;
    setRows(newRows);
    calculateTotals(newRows);
  };

  const isMonthDisabled = (rowIndex, month) => {
    const row = rows[rowIndex];
    const startDate = row ? row.startDate : null;
    const endDate = row ? row.endDate : null;

    if (
      !startDate ||
      !endDate ||
      !dayjs.isDayjs(startDate) ||
      !dayjs.isDayjs(endDate)
    )
      return true;

    const startMonth = startDate.month();
    const endMonth = endDate.month();
    const startYear = startDate.year();
    const endYear = endDate.year();

    if (startYear === endYear) {
      if (month < startMonth || month > endMonth) return true;
    }

    return false;
  };

  const getMonthHeaders = (startDate, endDate) => {
    let headers = [];
    if (!startDate || !endDate) {
      const currentYear = dayjs().year();
      return Array(12)
        .fill("")
        .map((_, index) =>
          dayjs().month(index).year(currentYear).format("MMM-YY")
        );
    }
    if (startDate && endDate) {
      const startYear = startDate.year();
      const endYear = endDate.year();
      const yearDiff = endYear - startYear;

      for (let i = 0; i <= yearDiff; i++) {
        return Array(12)
          .fill("")
          .map((_, i) => dayjs().month(i).year(startYear).format("MMM-YY"));
      }
    }
  };

  const calculateTotals = (rows) => {
    let totalHours = 0;
    let totalCost = 0;
    rows.forEach((row) => {
      totalHours += row.totalHours || 0;
      totalCost += row.totalCost || 0;
    });
    setPlannedHours(totalHours);
    setPlannedCost(totalCost);
  };

  const setManagementDataJSON = (rows) => {
    const managementData = rows.map((row) => ({
      resourceName: row.resourceName,
      id: row.id,
      startDate: row.startDate ? row.startDate.format("DD MMM YYYY") : "",
      endDate: row.endDate ? row.endDate.format("DD MMM YYYY") : "",
      totalHours: row.totalHours,
      totalCost: row.totalCost,
      grantedBy: row.grantedBy,
      grantedOn: row.grantedOn ? row.grantedOn.format("DD MMM YYYY") : "",
      collapseTable: {},
    }));

    rows.forEach((row, i) => {
      row.monthHeaders.forEach((header, index) => {
        managementData[i].collapseTable[header] =
          row.monthlyData[index]?.hours || "";
      });
    });

    const managementDataObject = { Resources: managementData };
    setManagementData(managementDataObject || managementData);
    console.log("managementDataObject", managementDataObject);
    return managementDataObject;
  };

  useEffect(() => {
    calculateTotals(rows);
    const editing = rows.some((row) => row.editing);
    const anyRowSelected = selectedRows.length > 0;
    setFieldsDisabled(editing || anyRowSelected);
    setManagementDataJSON(rows);
  }, [rows, selectedRows]);

  const handleDeleteSelected = () => {
    const newRows = rows.filter((_, index) => !isSelected(index));
    setRows(newRows);
    setSelectedRows([]);
    setFieldsDisabled(false); // Enable fields after deleting selected rows
  };

  const handleSaveSelected = () => {
    const newRows = [...rows];
    selectedRows.forEach((index) => {
      newRows[index].editing = false;
    });
    setRows(newRows);
    setSelectedRows([]);
    setEditMode(false);
    setFieldsDisabled(true);
    setOpen(false);
  };

  const handleCheckboxChange = (event, index) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, index];
    } else if (selectedIndex === 0) {
      newSelected = selectedRows.slice(1);
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = selectedRows.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (index) => selectedRows.indexOf(index) !== -1;
  const handleAddResource = () => {
    const newRow = {
      resourceName: "",
      id: "",
      startDate: null,
      endDate: null,
      monthlyData: Array(12).fill({ hours: "", cost: "" }),
      totalHours: 0,
      totalCost: 0,
      editing: true,
      monthHeaders: getMonthHeaders(null, null),
      grantedBy: "", // Initialize grantedBy
      grantedOn: null,
    };
    setRows([...rows, newRow]);
    setOpen(true);
    setEditMode(true);
  };

  return (
    <div className="pt-3 pb-1 w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-darkslateblue-100 fw-bold">Manage Resources</h5>
        <button
          className="border-[#DFE2EF] btn btn-outline-primary py-2 px-3 rounded-0 bg-white flex flex-row items-center justify-start gap-[5px] whitespace-nowrap border-[1px] border-solid border-lavender-200 hover:bg-gainsboro hover:box-border hover:border-[1px] hover:border-solid hover:border-lightsteelblue text-center"
          variant="outlined"
          onClick={handleAddResource}
        >
          <img
            className="h-5 w-5 relative min-h-[20px] me-1"
            loading="lazy"
            src="/addicon.svg"
          />
          <div className="relative text-sm font-semibold font-inter text-royalblue-300 text-left inline-block min-w-[61px]">
            Add Resource
          </div>
        </button>
      </div>
      {rows.length > 0 && (
        <TableContainer
          component={Paper}
          className="py-0 px-0 border-0 mb-4 border-radius-0 w-100"
          style={{ borderRadius: "0", boxShadow: "0 0 0 0" }}
        >
          <Table
            sx={{
              minWidth: 650,
              "& .MuiOutlinedInput-root": {
                height: 30,
                fontSize: "12px",
                paddingRight: "7px",
              },
              "& .MuiInputBase-input": { padding: "0 0 0 7px" },
              "& .MuiIconButton-edgeEnd": {
                padding: "0 13px 0 0",
                width: "20px",
              },
              "& .MuiSvgIcon-root": { fontSize: "16px" },
            }}
            aria-label="collapsible table"
            className="table-auto overflow-visible table-bordered border border-gray-200 border-radius-0 w-100"
          >
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "#E8EBF9",
                  color: "#6e7391",
                  width: "100%",
                  fontSize: "13px",
                }}
              >
                <TableCell className="text-uppercase px-1 py-2 fw-medium text-center">
                  <Checkbox
                    className="px-0 py-0"
                    sx={{
                      width: "20px",
                      height: "20px",
                    }}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < rows.length
                    }
                    checked={
                      rows.length > 0 && selectedRows.length === rows.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all rows",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  RESOURCE NAME
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  START DATE
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  END DATE
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-wrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  TOTAL HOURS
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  COST($)
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  GRANTED BY
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  GRANTED ON
                </TableCell>
                <TableCell
                  className="bg-[#E8EBF9] px-1 py-2 text-slategray-100 text-center text-uppercase text-nowrap"
                  style={{
                    backgroundColor: "#E8EBF9",
                    color: "inherit",
                    lineHeight: "1.1rem",
                    fontSize: "13px",
                  }}
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={handleRowClick}
                    className="cursor-pointer"
                    selected={isSelected(index)}
                  >
                    <TableCell className="text-center px-1 py-1">
                      <Checkbox
                        checked={isSelected(index)}
                        onChange={(event) => handleCheckboxChange(event, index)}
                        sx={{
                          width: "20px",
                          height: "20px",
                          "& .MuiOutlinedInput-root": { height: 30 },
                        }}
                      />
                    </TableCell>
                    <TableCell className=" px-2 py-1">
                      <Autocomplete
                        sx={{
                          width: "120px",
                          "& .MuiSvgIcon-root": { fontSize: "14px !important" },
                        }}
                        options={resourceData.map((option) => option.name)}
                        value={row.resourceName}
                        onChange={(event, newValue) => {
                          handleResourceNameChange(newValue, index);
                        }}
                        renderInput={(params) => (
                          <TextField
                            className="px-0"
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              style: {
                                padding: "0px",
                              },
                            }}
                            disabled={!row.editing}
                          />
                        )}
                        disabled={!row.editing}
                      />
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <Autocomplete
                        sx={{
                          width: "80px",
                          "& .MuiOutlinedInput-root": {
                            paddingRight: "30px !important",
                          },
                          "& .MuiSvgIcon-root": { fontSize: "14px" },
                          "& .MuiInputBase-inputAdornedEnd": {
                            paddingLeft: "0 !important",
                          },
                        }}
                        options={resourceData.map((option) => option.emp_id)}
                        value={row.id}
                        onChange={(event, newValue) => {
                          handleIdChange(newValue, index);
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              width: "80px",
                            }}
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                            }}
                            disabled={!row.editing}
                          />
                        )}
                        disabled={!row.editing}
                      />
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            width: "98px",
                          }}
                          format="DD MMM YYYY"
                          value={row.startDate}
                          onChange={(date) =>
                            handleStartDateChange(date, index)
                          }
                          disabled={!row.editing}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell className=" px-2 py-1">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="DD MMM YYYY"
                          sx={{
                            width: "98px",
                          }}
                          value={row.endDate}
                          onChange={(date) => handleEndDateChange(date, index)}
                          disabled={!row.editing}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell className="text-center align-item-center px-2 py-1">
                      <TextField
                        className="px-0 py-0"
                        id="total-hours"
                        value={row.totalHours}
                        disabled
                        sx={{
                          width: "40px",
                        }}
                      />
                    </TableCell>
                    <TableCell className=" px-2 py-1">
                      <TextField
                        className="px-0 py-0"
                        id="cost"
                        value={row.totalCost}
                        disabled
                        sx={{
                          width: "40px",
                        }}
                      />
                    </TableCell>
                    <TableCell className=" px-2 py-1">
                      <Autocomplete
                        sx={{
                          width: "120px",
                          "& .MuiSvgIcon-root": { fontSize: "14px" },
                        }}
                        options={resourceData.map((option) => option.name)}
                        value={row.grantedBy}
                        onChange={(event, newValue) => {
                          handleGrantedByChange(newValue, index);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                            }}
                            disabled={!row.editing}
                          />
                        )}
                        disabled={!row.editing}
                      />
                    </TableCell>
                    <TableCell className=" px-2 py-1">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            width: "98px",
                          }}
                          format="DD MMM YYYY"
                          onChange={(date) =>
                            handleGrantedOnChange(date, index)
                          }
                          InputProps={{
                            style: {
                              padding: "5px",
                            },
                          }}
                          slotProps={{
                            style: {
                              padding: "0",
                            },
                          }}
                          disabled={!row.editing}
                          value={row.grantedOn}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell className="px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={row.editing ? faSave : faPen}
                        className="fa-1x"
                        onClick={() => {
                          row.editing
                            ? handleSave(index)
                            : toggleEditMode(index);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={10} className="bg-skyblue">
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table
                          size="small"
                          style={{ width: "100%" }}
                          className="table-auto overflow-visible table-bordered border border-gray-200 bg-white"
                          sx={{ "& .MuiTableCell-root": {} }}
                          stickyHeader
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow className="">
                              {row.monthHeaders.map((header, monthIndex) => (
                                <TableCell
                                  key={monthIndex}
                                  className="text-uppercase px-1 py-2 fw-medium text-center"
                                  style={{ fontSize: "12px" }}
                                >
                                  {header.toUpperCase()}
                                </TableCell>
                              ))}
                              <TableCell
                                className="px-1 py-2 text-center text-uppercase"
                                style={{ fontSize: "12px" }}
                              >
                                Total Hours
                              </TableCell>
                              <TableCell
                                className=" px-1 py-2 text-center text-uppercase"
                                style={{ fontSize: "12px" }}
                              >
                                Cost($)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow className="">
                              {row.monthHeaders.map((_, monthIndex) => (
                                <TableCell
                                  className="px-1 py-2 text-center border border-gray-200"
                                  key={monthIndex}
                                >
                                  <TextField
                                    className="px-0 py-0"
                                    sx={{
                                      width: "40px",
                                      "& .MuiOutlinedInput-root": {
                                        height: 30,
                                      },
                                    }}
                                    id={`month-${monthIndex}`}
                                    value={
                                      row.monthlyData[monthIndex]?.hours || ""
                                    }
                                    onChange={(e) =>
                                      handleMonthlyDataChange(
                                        index,
                                        monthIndex,
                                        "hours",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      isMonthDisabled(index, monthIndex) ||
                                      !row.editing
                                    }
                                    InputProps={{
                                      style: {
                                        backgroundColor: isMonthDisabled(
                                          index,
                                          monthIndex
                                        )
                                          ? "#f0f0f0"
                                          : "inherit",
                                        padding: "0px",
                                      },
                                    }}
                                  />
                                </TableCell>
                              ))}
                              <TableCell className="px-1 py-2 text-center border border-gray-200">
                                <TextField
                                  sx={{
                                    width: "40px",
                                    "& .MuiOutlinedInput-root": { height: 30 },
                                  }}
                                  id="total-hours-2"
                                  value={row.totalHours}
                                  disabled={!row.editing}
                                />
                              </TableCell>
                              <TableCell className=" px-1 py-2 text-center border border-gray-200">
                                <TextField
                                  sx={{
                                    width: "40px",
                                    "& .MuiOutlinedInput-root": { height: 30 },
                                  }}
                                  id="cost-2"
                                  value={row.totalCost}
                                  onChange={(e) =>
                                    handleMonthlyDataChange(
                                      index,
                                      12,
                                      "cost",
                                      e.target.value
                                    )
                                  }
                                  disabled={!row.editing}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="outlined"
        onClick={handleDeleteSelected}
        className="me-3"
      >
        Delete
      </Button>
      <Button variant="outlined" onClick={handleSaveSelected}>
        Save
      </Button>
    </div>
  );
};

export default WBSContentManagement;
