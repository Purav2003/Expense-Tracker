import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid,AreaChart,Tooltip, ComposedChart,Area,Legend,Bar,PieChart,Pie,Cell,Sector } from 'recharts';

const IncomeTable = () => {
    const [data,setData] = useState([]);
    let counter = 1
    // localStorage.setItem("Counter",counter)
    let c = localStorage.getItem("Counter")

    const [count,setCount] = useState();
    console.log(count)
    const nextPage = () =>{
      counter = counter + 1        
      localStorage.setItem("Counter",counter)

  }
    const fetchData = () => {
        let id = localStorage.getItem('createdBy');
        counter = 1
        const API_URL = 'http://localhost:5000/api/v1/income/' + id;
      console.log(API_URL)
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => {
            setData(data.expenses);
            console.log(data.expenses)
            setCount(data.expenses.currentPage)
          })
          .catch((error) => {
            
          });
      };
    useEffect(() => {
        fetchData(); 
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
       
    }, [])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

    return (
        <>
        <br></br><br></br>
<div className="relative overflow-x-auto">
  <a onClick={nextPage}>Next</a>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                
            </tr>
        </thead>
        <tbody>
            
                {
                    data.map((tables)=>{
                        const{description,amount,date,mode} = tables

                        return(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td>{description}</td>
                                <td>{amount}</td>
                                <td>{date}</td>
                                <td>{mode}</td>
                            </tr>
                        )
                    })

                    

                }
            
            
        </tbody>
    </table><br></br>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="amount" height={60}  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mode" stroke="#8884d8"  />
          <Line type="monotone" dataKey="amount" stroke="#8884d8"  />

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
         
        </LineChart>
        <ComposedChart
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
          </PieChart>
   
</div>
</>
    )
}

export default IncomeTable