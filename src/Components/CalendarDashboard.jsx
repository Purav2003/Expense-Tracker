import 'rsuite/dist/rsuite-no-reset.css'; // Import RSuite styles
import { useEffect, useState } from "react";
import React from 'react';
import { Calendar, Badge } from 'rsuite';
import axios from 'axios';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


const CalendarDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataincome, setDataIncome] = useState([]);
  const [dataexpense, setDataexpense] = useState([]);

  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/dashboard/dateHighlight/' + id;

    try {
      const response = await fetch(API_URL);
      const datas = await response.json();
      setData(datas.dates);
    } catch (error) {
      // Handle error here
    }
  };



  useEffect(() => {
    fetchData();
  }, []);




  const specialDate = data.map(item => new Date(item.date));

  const renderCell = (date) => {
    const cellDate = date.getDate();
    const cellMonth = date.getMonth();
    const cellYear = date.getFullYear();

    // Check if the current date matches the special date
    // Check if the current date is in the list of special dates
    const isSpecialDate = specialDate.some((specialDate) => {
      return (
        cellDate === specialDate.getDate() &&
        cellMonth === specialDate.getMonth() &&
        cellYear === specialDate.getFullYear()
      );
    });

    if (isSpecialDate) {
      return (
        <div style={{ position: 'relative' }}>
          <Badge />
        </div>
      );
    }
    return null;
  };

  function reverseDateFormat(inputDate) {
    // Split the input date string by "/"
    const dateComponents = inputDate.split('/');

    if (dateComponents.length === 3) {
      // Rearrange the components to "YYYY-MM-DD" format
      const year = dateComponents[2];
      const month = dateComponents[0].padStart(2, '0'); // Ensure two-digit month
      const day = dateComponents[1].padStart(2, '0'); // Ensure two-digit day

      // Create the reversed date string
      const reversedDate = `${year}-${month}-${day}`;

      return reversedDate;
    }

    // Return the original date if the format is not valid
    return inputDate;
  }


var count=1
  const handleSubmit = async (e) => {
    count=0
    setSelectedDate(e);
    let id = localStorage.getItem('createdBy');
    console.log(reverseDateFormat(selectedDate.toLocaleDateString()))


    let dataok = JSON.stringify({
      "date": reverseDateFormat(selectedDate.toLocaleDateString())
      ,
    });
    try {
      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/dashboard/dateData/' + id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: dataok
      };

      axios.request(config)
        .then((response) => {
          if (JSON.stringify(response.data.status) === '200') {
            setDataexpense(response.data.expenses)
            setDataIncome(response.data.incomes)
            console.log(dataexpense)

          }

        })
    }
    catch (err) {
      console.log(err.code)
    }
  };

    useEffect(()=>{
      handleSubmit()
    },[])
  



  return (

    <div>
      {data.map(item => new Date(item.date)).forEach(date => { date })}
      <Calendar compact bordered renderCell={renderCell} onChange={handleSubmit} />
      <div>
      <PieChart width={400} height={300}>
          <Pie
            dataKey="amount"
            isAnimationActive={true}
            data={dataincome}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#56A054"
            label={({ from }) => from}          />
         
          <Tooltip />
        </PieChart>
      
        <PieChart width={400} height={300}>
          <Pie
            dataKey="amount"
            isAnimationActive={true}
            data={dataexpense}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#d9381e"
            label={({ to }) => to}          />
         
          <Tooltip />
        </PieChart>
      
      </div>
    </div>
  );
};

export default CalendarDashboard;
