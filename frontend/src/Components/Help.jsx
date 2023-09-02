import Sidebar from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Input } from 'rsuite';
import { useEffect } from "react";

const Help = () => {
  const [loading, setLoading] = useState(false)
  const [faq, setFaq] = useState([]); // State for FAQ data

  let token = localStorage.getItem("Token");
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const name = document.querySelector('.name').value
    const email = document.querySelector('.email').value
    const query = document.querySelector('.query').value
    const mobile = document.querySelector('.mobile').value


    let data = JSON.stringify({
      "name": name,
      "email": email,
      "query": query,
      "mobile": mobile
    });
    const id = localStorage.getItem('createdBy');

    try {
      let config = {
        method: 'post',
        url: `http://localhost:5000/api/v1/auth/contactus/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.status));
          if (JSON.stringify(response.data.status) === '200') {
            setLoading(false)
          }

        })
    }
    catch (err) {
      console.log(err.code)
    }

    const inputs = document.querySelectorAll('.name, .email,.query,.mobile');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  // Sample FAQ data
  const initialFaq = [
    {
      question: "How do I create an account on your website?",
      answer: "To create an account, click on the 'Sign Up' button in the top-right corner of the homepage and follow the registration process.",
      isOpen: false, // Initially closed
    },
    {
      question: "Can I reset my password if I forget it?",
      answer: "Yes, you can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
      isOpen: false, // Initially closed
    },
    {
      question: "How do I add income and expenses to my account?",
      answer: "To add income and expenses, log in to your account, go to the dashboard, and click on the 'Add Income' or 'Add Expense' button.",
      isOpen: false, // Initially closed
    },
  ];

  // Function to toggle FAQ answers
  const toggleAnswer = (index) => {
    const updatedFaq = [...faq];
    updatedFaq[index].isOpen = !updatedFaq[index].isOpen;
    setFaq(updatedFaq);
  };

  // Initialize FAQ data with isOpen property
  useEffect(() => {
    const initializedFaq = initialFaq.map((item) => ({ ...item, isOpen: false }));
    setFaq(initializedFaq);
  }, []);
  return (
    <div className="bg-background">
      <Sidebar />
      {loading ? <Loader /> : 
      <div>
      <div className="lg:px-36 px-4">
        <h1 className="text-center pt-12 text-[30px] font-semibold">FAQ's</h1><br></br>
        <div>
        {faq.map((item, index) => (
          <div key={index} className="mb-2 p-4 bg-[#eee] rounded-lg">
            <button
              className="font-bold text-left w-full text-left cursor-pointer focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              {item.isOpen ? "-" : "+"} {item.question}
            </button>
            {item.isOpen && <p className="pt-4">{item.answer}</p>}
          </div>
        ))}
        </div>
      </div>
      
      
      
      
      <div className="lg:px-36 px-4">
        <div className="w-[50%]">
          <h1 className="py-4 font-bold text-[25px]">Contact Us</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded w-[40vw] pt-6 pb-8 mb-4">
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Name
              </label>
              <Input placeholder="Name" className="name" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Phone
              </label>
              <Input placeholder="Phone" className="mobile" type="number" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Email
              </label>
              <Input placeholder="Email" className="email" type="email" required/>
              <div id="error"></div>
            </div>
            <div className="mb-4 form-field">
              <label className="block text-black-700 text-sm font-bold mb-2">
                Query
              </label>
              <Input as="textarea" rows={3} placeholder="Query" className="query" required/>
              <div id="error"></div>
            </div>
            <div className="flex form-field items-center">
              <button className="bg-fourth button w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div></div>}
    </div>
  );
};

export default Help;