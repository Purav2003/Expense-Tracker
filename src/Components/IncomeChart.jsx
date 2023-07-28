import { LineChart, Line, XAxis, YAxis, CartesianGrid,AreaChart,Tooltip,Area } from 'recharts';
import { useState, useEffect } from 'react';
const IncomeChart = () => {
    const [data, setData] = useState([]);
    let id = localStorage.getItem("createdBy")
    const API_URL = 'http://localhost:5000/api/v1/income/' + id
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then(data => {
                setData(data.expenses)
            })
        console.log("Hit-1")
    }, [data])

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