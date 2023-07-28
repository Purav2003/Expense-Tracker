import { useEffect, useState } from "react";
import { LineChart,BarChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Tooltip, ComposedChart, Area, Legend, Bar, PieChart, Pie, Cell, Sector } from 'recharts';
import { Link } from "react-router-dom";
import * as icon from "react-icons/io";
import * as icons from "react-icons/ri";

import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import gif from '../Assets/images/loading.gif';
import '../index.css'


const IncomeTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1);
  let counter = 1
  // localStorage.setItem("Counter",counter)


  const fetchData = async (page) => {
    let id = localStorage.getItem('createdBy');
    counter = 1
    const API_URL = 'http://localhost:5000/api/v1/income/' + id + '?page=' + page;
    fetch(API_URL)
      .then((res) => res.json())
      .then((datas) => {
        setLoading(false);
        setData(datas.income);

        setTotalPages(datas.totalPages);
      })
      .catch((error) => {

      });
  };
  const deleteData = (e) =>{
    console.log(e)
    let config = {
      method: 'delete',
      url: 'http://localhost:5000/api/v1/income/'+e,
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
         
      })
  }
  useEffect(() => {
    setLoading(true);

    fetchData(currentPage);

  }, [currentPage])

  let count_table = (0 + (currentPage -1)* 5)


  const addPage = () => {
    setCurrentPage(currentPage + 1)

  }
  const removePage = () => {
    setCurrentPage(currentPage - 1)

  }
  return (
    <>
      <br></br><br></br>
      <div><Toaster/></div>
      
     <div className="relative lg:flex">
        
        
      <div>
        <table className="overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
              Sr.No
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Mode
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>

            {
              data.map((tables) => {
                const { _id,description, amount, date, mode, from } = tables
                count_table = count_table+1
                return (                  
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    <td>{count_table}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                    <td>{mode}</td>
                    <td>{from}</td>
                    <td onClick={()=>deleteData(_id)}><icons.RiDeleteBinLine className="hover:cursor-pointer text-[20px]"/></td>
                  </tr>
                )

              })
            }


          </tbody>
          <tfoot>
            <tr className="bg-gray-700 px-2 py-4 text-sm text-left text-gray-500 dark:text-gray-400">
              <td className="px-4 py-4" colSpan={7}>Page {currentPage} of {totalPages} <button className="pl-[20px]" onClick={removePage} disabled={currentPage === 1}><icon.IoIosArrowBack /> </button><button onClick={addPage} disabled={currentPage === totalPages}><icon.IoIosArrowForward ></icon.IoIosArrowForward></button></td>
              
              </tr>

          </tfoot>
        </table>  
        </div>    
    
        <br></br>
        <div >
        {/* <BarChart className="pt-[3vw]"
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis scale="point" padding={{ left: 60, right: 60 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#404040" background={{ fill: '#eee' }} />

        </BarChart> */}
         <ComposedChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis  scale="band" padding={{ left: 10, right: 10 }}/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" barSize={20} fill="#413ea0" />
          <Line type="bump" dataKey="amount" stroke="#ff7300" />
        </ComposedChart>
        </div>
       

      </div>
    </>
  )
}

export default IncomeTable