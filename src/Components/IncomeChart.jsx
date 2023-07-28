import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Tooltip, Area } from 'recharts';
import { useState, useEffect } from 'react';

const IncomeChart = () => {
    const [data, setData] = useState([]);
    const fetchData = () => {
        let id = localStorage.getItem('createdBy');
        const API_URL = 'http://localhost:5000/api/v1/income/' + id;
    
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => {
            setData(data.expenses);
          })
          .catch((error) => {
          });
      };
    useEffect(() => {
        fetchData(); 
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
       
    }, [])

    return (
        <>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* <CartesianGrid /> */}
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip />
                <Area type="natural" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>

        </>
    )

}

export default IncomeChart