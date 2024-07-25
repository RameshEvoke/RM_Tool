import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const LeftNav2 = () => {
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const tabName = path.substring(1).split('/')[0];
    if (tabName === "project") {
      setActiveTab("projects");
    } else {

      setActiveTab(tabName);
    }
  }, [location]);

  const activeStyle = { color: '#b8e0e0' };

  return (
    <div>
      <div className="logo-img">
        <img src="/logo-img.svg" alt="Logo" />
      </div>
      <ul className="leftnav-pane">
        <li >
          <NavLink to="/dashboard" style ={activeTab === 'dashboard' ? activeStyle : {}}>
            <img src="/dashicon.svg" alt="Dashboard Icon" />Dashboard
          </NavLink>
        </li>
        <li >
          <NavLink to="/accounts" style ={activeTab === 'accounts' ? activeStyle : {}}>
            <img src="/accicon.svg" alt="Accounts Icon" />Accounts
          </NavLink>
        </li>
        <li >
          <NavLink to="/projects" style ={activeTab === 'projects' ? activeStyle : {}}>
            <img src="/projectsicon.svg" alt="Projects Icon" />Projects
          </NavLink>
        </li>
        <li >
          <NavLink to="/wbstimereporting" style ={activeTab === 'wbstimereporting' ? activeStyle : {}}>
            <img src="/tricon.svg" alt="Time & Expenses Reporting Icon" />Time & Expenses Reporting
          </NavLink>
        </li>
        <li >
          <NavLink to="/resources" style ={activeTab === 'resources' ? activeStyle : {}}>
            <img src="/resicon.svg" alt="Resources Icon" />Resources
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftNav2;
