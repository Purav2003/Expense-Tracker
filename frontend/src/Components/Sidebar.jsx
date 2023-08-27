import "../Assets/css/sidebar.css";
import { useState, useEffect } from 'react';
import { navLinks } from './Navlinks';
import dp from './../assets/images/signup.png';
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [active, setActive] = useState("");
    const [showProfileMenu,setShowProfileMenu] = useState(false)

    useEffect(() => {
        // Function to set the active menu item based on the URL
        const setActiveMenuItem = () => {
            if (window.location.href.includes('income')) {
                setActive("Income");
            } else if (window.location.href.includes('dashboard')) {
                setActive("Dashboard");
            } else if (window.location.href.includes('expense')) {
                setActive("Expense");
            } else if (window.location.href.includes('report')) {
                setActive("Report");
            } else if (window.location.href.includes('profile')) {
                setActive("Profile");
            }
        };

        // Call setActiveMenuItem when the component mounts and URL changes
        setActiveMenuItem();

        // Add an event listener to update the active menu item when the URL changes
        window.addEventListener('popstate', setActiveMenuItem);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('popstate', setActiveMenuItem);
        };
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        };

    return (
        <>
            <nav className="bg-[#3b72ff] border-gray-200 fixed w-full z-[100]">                
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/dashboard" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={showMenu}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${showMenu ? 'block' : 'hidden'}`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                            {navLinks.map((link) => (
                                <li key={link.id} className={`${active === link.title
                                    ? "font-bold bg-[rgba(255,255,255,0.1)] rounded-lg"
                                    : "font-medium"} text-hello hover:text-white text-[18px]`
                                }>
                                    <Link to={link.link} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[rgba(255,255,255,0.1)]  group">
                                        {link.icon}<span className="ml-3">{link.title}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={toggleProfileMenu}
                                    className={`flex items-center`}
                                >
                                    <img src={dp} className='w-11 h-11 bg-white rounded-full img-dp' />
                                </button>
                                <ul
                                    className={`${showProfileMenu ? 'block' : 'hidden'} absolute lg:right-2 md:right-2 mt-2 space-y-2 rounded-lg shadow-md bg-fourth`}
                                >
<li >
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        Report
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/help"
                                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <hr></hr>
                                <li>
                                    <Link
                                        to="/logout"
                                        className="block p-2 px-4 my-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        Log Out
                                    </Link>
                                </li>                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Rest of your component */}
            <br></br><br></br><br></br>
        </>
    );
};

export default Sidebar;
