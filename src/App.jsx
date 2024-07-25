import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import WbsTimeReporting from "./pages/WbsTimeReporting";
import Dashboard from "./pages/Dashboard";
import WbsTimeManagement from "./pages/WbsTimeManagement";
import Resources from "./pages/Resources";

import Accounts from "./pages/Accounts";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddNewProject";
import ProjectPlanning from "./pages/ProjectPlanning";
import Wbs from "./pages/Wbs";
import Cookies from "js-cookie";
import UserIdleTimer from "./components/UserIdleTimer";
import { Modal, Button } from "react-bootstrap";
import UserIdelModal from "./components/UserIdleModal";

import AddAccount from "./pages/AddAccount";

import TimeExpensesApproval from "./pages/TimeExpensesApproval";
import EmployeeTimesheetDetails from "./components/TimeandExpenses/employee_timesheet";
import AddNewProject from "./components/Projects/AddNewProject";

//import ProjectsTabs from "./components/Projects/ProjectTabs";
import AddWBS from "./pages/AddWBS";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [showModal, setShowModal] = useState(false);

  const handleIdle = () => {
    if (pathname !== "/") {
      setShowModal(true);
    }
  };
  const handleStay = () => {
    setShowModal(false);
    window.dispatchEvent(new Event("mousemove")); // Restart the idle timer by simulating user activity
  };

  const isIdle = UserIdleTimer(1 * 60 * 10000, handleIdle); // 5 minutes timeout

  const handleSignOut = () => {
    setShowModal(false);
    Cookies.remove("EmployeeToken");
    localStorage.clear();
    // navigate('/');
  };
  useEffect(() => {
    const token = Cookies.get("emp_token");
    console.log("token", token);
  }, []);
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Login RM";
        metaDescription = "";
        break;
      case "/wbstimereporting":
        title = "WBS Time Reporting";
        metaDescription = "";
        break;
      case "/dashboard":
        title = "Dashboard";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  const ProtectedRoute = ({ element }) => {
    const empId = localStorage.getItem("emp_Id");
    //return empId;
    return empId ? (
      element
    ) : (
      <Navigate to="/" state={{ error: "Please Do the login first" }} />
    );
  };
  const RedirectIfLoggedIn = ({ element }) => {
    const empId = localStorage.getItem("emp_Id");
    return empId ? <Navigate to="/dashboard" /> : element;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<RedirectIfLoggedIn element={<Login />} />} />
        <Route
          path="/wbstimereporting"
          element={<ProtectedRoute element={<WbsTimeReporting />} />}
        />

        <Route
          path="/wbstimereporting/:qemp_id/:qstart_week/:qend_week"
          element={<ProtectedRoute element={<WbsTimeReporting />} />}
        />
        <Route
          path="/wbstimemanagement"
          element={<ProtectedRoute element={<WbsTimeManagement />} />}
        />
        <Route
          path="/resources"
          element={<ProtectedRoute element={<Resources />} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/accounts"
          element={<ProtectedRoute element={<Accounts />} />}
        />

        <Route
          path="/projectPlanning"
          element={<ProtectedRoute element={<ProjectPlanning />} />}
        />
        <Route path="/wbs" element={<ProtectedRoute element={<Wbs />} />} />

        <Route
          path="/projects"
          element={<ProtectedRoute element={<Projects />} />}
        />
        <Route
          path="/projects/:account_id"
          element={<ProtectedRoute element={<Projects />} />}
        />
        <Route
          path="/project/:project_code"
          element={<ProtectedRoute element={<Projects />} />}
        />
        <Route
          path="/teApproval"
          element={<ProtectedRoute element={<TimeExpensesApproval />} />}
        />

        <Route
          path="/employee_timesheet/:emp_id/:start_week/:end_week"
          element={<ProtectedRoute element={<EmployeeTimesheetDetails />} />}
        />
        <Route
          path="/AddAccount"
          element={<ProtectedRoute element={<AddAccount />} />}
        />
        <Route
          path="/AddProject/:project_code"
          element={<ProtectedRoute element={<AddProject />} />}
        />
        <Route
          path="/AddProject"
          element={<ProtectedRoute element={<AddProject />} />}
        />

        <Route
          path="/AddWBS"
          element={<ProtectedRoute element={<AddWBS />} />}
        />
        <Route
          path="/AddWBS/:project_code"
          element={<ProtectedRoute element={<AddWBS />} />}
        />

      </Routes>
      <UserIdelModal
        show={showModal}
        onClose={handleStay}
        onStay={handleStay}
        onSignOut={handleSignOut}
      />
    </>
  );
}
export default App;
