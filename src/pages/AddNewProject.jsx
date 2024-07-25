

import Header from "../components/Header";
import LeftNav2 from "../components/LeftNav";
import BreadcrumbProject from "../components/Projects/BreadcrumbProject";
import AddNewProject from "../components/Projects/AddNewProject";

const AddProject = () => {
  return (

<div className="main-body">
        <div className="leftnav">
          <LeftNav2 />
        </div>
        <div className="outlet">
          <Header />
         <div className="layout-section">
         <BreadcrumbProject />
          <AddNewProject />
         </div>
        </div>
      </div>
    
    
  );
};

export default AddProject;
