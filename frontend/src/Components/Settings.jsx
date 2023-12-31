import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { CurrencyList } from "./CurrencyList";
import { Link } from "react-router-dom";
const Settings = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("dark"); // Initialize with a default mode
    const [selectedCurrency, setSelectedCurrency] = useState(""); // Initialize without a default currency

    let token = localStorage.getItem("Token");
    const newCur = localStorage.getItem("selectedCurrency")

    const deleteUser = () => {
        const id = localStorage.getItem('createdBy');
        let config = {
          method: 'delete',
          url: `http://localhost:5000/api/v1/auth/deleteAccount/${id}`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        };
    
        axios.request(config)
          .then((response) => {
            if (response.status === 495) {
              window.location.replace('/')
            }
            if (JSON.stringify(response.status) === '200') {
                localStorage.clear();
                window.location.replace('/')

            }
          });
      };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        let id = localStorage.getItem('createdBy');
        const cur = document.querySelector('.currency').value;
        let data = JSON.stringify({
            "newCurrency": cur,
        });
        console.log(newCur + cur)
        if (newCur !== cur) {
            console.log("Called")
            try {
                let config = {
                    method: 'patch',
                    url: 'http://localhost:5000/api/v1/settings/changeCurrency/' + id,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios.request(config)
                    .then((response) => {
                        setLoading(false)

                        if(JSON.stringify(response.status) === 495){
                            window.location.replace('/')
                          }
                        if (JSON.stringify(response.status) === '200') {
                            setData(response.data.user);
                            setSelectedCurrency(cur);
                            localStorage.setItem('selectedCurrency', cur);
                        }
                    })
            }
            catch (err) {
                console.log(err.code)
            }

        }
        else {
            window.location.replace("/profile")
        }

    }

    useEffect(() => {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            setSelectedCurrency(savedCurrency);
        } else {
            setSelectedCurrency(data.currency || ""); 
        }
    }, []);

    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        setSelectedCurrency(newCurrency);

        // Save the selected currency in localStorage when it changes
    };

    const toggleMode = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("mode", newMode)
        // Add or remove a class to the <body> element based on the selected mode
        document.body.classList.toggle("dark-mode", newMode === "dark");
    };


    return (
        <div className="bg-background settings">
            {loading ? <Loader /> : <div className="setting-main">
                <div className="w-[50%]">
                    <h1 className="py-4 font-bold text-[25px]">Settings</h1>
                    <form onSubmit={handleSubmit}>
                        <table className="w-full">
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">Currency</td>
                                <td className="border p-4 w-[50%]">
                                    <select
                                        className="w-full outline-0 currency"
                                        value={selectedCurrency}
                                        onChange={handleCurrencyChange}
                                    >
                                        {CurrencyList.map((currency) => (
                                            <option key={currency.currency} value={currency.currency}>
                                                {currency.logo}&nbsp;{currency.currency}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">Mode</td>
                                <td className="border p-4 w-[50%]">
                                    <select className="w-full outline-0" value={mode} onChange={toggleMode}>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>

                                </td>   
                            </tr>
                            <tr className="border p-4">
                                <td className="border p-4 w-[50%]">Expense Categories</td>
                                <td className="border p-4 w-[50%]">                                
                                                <Link to="/customize-category" className="text-fourth">Edit Categories</Link>
                                </td>
                            </tr>
                            <tr>

                                <td className="py-4 w-[50%] text-center items-center" >
                                    <button type="submit" className="bg-fourth text-white py-2 px-4 rounded-full">
                                        Save Changes
                                    </button>
                                </td>
                                <td className="py-4 w-[50%] text-center items-center" >
                                    <button type="button" className="bg-[tomato] text-white py-2 px-4 rounded-full" onClick={deleteUser}>
                                        Delete Account
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>}
        </div>
    );
};

export default Settings;