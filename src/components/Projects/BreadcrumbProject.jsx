import React from "react";
import { useLocation } from "react-router-dom";

const BreadcrumbProject = () => {
  const location = useLocation();

  // Extract account ID from the URL path
  const pathSegments = location.pathname.split("/");
  const accountId = pathSegments[pathSegments.length - 1];

  return (
    <div className="flex flex-row items-center justify-start gap-[7px] text-left text-xs text-slategray-200 font-inter">
      <img className="h-5 w-5 relative" loading="lazy" alt="" src="/home.svg" />
      <img
        className="h-3.5 w-3.5 relative"
        loading="lazy"
        alt=""
        src="/arrowright.svg"
      />
      <div className="flex flex-row items-center justify-start gap-[7px] text-left text-xs text-slategray-200 font-inter">
        {location.pathname === `/projects/${accountId}` ? (
          <>
            <span className="text-blue-500">Accounts</span>
            <img
              className="h-3.5 w-3.5 relative"
              loading="lazy"
              alt=""
              src="/arrowright.svg"
            />
            Projects
          </>
        ) : (
          <>Projects</>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbProject;
