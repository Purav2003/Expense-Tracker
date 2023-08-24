import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(""); // Initialize without a default currency
  const [currencyOptions, setCurrencyOptions] = useState([]);

  let token = localStorage.getItem("Token");
  if (token === null) {
    window.location.replace("/");
  }

  const fetchCurrencies = async () => {
    const API_URL = "https://openexchangerates.org/api/currencies.json";

    try {
      const response = await axios.get(API_URL);
      const currencies = Object.keys(response.data);
      setCurrencyOptions(currencies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = localStorage.getItem('createdBy');
    const cur = document.querySelector('.currency').value;
    let data = JSON.stringify({
      "newCurrency": cur,
    });
    try {
      let config = {
        method: 'patch',
        url: 'http://localhost:5000/api/v1/settings/changeCurrency/'+id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.status));
          if (JSON.stringify(response.status) === '200') {
            console.log(response.data)
            setData(response.data.user);
            // Update the selected currency and save it in localStorage
            setSelectedCurrency(cur);
            localStorage.setItem('selectedCurrency', cur);
          }
        })
    }
    catch (err) {
      console.log(err.code)
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchCurrencies();
    // Retrieve the selected currency from localStorage when the component mounts
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    } else {
      setSelectedCurrency(data.currency || ""); // Assuming data.currency contains the initial currency value
    }
  }, []);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);

    // Save the selected currency in localStorage when it changes
    localStorage.setItem('selectedCurrency', newCurrency);
  };

  return (
    <div className="bg-white">
      <Sidebar />
      <div className="setting-main">
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
                    {currencyOptions.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
             <tr className="border p-4">
                <td className="border p-4 w-[50%]">Mode</td>
                <td className="border p-4 w-[50%]">Dark</td>             </tr>
              <tr>
               
                <td className="py-4 w-[50%] text-center items-center" colSpan={2} >
                  <button type="submit" className="bg-fourth text-white py-2 px-4 rounded-full">
                    Save Changes
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;