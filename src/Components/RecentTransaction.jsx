import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as icon from "react-icons/io";
import * as icons from "react-icons/bi";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from "react-loading-skeleton";

import '../Assets/css/income.css';
import '../index.css';

const RecentTransaction = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/dashboard/' + id;
    
    try {
      const response = await fetch(API_URL);
      const datas = await response.json();
      console.log(datas.transaction)
      setData(datas.transaction);
      setTimeout(() => {  setLoading(false);}, 600);
    } catch (error) {
      // Handle error here
    }
  };


  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  let count_table = (0 + (currentPage - 1) * 5);



  return (
    <>
      <br /><br />
      <div><Toaster /></div>
      <h1 className="p-4 font-bold text-[20px]">Recent Transactions</h1>
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
                  {loading ? (
                    <tr>
                      <td colSpan="7">                        
                        <Skeleton count={5} height={45} /> 
                      </td>
                    </tr>
                  ) : (
                    data.map((tables) => {
                      const { description, amount, date, mode, from ,to} = tables;
                      count_table = count_table + 1;
                      return (
                        <tr className="text-[16px] text-[black] hover:bg-gray-100 bg-white text-black border-b dark:border-gray-700 text-center" key={count_table}>
                          <td className="py-4">{count_table}</td>
                          <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                          <td>{from?"+":"-"}&nbsp;&#8377; {amount}</td>
                          <td>{mode}</td>
                          <td>{from?from:to} </td>
                          <td>{description}</td>                         
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
               
          
            </div>          
          </div>
          <br></br>
        </div>)
:<><h1><center>No Data</center></h1></>
                  }</>
  );
};

export default RecentTransaction;
