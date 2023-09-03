import "../assets/css/sidebar.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Identicon from "react-identicons";
import { navLinks } from "./Navlinks";

const Sidebar = () => {
  // State variables
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("");
  const [data, setData] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Token");

  // Get the current route location
  const location = useLocation();

  // Function to fetch user profile data
  const fetchData = async () => {
    // Replace this with actual API call to fetch user data
    const id = localStorage.getItem("createdBy");
    const API_URL = `http://localhost:5000/api/v1/auth/profile/${id}`;

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data_new = await response.json();
      if (data_new.status === 495) {
        window.location.replace("/");
      }
      setLoading(false);
      setData(data_new.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data and set active menu item when the component mounts
    fetchData();
    setActiveMenuItem();
  }, []);

  // Function to set the active menu item based on the current route
  const setActiveMenuItem = () => {
    const currentPath = location.pathname;
    let found = false;

    navLinks.forEach((link) => {
      if (currentPath.includes(link.link)) {
        setActive(link.title);
        found = true;
      }
    });

    if (!found) {
      setActive("");
    }
  };

  // Function to toggle the main menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to toggle the profile menu
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Function to handle clicking on menu items
  const handleMenuItemClick = (title) => {
    setActive(title);
    setShowMenu(false); // Close the main menu
  };

  return (
    <>
      {loading ? (
        // Display a loading indicator here
        <div>Loading...</div>
      ) : (
        // Render the navigation menu when data is not loading
        <nav className="bg-fourth border-gray-200 fixed w-full z-[100]">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/dashboard" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Expense Tracker
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={showMenu}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`w-full md:block md:w-auto ${
                showMenu ? "block" : "hidden"
              }`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title
                        ? "font-bold bg-[rgba(255,255,255,0.1)] rounded-lg"
                        : "font-medium"
                    } text-hello hover:text-white text-[18px]`}
                  >
                    <Link
                      to={link.link}
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[rgba(255,255,255,0.1)] group"
                      onClick={() => handleMenuItemClick(link.title)}
                    >
                      {link.icon}
                      <span className="ml-3">{link.title}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={toggleProfileMenu} className={`flex items-center`}>
                    <Identicon
                      string={data.email} // Use user's email as the identifier
                      size={40} // Adjust size as needed
                      className="bg-white p-1 object-cover rounded-full"
                    />
                  </button>
                  <ul
                    className={`${showProfileMenu ? "block" : "hidden"} absolute lg:right-2 md:right-2 mt-2 space-y-2 rounded-lg shadow-md bg-white`}
                  >
                    {/* Profile menu items */}
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 pt-4  hover:text-[black] hover:bg-fourth hover:text-white"
                        onClick={toggleProfileMenu}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:text-[black] hover:bg-fourth hover:text-white"
                        onClick={toggleProfileMenu}
                      >
                        Report
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:text-[black] hover:bg-fourth hover:text-white"
                        onClick={toggleProfileMenu}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/help"
                        className="block px-4 py-2 hover:text-[black] hover:bg-fourth hover:text-white"
                        onClick={toggleProfileMenu}
                      >
                        Help
                      </Link>
                    </li>
                    <hr></hr>
                    <li>
                      <Link
                        to="/logout"
                        className="block p-2 px-4 my-2 hover:text-[black] hover:bg-fourth hover:text-white"
                      >
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <br></br><br></br><br></br>
    </>
  );
};

export default Sidebar;
