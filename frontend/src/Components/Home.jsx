
import { Link } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
    return(

        <>
    <Header />
      <div className="main min-h-screen flex items-center justify-center mx-auto">
            
        <div className='p-2 mx-auto '>
             
           <h1 className="text-white font-bold  text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
             Welcome to <span className="text-blue-700">Easy Study</span> Platform</h1>

          <h2 className="text-white font-bold mt-1 ml-3  text-lg sm:text-xl md:text-2xl lg:text-3xl">
            A New Different Way To Improve Your Skills 
            <span className="text-blue-700">Goal</span> </h2>

            
            <div className='py-1 p-1 shadow-lg rounded-lg w-full h-full flex items-center mt-6 bg-white'>
                <input type="text" className='outline-none w-full p-2 truncate' placeholder='Search your fevourate course'/>
                <Link to="/videos" ><button className="lg:w-32 lg:h-12 bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-800 font-semibold">Browse Courses </button></Link>
            </div>
       </div>

               
     </div>
        
        </>
    )
}

export default HomePage;