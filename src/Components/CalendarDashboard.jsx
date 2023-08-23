import 'rsuite/dist/rsuite-no-reset.css'; // Import RSuite styles
import { useEffect, useState } from "react";
import { Calendar, Badge } from 'rsuite';
import axios from 'axios';


const CalendarDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datedata, setDatedata] = useState([]);

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


  const handleSubmit = async (e) => {
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
            setDatedata(response.data.dateData)


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





  return (

    <div className='lg:flex pl-12 rounded-full '>
      <Calendar compact bordered renderCell={renderCell} onChange={handleSubmit}
        className="w-[44%] bg-white calendar border border-[#4a4a4a] rounded-md" disabledDate={(date) => date > new Date()} />
      <div className='ml-4 bg-white rounded-md w-[44%]'>
        <div className='p-4 cal-data-trans'>
          <h1 className='font-semibold text-[20px]'>Transaction on { }</h1>
          {
            datedata.map((tables) => {
              const { _id, amount, date, mode, from, to, description } = tables;
              return (
                <div className='flex pt-4 ' key={_id}>
                  <div>
                    {from ?
                      <h1 className='text-[14px] bg-[rgba(0,255,0,0.3)] py-2 px-4 rounded-full '>&nbsp;Income&nbsp;</h1>
                      :
                      <h1 className='text-[14px] bg-[rgba(255,0,0,0.3)] py-2 px-4 rounded-full '>Expense</h1>

                    }
                    <a>&nbsp;</a>
                  </div>
                  <div className='px-8 '>
                    <h1 className='font-bold text-[17px]'>{from ? from : to}</h1>
                    <a className='text-[12px]'>{date.slice(0, 10)}</a></div>
                  <div className='px-8 w-[30%]'>
                    {from ? <h1><a className='font-bold'>+</a>&nbsp;&#8377; {amount}</h1> : <h1><a className='font-bold'>-</a>&nbsp;&#8377; {amount}</h1>}
                    <a className='text-[12px]'>{mode}</a>
                  </div>
                  <div className='px-8'>

                    <h1 className='text-[17px] font-semibold'>{description}</h1>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

    </div>

  );
};

export default CalendarDashboard;
