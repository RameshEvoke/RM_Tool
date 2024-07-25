import LeftPanel from "../components/LeftPanel";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-full relative bg-white flex flex-row flex-wrap items-start justify-start leading-[normal] tracking-[normal] [row-gap:20px]">
      <LeftPanel />
      <LoginForm />
    </div>
  );
};

export default Login;
