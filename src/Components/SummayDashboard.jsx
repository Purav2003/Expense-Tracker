import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let month_name = month[d.getMonth()];


const SummaryDashboard = () => {

    const [income, setIncome] = useState()
    const [expense, setExpense] = useState()
    const [transaction, setTransaction] = useState()
    const [mincome, setMincome] = useState()
    const [mexpense, setMexpense] = useState()

    const fetchData = async () => {
        let id = localStorage.getItem('createdBy');
        const API_URL = 'http://localhost:5000/api/v1/dashboard/statistics/' + id;

        try {
            const response = await fetch(API_URL);
            const datas = await response.json();
            setIncome(datas.totalIncome);
            setExpense(datas.totalExpense);
            setTransaction(datas.totalTransactions);
            setMincome(datas.totalMonthlyIncome);
            setMexpense(datas.totalMonthlyExpense);
        } catch (error) {
            // Handle error here
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='lg:p-4 lg:px-12 lg:flex w-full summary-main'>
            <div className="first lg:flex w-[100%]">
                <div className='lg:w-[100%] rounded-md bg-[#0d5c46] text-white summary-card'>

                    <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Expense</h1>
                    <h1 className='px-4 pb-4'>&#8377;{expense ? expense : 0}</h1>
                </div>
                <div className='lg:w-[100%] lg:mx-4 rounded-md bg-[#fabe50] text-white summary-card'>
                    <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Income</h1>
                    <h1 className='px-4 pb-4'>&#8377; {income ? income : 0}</h1>
                </div></div>
            <div className="first lg:flex w-[100%]"><div className='lg:w-[100%] rounded-md bg-[#f1573b] text-white summary-card'>
                <h1 className='p-4 font-bold text-[20px] rounded-md'>{month_name} Expense</h1>
                <h1 className='px-4 pb-4'>&#8377; {mexpense ? mexpense : 0} </h1>
            </div><div className='lg:mx-4 lg:w-[100%] rounded-md bg-[#824cc6] text-white summary-card'>
                    <h1 className='p-4 font-bold text-[20px] rounded-md'>Total Transactions</h1>
                    <h1 className='px-4 pb-4'>{transaction ? transaction : 0} </h1>
                </div></div>
        </div>
    );
}

export default SummaryDashboard;