import { useEffect, useState } from "react";
import { LineChart, BarChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, ResponsiveContainer, Tooltip, ComposedChart, Area, Legend, Bar, PieChart, Pie, Cell, Sector } from 'recharts';
import { Link } from "react-router-dom";
import * as icon from "react-icons/io";
import * as icons from "react-icons/ri";
import '../Assets/css/income.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import gif from '../Assets/images/loading.gif';
import '../index.css'
import Skeleton from "react-loading-skeleton";

import '../Assets/css/income.css';
import '../index.css';

const ExpenseTableWeek = () => {

  const [dataexp, setDataExp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async (page) => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/expense/' + id + '?page=' + page + '&daysAgo=oneweek';
    try {
      const response = await fetch(API_URL);
      const datas = await response.json();

      setDataExp(datas.expenses);
      setTotalPages(datas.totalPages);
      setTimeout(() => { setLoading(false); }, 1000);
    } catch (error) {
      // Handle error here
    }
  };

  const deleteData = (e) => {
    console.log(e);
    let config = {
      method: 'delete',
      url: 'http://localhost:5000/api/v1/expense/' + e,
      headers: {
        'Content-Type': 'application/json'
      },
    };

    axios.request(config)
      .then((response) => {
        if (JSON.stringify(response.data.status) === '200') {
          toast.success('Successfully Deleted');
          window.location.reload()
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage);

  }, [currentPage])

  let count_table = (0 + (currentPage - 1) * 5)

  const addPage = () => {
    setCurrentPage(currentPage + 1)

  }

  const removePage = () => {
    setCurrentPage(currentPage - 1)

  }

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#0088FE', '#00C49F', '#FFBB28'];

  const calculateCategoryDistribution = () => {
    const categoryDistribution = {};

    dataexp.forEach((expense) => {
      const { category, amount } = expense;
      if (categoryDistribution[category]) {
        categoryDistribution[category] += amount;
      } else {
        categoryDistribution[category] = amount;
      }
    });

    return Object.keys(categoryDistribution).map((category) => ({
      name: category,
      value: categoryDistribution[category],
    }));
  };

  return (
    <>
      <br /><br />
      <div><Toaster /></div>

      {dataexp.length > 0 ? (
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
                  {loading ? (
                    <tr>
                      <td colSpan="7">
                        <Skeleton count={5} height={45} />

                      </td>
                    </tr>
                  ) : (
                    dataexp.map((tablesa) => {
                      const { _id, description, amount, date, mode, to, category } = tablesa
                      count_table = count_table + 1
                      return (
                        <tr className="text-[16px] hover:bg-gray-100 bg-white text-black border-b dark:border-gray-700 text-center" key={_id}>
                          <td className="py-4">{count_table}</td>
                          <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                          <td>&#8377; {amount}</td>
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
          {loading ? <center><Skeleton height={300} width={300} borderRadius={100} /></center> : <div className="bg-white lg:flex mt-[10px] bg-white">

            <div className="piechart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={calculateCategoryDistribution()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                  >
                    {
                      calculateCategoryDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))
                    }
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
          }

        </div>
      ) : <>
        {loading ? <Skeleton count={5} width={45} /> : <div>
          <h1 className="text-center text-2xl font-bold">NO DATA</h1>
        </div>}
      </>}
    </>
  )
}

export default ExpenseTableWeek