import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as icons from 'react-icons/bi';
import dp from '../assets/images/login.png';

import '../Assets/css/sidebar.css';
import { navLinks } from './Navlinks';

const Sidebar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <nav className="bg-primary border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/dashboard" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
                </Link>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navLinks.map((link) => (
                            <li
                                key={link.id}
                                className={`font-medium text-hello text-[18px] ${showProfileMenu ? '' : 'group'
                                    }`}
                            >
                                <Link
                                    to={link.link}
                                    className={`flex items-center p-2 text-gray-900 rounded-lg ${showProfileMenu ? 'group' : ''
                                        }`}
                                >
                                    {link.icon}
                                    <span className="ml-3">{link.title}</span>
                                </Link>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={toggleProfileMenu}
                                className={`flex items-center rounded-lg`}
                            >

                                <img src={dp} className='w-12 bg-white rounded-full' />              </button>

                            <ul
                                className={`${showProfileMenu ? 'block' : 'hidden'
                                    } absolute right-2  mt-2 space-y-2 bg-white border rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700`}
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
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-900 dark:text-white hover:text-[black] hover:bg-white"
                                    >
                                        Settings
                                    </Link>
                                </li>   
                                <hr></hr>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-gray-900 dark:text-white "
                                    >
                                        Log Out
                                    </Link>
                                </li>              </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
