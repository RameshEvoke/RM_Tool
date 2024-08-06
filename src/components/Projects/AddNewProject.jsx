// src/ProjectForm.js
import React, { useState } from "react";
import ProjectDetails from "./createProject/ProjectDetails";
import BudgetFinancialMetrics from "./createProject/BudgetFinancialMetrics";
import WorkBreakdownStructure from "./createProject/WorkBreakdownStructure";
import ResourceAllocations from "./createProject/ResourceAllocations";
import TimeReporting from "./createProject/TimeReporting";
import AdditionalInformation from "./createProject/AdditionalInformation";
import Invoices from "./createProject/Invoices";
import Expenses from "./createProject/Expenses";
import { useLocation } from "react-router-dom";
//import './ProjectForm.css';

const ProjectForm = () => {
  const location = useLocation(); // Get current location
  const isAddProjectPage = location.pathname === "/AddProject";
  let data = {
    projectDetails: {
      projectName: "new name",
      projectId: "123",
      projectDescription: "hello workkk",
      projectStartDate: "2024-07-19",
      projectEndDate: "2024-07-19",
      projectManager: "venkatesh ",
      clientName: "csc",
      clientContact: "91991991",
    },
    budgetFinancialMetrics: {
      totalBudget: "89989",
      plannedRevenue: "9898",
      actualRevenue: "9898",
      plannedCost: "998898",
      actualCost: "9889",
      pl: "98898",
      etc: "989",
      forecast: "989",
      billingRate: "989",
      costRate: "98",
      bidType: "",
    },
    workBreakdownStructure: [
      {
        wbsId: "98",
        wbsName: "787",
        wbsDescription: "87787",
        wbsStartDate: "2024-07-23",
        wbsEndDate: "2024-07-31",
        wbsLevel: "no",
        assignedResources: "yes",
        timeReported: "56",
        milestones: "666",
        dependencies: "666",
        wbsStatus: "666",
      },
      {
        wbsId: "8787",
        wbsName: "87878",
        wbsDescription: "87878",
        wbsStartDate: "2024-08-15",
        wbsEndDate: "2024-07-30",
        wbsLevel: "yes",
        assignedResources: "yuy",
        timeReported: "uyuyu",
        milestones: "uyuyy",
        dependencies: "uyuy",
        wbsStatus: "uy",
      },
    ],
    resourceAllocations: [
      {
        resourceName: "venkatesh",
        role: "reol",
        skillSet: "lllkl",
        allocationStartDate: "2024-07-31",
        allocationEndDate: "2024-07-30",
        allocationPercentage: "yes",
        nextAvailabilityDate: "2024-08-01",
        reportingManager: "uuu",
        hoursAllocated: "323123",
        hoursReported: "7667",
      },
    ],
    timeReporting: [
      {
        resourceName: "venkatesh",
        wbs: "6566",
        billable: "66666",
        jan: "666",
        feb: "6",
        mar: "6",
        apr: "6",
        may: "6",
        jun: "6",
        jul: "6",
        aug: "6",
        sep: "6",
        oct: "6",
        nov: "6",
        dec: "6",
        total: 732,
      },
    ],
    additionalInformation: {
      projectMilestones: "6",
      keyDeliverables: "676767",
      riskManagementPlan: "6767",
      communicationPlan: "6767",
      stakeholderInformation: "6776",
      projectObjectives: "6776",
      projectRequirements: "7676",
      projectConstraints: "6776",
      assumptions: "6776",
    },
    expenses: [
      {
        expenseId: "123",
        type: "78",
        description: "778",
        date: "2024-07-24",
        amount: "123",
        approvalStatus: "approved",
        submittedBy: "yes",
        reportedAgainstWBS: "ujj",
      },
      {
        expenseId: "1231",
        type: "23112",
        description: "123123",
        date: "2024-07-23",
        amount: "123124",
        approvalStatus: "rejected",
        submittedBy: "no",
        reportedAgainstWBS: "oiuiuy",
      },
    ],
    invoices: [
      {
        invoiceId: "909",
        date: "2024-08-08",
        amount: "1231",
        status: "approved",
        billingPeriod: "8kjui",
        dueDate: "2024-07-24",
        clientBillingInfo: "yes",
        approvalStatus: "approved",
        submittedBy: "venkatesh",
      },
    ],
  };

  const [formData, setFormData] = useState({
    projectDetails: {},
    budgetFinancialMetrics: {},
    workBreakdownStructure: [],
    resourceAllocations: [],
    timeReporting: [],
    additionalInformation: {},
  });

  const handleChange = (section, data) => {
    setFormData({
      ...formData,
      [section]: data,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  const { budgetFinancialMetrics } = formData;
  const showInvoices = !!budgetFinancialMetrics.bidType;
  return (
    <div>
    <h5 className="pt-2 titles mt-2">New Project Creation</h5>
      <div className="bg-white p-3">
      <form onSubmit={handleSubmit}>
      <ProjectDetails
        data={formData.projectDetails}
        onChange={(data) => handleChange("projectDetails", data)}
      />
      {!isAddProjectPage && (
        <>
          <Expenses
            data={formData.expenses}
            onChange={(data) => handleChange("expenses", data)}
          />
          <TimeReporting
            data={formData.timeReporting}
            onChange={(data) => handleChange("timeReporting", data)}
          />
        </>
      )}
      <BudgetFinancialMetrics
        data={formData.budgetFinancialMetrics}
        onChange={(data) => handleChange("budgetFinancialMetrics", data)}
      />
      {showInvoices && (
        <Invoices
          data={formData.invoices}
          onChange={(data) => handleChange("invoices", data)}
        />
      )}
      <WorkBreakdownStructure
        data={formData.workBreakdownStructure}
        onChange={(data) => handleChange("workBreakdownStructure", data)}
      />
      <ResourceAllocations
        data={formData.resourceAllocations}
        onChange={(data) => handleChange("resourceAllocations", data)}
      />
      <AdditionalInformation
        data={formData.additionalInformation}
        onChange={(data) => handleChange("additionalInformation", data)}
      />
      <div className="text-right pb-2">
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </div>
    </form>
      </div>
    </div>
  );
};

export default ProjectForm;
