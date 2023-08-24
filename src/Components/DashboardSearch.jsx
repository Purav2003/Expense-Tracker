import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as icon from "react-icons/io";
import * as icons from "react-icons/ri";
import axios from "axios";
import * as iconf from "react-icons/fi"

import toast, { Toaster } from 'react-hot-toast';
import Skeleton from "react-loading-skeleton";
import Sidebar from "./Sidebar";

import '../Assets/css/income.css';
import '../index.css';

const DashboardSearch = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    let search = localStorage.getItem('income-trial');

    const fetchData = async (page) => {
      let id = localStorage.getItem('createdBy');
      const API_URL = 'http://localhost:5000/api/v1/dashboard/search/'+id+'?search='+search+'&page='+page;
    console.log(API_URL)
      try {
        const response = await fetch(API_URL);
        const datas = await response.json();
        console.log(datas.searchedData)
        setData(datas.searchedData.results);
        setTotalPages(datas.totalPages);
        setLoading(false) 
      } catch (error) {
            console.log(error)
      }
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const search = document.querySelector('.search-income').value
        localStorage.setItem("income-trial",search)
        if(search!==""){
            window.location.replace('search-dashboard')}
            else{
              document.getElementById('errora').innerHTML = '<h1 className="pt-[0.5vw]">Enter Something</h1>'
            }
  
      }
    useEffect(() => {
      setLoading(true);
      fetchData(currentPage);
    }, [currentPage]);
  
    let count_table = (0 + (currentPage - 1) * 5);
  
    const addPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const removePage = () => {
      setCurrentPage(currentPage - 1);
    };
  
  return (
            <>
                   <div className="bg-white">         
                   <Sidebar />
   
                    <div><Toaster /></div>

    <div><br></br><br></br> 
    <div className="lg:flex px-8 main-heading-mob">
    <h1 className="text-2xl w-full font-bold">Search Result Of <i className="font-semibold">"{search}"</i> </h1>  
    <div className="ml-[32vw] justify-end	relative w-[80%] bg-[#eee] rounded-lg shadow-md px-4 py-2 search-bar">
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Type to Search"
        className="border-none outline-none bg-transparent pr-8 w-[90%] search-income"
      />      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
        <button type="submit"><iconf.FiSearch className="h-5 w-5 text-gray-500" /></button>
      </div>
      </form>

    </div>  
</div> <div id="errora" className="ml-[69vw] pt-[2vh]" ></div><br></br><br></br>

{data.length!==0?(        <div className="relative px-4">
          <div>
            <div className="table-income">
              <table className="table-income rounded-lg lg:w-full shadow-lg bg-white overflow-scroll text-sm text-left">
                <thead className="pt-4 text-xs text-gray-700 uppercase">
                  <tr className="text-[#404040] text-[14px]">
                    
                    <th scope="col" className="px-6 py-3 text-center  ">
                      Sr.No
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Mode
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      From / To
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="w-[10%]">
                  { loading? (
                    <tr>
                      <td colSpan="7">                        
                        <Skeleton count={5} height={45} /> 
                      </td>
                    </tr>
                  ) :(
                    data.map((tables) => {
                      const { _id, description, amount, date, mode, from,to } = tables;
                      count_table = count_table + 1;
                      return (
                        <tr className="text-[16px] hover:bg-gray-100 bg-white text-black border-b dark:border-gray-700 text-center">
                          <td className="py-4">{count_table}</td>
                          <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                          <td>{from?"+":"-"}&nbsp;&#8377; {amount}</td>
                          <td>{mode}</td>
                          <td>{from?from:to}</td>
                          <td>{description}</td>
                         
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full pg-no">
              <div className="bg-white text-right">
                <h1 className="py-4 pr-[30px]">
                  Page No: {currentPage} of {totalPages}
                  <button className="pl-[5px] " onClick={removePage} disabled={currentPage === 1}>
                    <icon.IoIosArrowBack />{" "}
                  </button>
                  <button onClick={addPage} disabled={currentPage === totalPages}>
                    <icon.IoIosArrowForward />
                  </button>
                </h1>
              </div>
            </div>
          </div>
          <br></br>
        </div>)
:<><h1><center>No Data</center></h1></>}


    
    </div>
</div>
            </>
    )
};

export default DashboardSearch;
