import { useEffect, useState } from "react";
import { LineChart,BarChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Tooltip, ComposedChart, Area, Legend, Bar, PieChart, Pie, Cell, Sector } from 'recharts';
import { Link } from "react-router-dom";
import * as icon from "react-icons/io"
const IncomeTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
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
        setData(datas.income);
        setTotalPages(datas.totalPages);
      })
      .catch((error) => {

      });
  };
  useEffect(() => {
    fetchData(currentPage);

  }, [currentPage])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  let count_table = 0
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const addPage = () => {
    setCurrentPage(currentPage + 1)

  }
  const removePage = () => {
    setCurrentPage(currentPage - 1)

  }
  return (
    <>
      <br></br><br></br>
      <div className="relative flex">
        {data.length>0? <>
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
            </tr>
          </thead>
          <tbody>

            {
              data.map((tables) => {
                const { SrNo,description, amount, date, mode, from } = tables
                count_table = count_table+1

                return (                  
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                    <td>{count_table}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>{date.slice(0, 10).split("-").reverse().join("-")}</td>
                    <td>{mode}</td>
                    <td>{from}</td>
                  </tr>
                )
              })
            }


          </tbody>
          <tfoot>
            <tr className="bg-gray-700 px-2 py-4 text-sm text-left text-gray-500 dark:text-gray-400">
              <td className="px-4 py-4" colSpan={6}>Page {currentPage} of {totalPages} <button className="pl-[20px]" onClick={removePage} disabled={currentPage === 1}><icon.IoIosArrowBack /> </button><button onClick={addPage} disabled={currentPage === totalPages}><icon.IoIosArrowForward ></icon.IoIosArrowForward></button></td>
              
              </tr>

          </tfoot>
        </table>  
        </>    
        :<>
          <h1>No Data Avialable</h1>
        </>
}
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
        <LineChart className="pt-[3vw]"
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
          <Line dataKey="amount" type="monotone" background={{ fill: '#eee' }} activeDot={{ r: 8 }}/>

        </LineChart>
        </div>
        {/* <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="description" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="amount" stroke="#ff7300" />
        </ComposedChart>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart> */}

      </div>
    </>
  )
}

export default IncomeTable