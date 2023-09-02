import React from 'react';
import notfound from '../assets/images/404.jpg'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='w-full'>
 
        <div className='px-8 py-4 lg:mt-[14vh] lg:ml-[28vw]'>
       <h1 className='text-[100px] text-black'>404</h1>
       <h1 className='text-[35px] text-black'>UH OH! You're lost.</h1>
       <p>The page you are looking for doesn't exist. How you get here is a mystery.</p>
       <p>But you can click the button below to go back to the homepage.</p><br></br>
       <Link to="/dashboard"><button className='px-8 py-2 rounded-full border border-black tracking-wider hover:bg-black hover:text-white'>HOME</button></Link>
        </div>
     
    </div>
  );
}

export default NotFound;