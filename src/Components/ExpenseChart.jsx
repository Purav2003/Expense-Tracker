import { LineChart, Line, XAxis, YAxis, CartesianGrid,AreaChart,Tooltip,Area } from 'recharts';
import { useState, useEffect } from 'react';
const ExpenseChart = () => {
    const [data, setData] = useState([]);
    let data_count=' '
    let id = localStorage.getItem("createdBy")
    const API_URL = 'http://localhost:5000/api/v1/income/' + id
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then(data => {
                setData(data.income)
            })
        // data_count=data.length
        console.log(data)
        console.log("Hit-1")
        console.log(data_count)

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

export default ExpenseChart