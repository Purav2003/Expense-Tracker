import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dp from "../Assets/images/signup.png";
import * as icon from "react-icons/bi";

const Settings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Initialize with a default currency
  const [currencyOptions, setCurrencyOptions] = useState([]); // Store the currency options

  let token = localStorage.getItem("Token");
  if (token === null) {
    window.location.replace("/");
  }

  const fetchCurrencies = async () => {
    const API_URL = "https://openexchangerates.org/api/currencies.json";

    try {
      const response = await axios.get(API_URL);
      const currencies = Object.keys(response.data);

      // Add more currencies or manipulate data as needed
      setCurrencyOptions(currencies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCurrencies(); // Fetch currencies on component mount
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="bg-white">
      <Sidebar />
      <div className="setting-main">
        <div className="w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Settings</h1>
          <table className="border w-full">
            <tr className="border p-4">
              <td className="border p-4 w-[50%]">Currency</td>
              <td className="border p-4 w-[50%]">
                <select
                  className="w-full outline-0"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  {currencyOptions.map((currency) => (
                    <option key={currency} value={currency} className="form-field bg-gray-200 text-gray-700 p-12">                      
                      {currency}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr className="border p-4">
              <td className="border p-4 w-[50%]">Mode</td>
              <td className="border p-4 w-[50%]">
                <select className="w-full">
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </td>
            </tr>
          </table>
          <h1 className="text-right py-12">
            <button className="bg-fourth text-white py-2 px-4 rounded-full">
              Save Changes
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Settings;
