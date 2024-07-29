import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { URLS } from '../Utiles';

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(location.state?.error || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 8000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URLS.api_url}/Login?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        if (result.EmployeeID) {
          localStorage.setItem('emp_Id', result.EmployeeID);
          localStorage.setItem('emp_UserName', result.EmployeeUserName);
          localStorage.setItem('emp_Role', result.EmployeeRole);
          setTimeout(()=>{
          navigate('/dashboard');
          });
        } else {
          setError(result);
        }
      } else {
        setError(result);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
 <div>
<div className="card login-card">
<div>
<h4 className="login-title">Login</h4>
  <p className="userinfo-txt">Please enter correct credentials below</p>
  <form className="login-from">
    <div className="form-group  pos-rel">
    <label for="username"></label>
      <input type="text" placeholder="Enter Your Username or Email" className="form-control cust-login-field"/> 
      <img className="po-abs-icon" src="./user-id-icon.svg"/>    
    </div>
    <div className="form-group  pos-rel">
    <label for="username"></label>
      <input type="password" placeholder="Enter Your Password" className="form-control cust-login-field"/> 
      <img className="po-abs-icon" src="./password-lock-icon.svg"/>
      <img className="eye-icon" src="./eye-slash.svg"/>    
    </div>
    <div className="form-group">
      <p className="text-center">
        <a className="forgot-passowrd-txt" href="">Forgot Password</a>
      </p>
    </div>
    <div className="form-group">
      <button className="btn btn-login">Login</button>
    </div>
    <section className="self-stretch flex flex-row items-center justify-start gap-[25px]">
          <img
            className="h-px flex-1 relative max-w-full overflow-hidden"
            loading="lazy"
            alt=""
            src="/vector-2.svg"
          />
          <div className="or-txt">
            Or
          </div>
          <img
            className="h-px flex-1 relative max-w-full overflow-hidden"
            loading="lazy"
            alt=""
            src="/vector-2.svg"
          />
        </section>
        <div className="self-stretch flex flex-col items-center justify-start gap-[5px]">
          <h6 className="text-center mt-3 reg-txt">
            Don't have an account?
          </h6>
          <a className="signup-txt" href="javascript:void(0)">
            Sign Up
          </a>
        </div>
  </form>
</div>
</div>

    {/* <section className="flex-1 flex flex-row items-center justify-center py-[106.5px] px-5 box-border min-w-[468px] max-w-full mq675:pt-[69px] mq675:pb-[69px] mq675:box-border mq675:min-w-full">
      <form className="m-0 bg-white flex flex-col items-center justify-start gap-[20px] max-w-full" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <section className="self-stretch flex flex-col items-center justify-start gap-[8px]">
          <h2 className="m-0 self-stretch relative text-13xl font-black font-inter text-darkslategray text-left whitespace-nowrap mq450:text-lgi mq750:text-7xl">
            Log in
          </h2>
          {error && <div className="text-red-500">{error}</div>}
        </section>
        <section className="self-stretch flex flex-col items-start justify-start gap-[30px]">
          <Form className="[border:none] bg-[transparent] self-stretch font-poppins text-mini text-slategray-200 mq450:pr-5 mq450:box-border">
            <Form.Control type="text" placeholder="Username or Email" value={username} 
              onChange={(e) => setUsername(e.target.value)} />
            <Form.Text>Please enter username</Form.Text>
          </Form>
          <Form className="[border:none] bg-[transparent] self-stretch h-[52px] font-poppins text-mini text-slategray-200">
            <Form.Control type="password" placeholder="Password" value={password} 
              onChange={(e) => setPassword(e.target.value)} />
            <Form.Text>Please enter password</Form.Text>
          </Form>
        </section>
        <a className="[text-decoration:none] relative text-lg leading-[20px] font-medium font-lato text-dodgerblue text-center">
          Forgot Password
        </a>
        <Button
          className="self-stretch h-[45px] mq450:pl-5 mq450:pr-5 mq450:box-border"
          variant="primary"
          type="submit"
          size="lg"
        >
          Log in
        </Button>
        <section className="self-stretch flex flex-row items-center justify-start gap-[25px]">
          <img
            className="h-px flex-1 relative max-w-full overflow-hidden"
            loading="lazy"
            alt=""
            src="/vector-2.svg"
          />
          <div className="relative text-sm leading-[23px] font-lato text-gray text-center inline-block min-w-[17px]">
            Or
          </div>
          <img
            className="h-px flex-1 relative max-w-full overflow-hidden"
            loading="lazy"
            alt=""
            src="/vector-2.svg"
          />
        </section>
        <div className="self-stretch flex flex-col items-center justify-start gap-[5px]">
          <h6 className="m-0 self-stretch relative text-sm leading-[23px] font-normal font-lato text-gray text-center">
            Don’t have an account?
          </h6>
          <a className="[text-decoration:none] w-[62px] relative text-lg leading-[23px] font-medium font-lato text-dodgerblue text-center inline-block min-w-[62px] whitespace-nowrap">
            Sign Up
          </a>
        </div>
      </form>
    </section> */}
    </div>
  );
};

export default LoginForm;
