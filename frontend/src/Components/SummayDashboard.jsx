import React, { useEffect, useState } from 'react';
import Loader from './Loader';
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const d = new Date();
let month_name = month[d.getMonth()];

const SummaryDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('Token');
  const currency_symbol = localStorage.getItem('selectedCurrency');

  const fetchData = async () => {
    let id = localStorage.getItem('createdBy');
    const API_URL = 'http://localhost:5000/api/v1/dashboard/statistics/' + id;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      const datas = await response.json();
      if (datas.status === 495) {
        window.location.replace('/');
      }     
        setData(datas);

    } catch (error) {
        //
    }
  };

  useEffect(() => {
      setLoading(true);
      fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className='lg:p-4 lg:px-12 lg:flex w-full summary-main'>
            <div className="first lg:flex w-[100%]">
              <div className='lg:w-[100%] rounded-md bg-[#0d5c46] text-white summary-card'>
                <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Expense</h1>
                <h1 className='px-4 pb-4'>
                  {currency_symbol === 'INR' ? '₹ '
                    : currency_symbol === 'USD' ? "$ "
                      : currency_symbol === 'CAD' ? "C$ "
                        : currency_symbol === "AED" ? "د.إ "
                          : currency_symbol === "EUR" ? "€ "
                            : currency_symbol === "GBP" ? "£ "
                              : currency_symbol === "JPY" ? "¥ "
                                : currency_symbol === "AUD" ? "AU$ "
                                  : ""}
                  {data ? (data.totalExpense ? data.totalExpense : 0) : 0}
                </h1>
              </div>
              <div className='lg:w-[100%] lg:mx-4 rounded-md bg-[#fabe50] text-white summary-card'>
                <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Income</h1>
                <h1 className='px-4 pb-4'>
                  {currency_symbol === 'INR' ? '₹ '
                    : currency_symbol === 'USD' ? "$ "
                      : currency_symbol === 'CAD' ? "C$ "
                        : currency_symbol === "AED" ? "د.إ "
                          : currency_symbol === "EUR" ? "€ "
                            : currency_symbol === "GBP" ? "£ "
                              : currency_symbol === "JPY" ? "¥ "
                                : currency_symbol === "AUD" ? "AU$ "
                                  : ""}
                  {data ? (data.totalIncome ? data.totalIncome : 0) : 0}
                </h1>
              </div>
            </div>
            <div className="first lg:flex w-[100%]">
              <div className='lg:w-[100%] rounded-md bg-[#f1573b] text-white summary-card'>
                <h1 className='p-4 font-bold text-[20px] rounded-md'>{month_name} Expense</h1>
                <h1 className='px-4 pb-4'>
                  {currency_symbol === 'INR' ? '₹ '
                    : currency_symbol === 'USD' ? "$ "
                      : currency_symbol === 'CAD' ? "C$ "
                        : currency_symbol === "AED" ? "د.إ "
                          : currency_symbol === "EUR" ? "€ "
                            : currency_symbol === "GBP" ? "£ "
                              : currency_symbol === "JPY" ? "¥ "
                                : currency_symbol === "AUD" ? "AU$ "
                                  : ""}
                  {data ? (data.totalMonthlyExpense ? data.totalMonthlyExpense : 0) : 0}
                </h1>
              </div>
              <div className='lg:mx-4 lg:w-[100%] rounded-md bg-[#824cc6] text-white summary-card'>
                <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Transactions</h1>
                <h1 className='px-4 pb-4'>
                  {data ? (data.totalTransactions ? data.totalTransactions : 0) : 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SummaryDashboard;
