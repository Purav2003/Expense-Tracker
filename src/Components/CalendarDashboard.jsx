import 'rsuite/dist/rsuite-no-reset.css'; // Import RSuite styles
import { useEffect, useState } from "react";
import React from 'react';
import { Calendar, Badge } from 'rsuite';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const CalendarDashboard = () => {
  const [data, setData] = useState([]);
  const [datab, setDatab] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
        <Badge/>
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


const maxDate = new Date('2023-08-21'); // Replace with your desired maximum date
const handleDateSelect = (date) => {
  setSelectedDate(date);


  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/income/' + id ;
    
    try {
      const response = await fetch(API_URL);
      const datas = await response.json();

      setDatab(datas.income);     
    } catch (error) {
      // Handle error here
    }
  }; 
  fetchData();
};


  return (
    
    <div>    
      {data.map(item => new Date(item.date)).forEach(date => {date})}
      <Calendar compact bordered renderCell={renderCell} maxDate={maxDate} onChange={handleDateSelect} />
      <div>
      <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
      </div>
    </div>
  );
};

export default CalendarDashboard;
