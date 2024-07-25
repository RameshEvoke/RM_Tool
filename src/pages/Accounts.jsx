import Header from "../components/Header";
import LeftNav2 from "../components/LeftNav";
import BreadcrumbResources from "../components/Accounts/BreadcrumbAccounts";
import AccountsManagement from "../components/Accounts/AccountsManagement";

const Accounts = () => {
  return (

<div className="main-body">
        <div className="leftnav">
          <LeftNav2 />
        </div>
        <div className="outlet">
          <Header />
         <div className="layout-section">
         <BreadcrumbResources />
         <AccountsManagement />
         </div>
        </div>
      </div>
    
    
  );
};

export default Accounts;
