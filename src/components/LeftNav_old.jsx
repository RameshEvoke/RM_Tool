import React, { useState,useEffect } from "react";
import { NavLink, useLocation,useMatch } from "react-router-dom";


const LeftNav2 = () => {
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    //const tabName = path.substring(1);
    const tabName = path.substring(1).split('/')[0];
   // debugger;
    if(tabName === "project"){
      setActiveTab("projects")  
    }else{

    setActiveTab(tabName);
    }
  }, [location]);
//debugger;
  return (
    <div className="self-stretch w-[231px] bg-whitesmoke-100 box-border flex flex-col items-start justify-start text-left text-sm text-slategray-100 font-poppins border-r-[1px] border-solid border-lavender-100 mq835:hidden mq1050:hidden">
      <NavLink className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit] `}
        to="/dashboard">
        <img className="h-5 w-5 relative" loading="lazy" alt="" src="/dashicon.svg"/>
        <div className={`relative leading-[25px] font-medium inline-block min-w-[79px] ${activeTab === 'dashboard' ? 'text-blue-500' : ''}`} >
          Dashboard
        </div>
      </NavLink>
      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-0 pl-[30px] gap-[9px] text-[inherit]">
        <NavLink className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit]`}
        to="/accounts">
        <img className="h-5 w-[20.2px] relative" loading="lazy" alt="" src="/accicon.svg"/>
        <div className={`relative leading-[25px] font-medium inline-block min-w-[68.6px] ${activeTab === 'accounts' ? 'text-blue-500' : ''}`}>
          Accounts
        </div>
        </NavLink>
      </a>
      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[94px] pl-[50px] gap-[9px] text-[inherit]">
        <NavLink className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit]`}
        to="/projects"
      >
        <img className="h-5 w-5 relative" loading="lazy" alt="" src="/projectsicon.svg"/>
        <div className={`relative leading-[25px] font-medium inline-block min-w-[57px] ${activeTab === 'projects' ? 'text-blue-500' : ''}`}>
          Projects
        </div>
        </NavLink>
      </a>
      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[99px] pl-[70px] gap-[9px] text-[inherit]">
        <NavLink className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit]`}
        to="/wbs" >
        <img
          className="h-5 w-5 relative" loading="lazy"
          alt=""
          src="/wbsicon.svg"
        />
        <div className={`relative leading-[25px] font-medium inline-block min-w-[32px] ${activeTab === 'wbs' ? 'text-blue-500' : ''}`}>
          WBS
        </div>
        </NavLink>
      </a>
      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[55px] pl-[30px] gap-[10px] text-[inherit]">
        <NavLink
        className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit]`}
        to="/projectPlanning"
      >
        <img
          className="h-5 w-5 relative"
          loading="lazy"
          alt=""
          src="/ppicon.svg"
        />
        <div className={`relative leading-[25px] font-medium inline-block min-w-[115px] ${activeTab === 'projectPlanning' ? 'text-blue-500' : ''}`}>
          Project Planning
        </div>
        </NavLink>
      </a>
      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-10 pl-[30px] gap-[10px] text-[inherit]">
        <NavLink
        className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit]`}
        to="/wbstimemanagement"
      >
        <img
          className="h-5 w-5 relative object-contain"
          loading="lazy"
          alt=""
          src="/wbsmanicon@2x.png"
        />
        <a className={`[text-decoration:none] relative leading-[25px] font-medium text-[inherit] ${activeTab === 'wbstimemanagement' ? 'text-blue-500' : ''}`}>
          WBS Management
        </a>
        </NavLink>
      </a>

      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[97px] pl-[30px] gap-[10px] text-[inherit]">
        <NavLink
        className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit] `}
        to="/wbstimereporting" 
      >
        <img
          className="h-5 w-5 relative"
          loading="lazy"
          alt=""
          src="/tricon.svg"
        />
        <div className={`[text-decoration:none] relative leading-[25px] font-medium text-[inherit] ${activeTab === 'wbstimereporting' ? 'text-blue-500' : ''}`}>
          Time & Expenses Reporting
        </div>
        </NavLink>
      </a>

      <a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[97px] pl-[30px] gap-[10px] text-[inherit]">
        <NavLink 
        className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit] `}
        to="/resources"  
      >
        <img
          className="h-5 w-5 relative"
          loading="lazy"
          alt=""
          src="/resicon.svg"
        />
        <div className={`relative leading-[25px] font-medium inline-block min-w-[73px] ${activeTab === 'resources' ? 'text-blue-500' : ''}`} >
          Resources
        </div>
        </NavLink>
      </a>

      {/*<a className="[text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[97px] pl-[30px] gap-[10px] text-[inherit]">
        <NavLink 
        className={`cursor-pointer [text-decoration:none] flex flex-row items-center justify-start py-[7.5px] pr-[91px] pl-[30px] gap-[10px] text-[inherit] `}
        to="/teApproval"  
      >
        <img
          className="h-5 w-5 relative"
          loading="lazy"
          alt=""
          src="/resicon.svg"
        />
        <div className={`relative leading-[25px] font-medium inline-block min-w-[73px] ${activeTab === 'teApproval' ? 'text-blue-500' : ''}`} >
          T&E Approval
        </div>
        </NavLink>
      </a>*/}

    </div>
  );
};

export default LeftNav2;
