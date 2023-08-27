import { useEffect, useState } from "react";
import * as icon from "react-icons/io";
import * as icons from "react-icons/ri";
import './../Assets/css/income.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import './../index.css'
import Loader from "./Loader";


const ExpenseTable = () => {
  const [dataexp, setDataExp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("Token");

  const fetchData = async (page) => {
    let id = localStorage.getItem('createdBy');
    let API_URL =''
    daysAgoValue==="all"?API_URL = 'http://localhost:5000/api/v1/expense/' + id + '?page=' + page:
    API_URL = 'http://localhost:5000/api/v1/expense/' + id + '?page=' + page +'&daysAgo='+daysAgoValue
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
      setDataExp(datas.expenses);
      setTotalPages(datas.totalPages);
      setLoading(false);
    } catch (error) {
      // Handle error here
    }
  };

  function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if this cookie is the one we are looking for
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    // If the cookie is not found, return null
    return null;
}
let daysAgoValue = getCookie('daysAgoExp');


  const deleteData = (e) => {
    console.log(e);
    let config = {
      method: 'delete',
      url: 'http://localhost:5000/api/v1/expense/' + e,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };

    axios.request(config)
      .then((response) => {
        if(JSON.stringify(response.status) === 495){
          window.location.replace('/')
        }           
        if (JSON.stringify(response.data.status) === '200') {
          toast.success('Successfully Deleted');
          window.location.reload()
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage);

  }, [currentPage,daysAgoValue])

  let count_table = (0 + (currentPage - 1) * 5)

  const addPage = () => {
    setCurrentPage(currentPage + 1)

  }

  const removePage = () => {
    setCurrentPage(currentPage - 1)

  }

  const currency_symbol = localStorage.getItem("selectedCurrency")

  return (
    <>
      <br /><br />
      <div><Toaster /></div>

      {loading ? <Loader /> : dataexp.length > 0 ? (
        <div className="relative px-4">
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
                      To
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Category
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataexp.map((tablesa) => {
                      const { _id, description, amount, date, mode, to, category } = tablesa
                      count_table = count_table + 1
                      return (
                        <tr className="text-[16px] hover:bg-gray-100 bg-white text-black border-b dark:border-gray-700 text-center" key={_id}>
                          <td className="py-4">{count_table}</td>
                          <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                          <td>
                            {
                              currency_symbol === 'INR' ? '₹ '
                                : currency_symbol === 'USD' ? "$ "
                                  : currency_symbol === 'CAD' ? "C$ "
                                    : currency_symbol === "AED" ? "د.إ "
                                      : currency_symbol === "EUR" ? "€ "
                                        : currency_symbol === "GBP" ? "£ "
                                          : currency_symbol === "JPY" ? "¥ "
                                            : currency_symbol === "AUD" ? "AU$ "
                                              : ""
                            }
                            {amount}</td>
                          <td>{mode}</td>
                          <td>{to}</td>
                          <td>{description}</td>
                          <td>{category}</td>
                          <td onClick={() => deleteData(_id)}>
                            <button className="rounded-md px-4 py-2 text-[15px]">
                              <icons.RiDeleteBinLine className="hover:cursor-pointer text-[20px]" />
                            </button>
                          </td>
                        </tr>
                      )
                    }
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

        </div>
      ) : <>
        <div>
          <h1 className="text-center font-semibold pt-12">No Data</h1>
        </div>
      </>}
    </>
  )
}

export default ExpenseTable
