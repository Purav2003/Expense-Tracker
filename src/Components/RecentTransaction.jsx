import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader'
import '../Assets/css/income.css';
import '../index.css';

const RecentTransaction = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Token");

  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/dashboard/' + id;
    
    try {
      const response = await fetch(API_URL, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });      const datas = await response.json();
      if(datas.status === 495){
        window.location.replace('/')
      }      
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
  const currency_symbol = localStorage.getItem("selectedCurrency")



  return (
    <><br></br>
      <div><Toaster /></div>
      <h1 className="p-4 lg:px-12 font-bold text-[20px]">Recent Transactions</h1>
{loading?<Loader />:data.length!==0?(        <div className="relative lg:px-12">
          <div>
            <div className="table-income table-dash">
              <table className="table-income rounded-lg lg:w-full shadow-lg bg-white overflow-scroll text-sm text-left">
                <thead className="pt-4 text-xs bg-fourth text-white uppercase">
                  <tr className="text-white text-[14px]">
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
                <tbody className="w-[10%] bg-[#e8ebf8]">
                  {
                    data.map((tables) => {
                      const { description, amount, date, mode, from ,to} = tables;
                      count_table = count_table + 1;
                      return (
                        <tr className="text-[16px] text-[black] hover:bg-gray-100 bg-white text-black border-b dark:border-gray-700 text-center" key={count_table}>
                          <td className="py-4">{count_table}</td>
                          <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                          <td>{from?"+":"-"}&nbsp;
                          {
                          currency_symbol==='INR'?'₹ '
                          :currency_symbol==='USD'?"$ "
                          :currency_symbol==='CAD'?"C$ "
                          :currency_symbol==="AED"?"د.إ "
                          :currency_symbol==="EUR"?"€ "
                          :currency_symbol==="GBP"?"£ "
                          :currency_symbol==="JPY"?"¥ "                          
                          :currency_symbol==="AUD"?"AU$ "                          
                          :""
                        }
                          
                           {amount}</td>
                          <td>{mode}</td>
                          <td>{from?from:to} </td>
                          <td>{description}</td>                         
                        </tr>
                      );
                    }
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
