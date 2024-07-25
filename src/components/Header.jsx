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
    const [notifications, setNotifications] = useState([]);

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
        <div>
            <header>
                <nav className='navbar bg-white'>
                    <div className='flex'>
                        <img className='toggle' alt="" src="/hide-show-icon.svg" />
                        <div className='header-search pos-rel'>
                            <input className='form-control' type='text' placeholder='Search'></input>
                            <span className='searchicon'>
                                <img alt="" src="/search-icon.png" /></span>
                        </div>
                    </div>
                    <div>
                        <ul className='user-list'>
                            <li className='align-self-center pos-rel me-3'>
                                <img className="notofication-icon" loading="lazy" alt="" src="/vuesaxlinearnotification.svg" onClick={handleToggleNotifications}/>
                                {notificationCount > 0 && (
                                    <span className='count'>{notificationCount}</span>
                                )}
                                {showNotifications && (
                                    <div className='notification-pop'>
                                        <h6>Notifications</h6>
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
                                )}
                            </li>
                            <li className='flex'>
                                <div>
                                    <img className="user-avtar" alt="" src="/profilepic@2x.png" />
                                </div>
                                <div className='pos-rel' onClick={handleToggleLogout}>
                                    <span className='username'>{localStorage.getItem('emp_UserName')} <img src='/arrow-down.svg' ></img></span>
                                    <div className='userrole'>{localStorage.getItem('emp_Role')}</div>
                                    {showLogout && (
                                        <ul className='user-drop'>
                                            <li>Profile</li>
                                            <li>
                                                <Link className="dropdown-item hover:bg-skyblue border-radius-0" to="/" onClick={handleLogout}>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
