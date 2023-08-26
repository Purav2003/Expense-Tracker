import React, { useEffect } from "react";
import Sidebar from "/src/Components/Sidebar";
import RecentTransaction from "/src/Components/RecentTransaction";
import CalendarDashboard from "/src/Components/CalendarDashboard";
import SummaryDashboard from "/src/Components/SummayDashboard";
import * as icon from "react-icons/fi";
import '/src/assets/css/dashboard.css';

const Dashboard = () => {
  let name = localStorage.getItem("username");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = document.querySelector('.search-income').value;
    localStorage.setItem("income-trial", search);
    if (search !== "") {
      window.location.replace('/search-dashboard');
    } else {
      document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Enter Something</h1>';
    }
  };


  return (
    <div className="bg-normal">
      <Sidebar />
      <>
        <div>
          <br />
          <br />
          <div className="lg:flex px-8 main-heading-mob">
            <h1 className="text-4xl w-full font-bold">&#128075; {name} </h1>
            <div className="ml-auto lg:ml-[33vw] justify-end search-dashboard relative lg:w-[80%] bg-[#eee] rounded-lg shadow-md lg:px-4 py-2 ">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Type to Search"
                  className="border-none outline-none search-income bg-transparent pr-8 w-full"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="submit"><icon.FiSearch className="h-5 w-5 text-gray-500" /></button>
                </div>
              </form>
            </div>
          </div>
          <div id="errora" className="ml-auto lg:ml-[69vw] pt-[2vh]"></div><br />
          <div className="lg:grid lg:grid-cols-3 gap-4">
            {/* 1st Row */}
            <div className="col-span-2 lg:col-span-3 w-full"><SummaryDashboard /><br></br></div>

            {/* 2nd Row */}
            <div className="col-span-2 lg:col-span-3"><CalendarDashboard /></div>

            {/* 3rd Row */}
            <div className="p-2 col-span-2 lg:col-span-3">
              <RecentTransaction />
            </div>
          </div>
        </div><br></br>
      </>
    </div>
  );
};

export default Dashboard;
