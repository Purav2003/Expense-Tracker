import 'rsuite/dist/rsuite-no-reset.css'; // Import RSuite styles
import { useEffect, useState } from "react";
import { Calendar, Badge } from 'rsuite';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import Loader from './Loader'

const token = localStorage.getItem("Token");


const CalendarDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datedata, setDatedata] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/dashboard/dateHighlight/' + id;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });       
      const datas = await response.json();
      if(datas.status === 495){
        window.location.replace('/')
      }      
      setData(datas.dates);
      setLoading(false);

    } catch (error) {
      // Handle error here
    }
  };



  useEffect(() => {
    setLoading(true)
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
    const dateComponents = inputDate?.split('/');

    if (dateComponents?.length === 3) {
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

  function reverseDate(inputDate) {
    // Split the input date string by "/"
    const dateComponents = inputDate?.split('-');

    if (dateComponents?.length === 3) {
      // Rearrange the components to "YYYY-MM-DD" format
      const year = dateComponents[0];
      const month = dateComponents[1].padStart(2, '0'); // Ensure two-digit month
      const day = dateComponents[2].padStart(2, '0'); // Ensure two-digit day

      // Create the reversed date string
      const reversedDate = `${day}-${month}-${year}`;

      return reversedDate;
    }

    // Return the original date if the format is not valid
    return inputDate;
  }


  const handleSubmit = async (e) => {
    setSelectedDate(e);
    let id = localStorage.getItem('createdBy');
    console.log(reverseDateFormat(selectedDate?.toLocaleDateString()))


    let dataok = JSON.stringify({
      "date": reverseDateFormat(selectedDate?.toLocaleDateString())
      ,
    });
    try {
      let config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/dashboard/dateData/' + id,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: dataok
      };

      axios.request(config)
        .then((response) => {
          if(JSON.stringify(response.status) === 495){
            window.location.replace('/')
          }   
          if (JSON.stringify(response.data.status) === '200') {
            setDatedata(response.data.dateData)
            setDate(response.data.date)
          }

        })
    }
    catch (err) {
      console.log(err.code)
    }
  };

  useEffect(() => {
    handleSubmit()
  }, [selectedDate])


  const chartData = datedata.map(item => ({
    category: item.from ? 'Income' : 'Expense',
    amount: item.amount,
    color: item.from ? '#00ff00' : '#ff0000', // Green for 'From', Red for 'To'
  }));

  const options = {
    chart: {
      id: 'basic-bar',
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: chartData.map(item => item.category),
      labels: {
        show: true, // Show labels on the X-axis
      },
      title: {
        text: 'Type',
      },

    },
    yaxis: {
      title: {
        text: 'Amount',
      },

    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true if you want horizontal bars
      },
    },
    colors: '#ff9800', // Set colors based on the 'color' property
  };

  const series = [
    {
      name: 'Amount',
      data: chartData.map(item => item.amount),
      // Colors are determined by the 'colors' property in the 'options' object
    },
  ];

  const currency_symbol = localStorage.getItem("selectedCurrency")


  return (

    <>
      {loading ? <Loader /> : <><div className='lg:flex lg:pl-12 rounded-full calendar-main'>  <Calendar compact bordered renderCell={renderCell} onChange={handleSubmit}
        className="lg:w-[28%] bg-white dark:bg-[yellow] calendar rounded-md" disabledDate={(date) => date > new Date()} />
        <div className='lg:ml-4 dark dark:bg-[#4a4a4a] bg-white rounded-md calendar-details lg:w-[32%]'>
          <div className='p-4 '>
            <h1 className='font-semibold text-calendar text-[20px]'>Transactions on {reverseDate(date)}</h1><br></br>
            <div className='display-cal'>
              {datedata.length > 0 ?
                datedata.map((tables) => {
                  const { _id, amount, date, mode, from, to } = tables;
                  return (
                    <div className='flex pt-4 ' key={_id}>
                      <div>
                        {from ?
                          <h1 className='lg:text-[14px] bg-[rgba(0,255,0,0.3)] py-2 px-4 rounded-full '>&nbsp;Income&nbsp;</h1>
                          :
                          <h1 className='lg:text-[14px] bg-[rgba(255,0,0,0.3)] py-2 px-4 rounded-full '>Expense</h1>

                        }
                        <a>&nbsp;</a>
                      </div>
                      <div className='px-8 '>
                        <h1 className='font-bold lg:text-[17px]'>{from ? from : to}</h1>
                        <a className='lg:text-[12px]'>{reverseDate(date.slice(0, 10))}</a></div>
                      <div className='px-4'>
                        {from ? <h1 className="cal-head"><a className='font-bold'>+</a>&nbsp;
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
                          {amount}</h1> : <h1><a className='font-bold'>-</a>&nbsp;
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
                          {amount}</h1>}
                        <a className='lg:text-[12px]'>{mode}</a>
                      </div>

                    </div>
                  );
                })
                : <p className='lg:ml-[3vw] lg:mt-[10vw] font-bold'>No Transaction On This Date</p>
              }
            </div>
          </div>
        </div>
        <div className='lg:w-[32%] calendar-chart'>
          <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
      </div>

      </>}
    </>
  );
};

export default CalendarDashboard;
