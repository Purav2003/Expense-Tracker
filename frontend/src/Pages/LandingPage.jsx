import React from 'react';
import '../assets/css/landing.css'
import heroImage from '../assets/images/login.png'


const LandingPage = () => {

    return (
        <div className='landing'>
            <header>
                <nav>
                    <div className="logo">Expense Tracker</div>
                    {/* <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Income</a></li>
                        <li><a href="#">Expense</a></li>
                        <li><a href="#">Reports</a></li>
                    </ul> */}
                </nav>
            </header>

            <section className="hero flex w-full justify-center items-center">
                <div className="hero-content text-center">
                    <h1>Take Control of Your Finances</h1>
                    <p>Simplify Your Expenses with Expense Tracker</p>
                    <a href="#" className="cta-button">Get Started</a>
                </div>
                <div className='text-center'><img src={heroImage} alt="Hero" /></div>

            </section>

            <section className="features">
                <h2>Key Features</h2>

                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>
                    <div className='w-[50%] text-center'>
                        <h3>Dashboard</h3>
                        <p></p>
                    </div>
                </div>

                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center w-[50%]' ><h3>Add Income </h3>
                        <p>Easily add your income records.</p></div>

                    <div className="text-center"><img src={heroImage} alt="Income" /></div>

                </div>

                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>
                    <div className='text-center w-[50%]'><h3>Add Expense</h3>
                        <p>Effortlessly record your expenses.</p>
                    </div>
                </div>
                <div className="feature flex w-full justify-center items-center">
                    <div className='text-center w-[50%]'><h3>View your data </h3>
                        <p>View income / expense as you want</p></div>
                        <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>
                </div>
                <div className="feature flex w-full justify-center items-center">
                <div className='text-center'>
                        <img src={heroImage} alt="Expense" />
                    </div>                    
                    <div className='text-center w-[50%]'><h3>Report </h3>
                        <p>View / Download your reports effortlessly</p></div>
                </div>
                {/* Add more features here */}
            </section>

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