import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();
    const [notifications,setNotifications] =useState([]);

    useEffect(() => {
        getAllNotifications();
    }, []);

    useEffect(() => {
        const totalNotifications = notifications.reduce((sum, notification) => sum + notification.count, 0);
        setNotificationCount(totalNotifications);
    }, [notifications]);
    
    const getAllNotifications = async () => {
    try {
      const empId = localStorage.getItem("emp_Id");
      const response = await fetch(
        `https://j66s8vv088.execute-api.ap-south-1.amazonaws.com/rmtool/notification/to_approved_notification_count?emp_id=${empId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      //debugger;
      setNotifications(result);
    } catch (error) {
      console.log("error", error);
    }
  };


    const handleExpand = () => {
        setExpanded(!expanded);
        setShowLogout(false); // Hide logout button when expanding/collapsing
    };

    const handleToggleLogout = (event) => {
        event.stopPropagation(); // Prevent event propagation to parent element
        setShowLogout(!showLogout);
    };

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleNotificationClick = (link) => {
        setShowNotifications(false);
        navigate(link);
    };

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('EmployeeToken'); // Cookie remove
    };

    return (
        <header className="self-stretch bg-white flex flex-row items-center justify-between pt-2.5 px-10 pb-2 top-[0] z-[99] sticky gap-[20px] text-left text-sm text-darkslateblue-200 font-poppins border-b-[1px] border-solid border-lavender-100">
            <div className="flex flex-row items-start justify-start gap-[10px]">
                <img
                    className="h-[34px] w-[39px] relative object-cover"
                    loading="lazy"
                    alt=""
                    src="/group-1-2@2x.png"
                />
                <img
                    className="self-stretch w-px relative max-h-full min-h-[36px]"
                    loading="lazy"
                    alt=""
                    src="/vector-257.svg"
                />
                <div className="relative tracking-[-0.02em] leading-[15px] font-semibold">
                    <p className="m-0">{`Project `}</p>
                    <p className="m-0">{`Management `}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[30px] text-darkslateblue-100 font-inter relative">
                <div className="relative cursor-pointer" onClick={handleToggleNotifications}>
                    <img
                        className="h-6 w-6 relative"
                        loading="lazy"
                        alt=""
                        src="/vuesaxlinearnotification.svg"
                    />

                    {notificationCount > 0 && (
                        <span className="absolute top-0 right-0 inline-block h-4 w-4 bg-red-600 text-white text-xs font-bold rounded-full text-center leading-[1.25rem]">
                            {notificationCount}
                        </span>
                    )}
                </div>
                {showNotifications && (

                    <div className="absolute right-0 mt-10 bg-white border rounded shadow-lg" style={{ width: '300px', top: '0', right: '150px' }}>
                        <div className="p-2">
                            <h4 className="font-semibold text-lg">Notifications</h4>
                            {console.log("dddd",notifications.length)}
                            {notifications.length > 0 ? (
                                <ul className="list-none p-0 m-0">
                                    {notifications.map(notification => (
                                        <li
                                            key={notification.id}
                                            className="p-2 border-b hover:bg-skyblue cursor-pointer"
                                            onClick={() => handleNotificationClick(notification.link)}
                                        >
                                            <div className="flex justify-between">
                                                <span>{notification.message}</span>
                                                <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                                                    {notification.count}
                                                </span>
                                            </div>
                                            
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-2">No new notifications</p>
                            )}
                        </div>
                    </div>
                )}
                <div className="flex flex-row items-center justify-start gap-[5px]">
                    <img
                        className="h-10 w-10 relative object-cover min-h-[40px]"
                        alt=""
                        src="/profilepic@2x.png"
                    />
                    <div className="flex flex-col items-start justify-start">
                        <div
                            className="relative leading-[20px] font-medium inline-block min-w-[92px] whitespace-nowrap cursor-pointer"
                            onClick={handleExpand}
                        >
                            {localStorage.getItem('emp_UserName')} <FaChevronDown onClick={handleToggleLogout} />
                        </div>

                        {showLogout && (
                            <div className="absolute right-0 mt-[40px] bg-white border rounded-2 shadow-lg" style={{ width: '230px' }}>
                                <div className="">
                                    <Link className="dropdown-item px-4 py-3 hover:bg-skyblue border-bottom-2 border border-radius-0" to="/profile">Profile</Link>
                                </div>
                                <div className="">
                                    <Link className="dropdown-item px-4 py-3 hover:bg-skyblue border-radius-0" to="/" onClick={handleLogout}>Logout</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
