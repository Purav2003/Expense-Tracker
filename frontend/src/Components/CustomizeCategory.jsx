import React, { useEffect, useState } from 'react';
import * as icon from 'react-icons/md';
import axios from 'axios';
import Sidebar from './Sidebar';
import { config } from './../config';
const CustomizeCategory = () => {

    const [selectedValues, setSelectedValues] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);
    let token = localStorage.getItem("Token");
    let id = localStorage.getItem('createdBy');

    const fetchData = async () => {
        const API_URL = `${config.serverPath}/auth/profile/${id}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const datas = await response.json();
            if (datas.status === 495) {
                window.location.replace('/');
            }
            setSelectedValues(datas.user.categories);
        } catch (error) {
            // Handle error here
        }
    };

    const handleCheckboxClick = (value) => {
        if (value === 'Other') {
            setShowInput(!showInput);
            setOtherChecked(!otherChecked);
        } else {
            if (selectedValues.includes(value)) {
                setSelectedValues(selectedValues.filter((v) => v !== value));
            } else {
                setSelectedValues([...selectedValues, value]);
            }
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddInput = () => {
        if (selectedValues.includes(inputValue)) {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Already Added !!!!</h1>';
        } else {
            if (inputValue.trim() !== '') {
                document.getElementById('error').innerHTML = '';
                setSelectedValues([...selectedValues, inputValue]);
                setInputValue('');
            }
        }
    };

    const handleRemoveItem = (index) => {
        const updatedValues = [...selectedValues];
        updatedValues.splice(index, 1);
        setSelectedValues(updatedValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedValues.length === 0) {
            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Select At Least One Category</h1>';
        } else {
            try {
                let config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/v1/auth/addCategory/' + id,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: selectedValues,
                };

                axios.request(config)
                    .then((response) => {
                        if (JSON.stringify(response.status) === '200') {
                            window.location.replace("/dashboard");
                        }
                        if (JSON.stringify(response.status) === '204') {
                            document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Select At Least One Category</h1>';
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Sidebar />
        <div className="flex justify-center bg-white pt-[3vw] ">
            <div className='border p-4 bg-[#eee] lg:w-[50%] border rounded-lg'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center text-2xl font-bold text-black'>Expense Categories</h2><br></br>
                    <ul className='flex flex-wrap'>
                        {["Food", "Clothes", "Groceries", "Petrol", "Other"].map((value) => (
                            <li key={value} className='lg:ml-8 mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedValues.includes(value) || (value === 'Other' && otherChecked)}
                                        onChange={() => handleCheckboxClick(value)}
                                        className='w-3 h-3'
                                    />
                                    <a className='w-4 h-4 px-2  text-black'>{value}</a>
                                </label>
                            </li>
                        ))}
                    </ul><br></br>
                    {showInput && (
                        <div className='lg:flex'><br></br>
                            <h3 className='lg:pl-8 lg:pr-2 lg:py-2 text-black'>Add Category:</h3>
                            <div className='flex'>

                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter a value"
                                className='border rounded-lg py-2 outline-0 px-4'
                            />
                            <button onClick={handleAddInput} type='button' className='mx-4 rounded-lg bg-fourth text-white px-4'><a className='text-[20px]'>+</a></button>
</div>
                        </div>
                    )}
                    <div id="error" className='lg:px-8 py-2'></div>
                    <br></br>
                    <div className='lg:pl-8'>
                        <h3>Selected Categories:</h3><br></br>
                        <div className='flex flex-wrap bg-white rounded-lg'>
                            {selectedValues.map((value, index) => (
                                <div key={index} className='flex items-center px-4 py-4 relative'>
                                    <div className='text-fourth px-4 border border-fourth bg-blue-500 bg-opacity-20 py-2 rounded-lg flex items-center justify-between'>{value}
                                        <button onClick={() => handleRemoveItem(index)} type='button' className='text-fourth pl-2'><icon.MdCancel /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type='submit' className='lg:m-8 my-4 px-4 py-2 rounded-lg text-white bg-fourth'>Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default CustomizeCategory;
