import React from 'react';
import '../assets/css/landing.css'
import heroImage from '../assets/images/login.png'
import landing1 from '../assets/images/landing-1.png'
import landing2 from '../assets/images/landing-2.png'
import landing3 from '../assets/images/landing-3.png'
import landing4 from '../assets/images/landing-4.png'
import { useState } from 'react'
import { useEffect } from 'react';

const LandingPage = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
        setVisible(visible);
        setPrevScrollPos(currentScrollPos);
    };
    return (
        <div className='landing'>
            <header className={`fixed w-full z-[100] ${visible ? '' : 'navbar-hidden'}`}>
                <nav>
                    <div className="logo">Expense Tracker</div>
                </nav>
            </header><br></br><br></br>

            <section className="hero flex w-full justify-center items-center">
                <div className="hero-content text-center">
                    <h1>Take Control of Your Finances</h1>
                    <p>Simplify Your Expenses with Expense Tracker</p>
                    <a href="#" className="cta-button">Get Started</a>
                </div>

            </section>

            <section className="features">
                <h2 className='uppercase'>Features</h2>
                <p>Organize your incomes, keep track of expenses while traveling and understand where all your money are with some great, yet simple features.</p>
                <br></br><br></br>
                <div className='px-24'>
                    <div className="lg:grid lg:grid-cols-4 gap-4">
                        {/* 1st Row */}
                        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
                            <img src={landing1} alt="Image 1" className='p-8 img-1 custom-border' />
                            <h1 className='pt-4 text-black font-semibold text-[18px]'> INTUITIVE & CLEAN</h1><hr className='text-[#e96656] bg-[#e96656] mt-2 pt-[2px] w-[120px]'></hr>
                            <p className='h-[18vh]'><br></br>Intuitive, clean and simple way of adding daily expenses and incomes. main screen calendar that gives a quick monthly overview over all transactions</p>
                        </div>
                        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
                            <img src={landing2} alt="Image 2" className='p-8 img-2 custom-border' />
                            <h1 className='pt-4 text-black font-semibold text-[18px]'> SECURE</h1><hr className='text-center justify-center items-center text-[#34d293] bg-[#34d293] mt-2 pt-[2px] w-[40px]'></hr>
                            <p className='h-[18vh]'><br></br>Your data is always safe wherever your are and what ever device you are using.</p>                        </div>
                        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
                            <img src={landing3} alt="Image 3" className='p-8 img-3 custom-border' />
                            <h1 className='pt-4 text-black font-semibold text-[18px]'> COMPREHENSIVE</h1><hr className='text-[#3ab0e2] bg-[#3ab0e2] mt-2 pt-[2px] w-[90px]'></hr>
                            <p><br></br>A compact yet comprehensive list of expense and income categories. Add or edit categories, if defaults don't work for you</p>                        </div>
                        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center">
                            <img src={landing4} alt="Image 4" className='p-8 img-4 custom-border' />
                            <h1 className='pt-4 text-black font-semibold text-[18px]'> RELIABLE & USEFUL</h1><hr className='text-[#f7d861] bg-[#f7d861] mt-2 pt-[2px] w-[120px]'></hr>
                            <p><br></br>Set reminders for future inflow or outflow transactions and recurrent payments - never miss another deadline</p>                        </div>
                    </div>

                </div><br></br><br></br>
                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>
                    <div className='w-[50%] text-left'>
                        <h3 className='font-semibold'>Simple money tracker</h3>
                        <p>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.</p>
                    </div>
                </div>

                <div className="feature flex w-full justify-center items-center">
                    <div className='font-semibold  w-[29%]' ><h3 className='text-right'>Painless budgeting</h3>
                        <p className='text-left pl-2'>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift.

                        </p></div>
                    <div className="text-center"><img src={heroImage} alt="Income" /></div>

                </div>

                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>
                    <div className='w-[50%] text-left'>
                        <h3 className='font-semibold'>The whole picture in one place</h3>
                        <p>One report to give a clear view on your spending patterns. Understand where your money comes and goes with easy-to-read graphs.</p>
                    </div>
                </div>
              
                {/* Add more features here */}
            </section><br></br><br></br>

            {/* Other sections like How It Works, Testimonials, CTA, Footer, etc. */}

            <footer>
                <div className="contact">
                    <p>Contact us: contact@expensetracker.com</p>
                </div>
                <div className="social">
                    <a href="#" className="social-icon p-4">Facebook</a>
                    <a href="#" className="social-icon p-4">Twitter</a>
                    <a href="#" className="social-icon p-4">LinkedIn</a>
                </div>
            </footer>

        </div>
    );
}

export default LandingPage;