import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LeftNav2 from "../components/LeftNav";
import BreadcrumbProjects from "../components/Projects/BreadcrumbProject";
import ProjectManagement from "../components/Projects/ProjectManagement";
//import ProjectDetail from "../components/Projects/ProjectDetail";
import ProjectContent from "../components/Projects/ProjectContent";
import ProjectOverviewTabs from "../components/Projects/projectOverviewTabs";
import { useParams } from "react-router-dom";
const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [renderProjectManagement, setRenderProjectManagement] = useState(true);
  const [renderProjectDetail, setRenderProjectDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedProjectCode, setSelectedProjectCode] = useState("");
//debugger;
  let { account_id } = useParams();
  let { project_code } =useParams();
  useEffect(() => {

    setSelectedAccount(account_id || "");
    setSelectedProjectCode(project_code || "");
    
  }, [account_id,project_code]);
  return (

    <div className="main-body">
        <div className="leftnav">
          <LeftNav2 />
        </div>
        <div className="outlet">
          <Header />
         <div className="layout-section">
         <BreadcrumbProjects />
         {selectedAccount ? (
            <ProjectContent />
          ) : selectedProjectCode ? (
            <ProjectOverviewTabs />
          ) : (
            <ProjectManagement />
          )}
         </div>
        </div>
      </div>

  );
};

export default Projects;
