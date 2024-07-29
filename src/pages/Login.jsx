import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
     <div className="row mx-0 bg-white hyt-100vh">
      <div className="col-md-6">
      <LeftPanel />
      </div>
      <div className="col-md-6 pos-rel mobile-login bg-white">
      <LoginForm />
      </div>
     </div>
  );
};

export default Login;
