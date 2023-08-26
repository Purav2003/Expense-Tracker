import React, { useState } from 'react';
import * as icon from 'react-icons/md';
import axios from 'axios';

function CustomizeCategory() {
    const [selectedValues, setSelectedValues] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false); 
    const [otherChecked, setOtherChecked] = useState(false); 
    let token = localStorage.getItem("Token")
    let id = localStorage.getItem('createdBy');

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
        if (inputValue.trim() !== '') {
            setSelectedValues([...selectedValues, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveItem = (index) => {
        const updatedValues = [...selectedValues];
        updatedValues.splice(index, 1);
        setSelectedValues(updatedValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

    
        try {
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/addOrEditCategory/'+id,
            headers: {
              'Authorization': `Bearer ${token}`,          
              'Content-Type': 'application/json'
            },
            data: selectedValues
          };
    
          axios.request(config)
            .then((response) => {
              if (JSON.stringify(response.status) === '200') {               
                window.location.replace("/dashboard")
              }        
              if (JSON.stringify(response.status) === '204') {               
                document.getElementById('error').innerHTML = '<h1 className="pt-[0.5vw]">Select Atleast One Category</h1>'
            }                
            })
        }
        catch (err) {
            console.log(err);
        }
    
      }

    return (
        <div className="flex justify-center items-center bg-white h-screen">
            <div className='border p-4 bg-fourth  w-[50%] border rounded-lg'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center text-2xl font-bold text-white'>Expense Categories</h2><br></br>
                    <ul className='flex flex-wrap'> 
                        {["Food", "Cloths", "Groceries", "Petrol", "Other"].map((value) => (
                            <li key={value} className='ml-8 mb-4'> 
                                <label>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={selectedValues.includes(value) || (value === 'Other' && otherChecked)}
                                        onChange={() => handleCheckboxClick(value)}
                                    />
                                    <a className='p-4 text-white'>{value}</a>
                                </label>
                            </li>
                        ))}
                    </ul><br></br>
                    {showInput && (
                        <div className='flex'><br></br>
                            <h3 className='pl-8 pr-2 py-2 text-white'>Extra:</h3>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter a value"
                                className='border rounded-lg py-2 outline-0 px-4'
                            />
                            <button onClick={handleAddInput} type='button' className='mx-4 rounded-lg bg-fourth text-white px-4'><a className='text-[20px]'>+</a></button>
                        </div>
                    )}<br></br>
                    <div className='pl-8'>
                        <h3>Selected Categories:</h3><br></br>
                        <div className='flex flex-wrap bg-white rounded-lg'> 
                            {selectedValues.map((value, index) => (
                                <div key={index} className='flex items-center px-4 py-4 relative'> 
                                    <div className='text-black px-4 border border-fourth py-2 rounded-lg flex items-center justify-between'>{value}
                                        <button onClick={() => handleRemoveItem(index)} className='text-black pl-2'><icon.MdCancel /></button> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type='submit' className='m-8 px-4 py-2 rounded-lg text-white bg-fourth'>Submit</button>
                    <div id="error"></div>
                </form>
            </div>
        </div>
    );
}

export default CustomizeCategory;
