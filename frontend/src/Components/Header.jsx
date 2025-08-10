
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="w-full bg-transparent absolute top-0 z-10">
      <div className="w-[90%] flex justify-between items-center p-4 mx-auto">
        <Link to={'/'}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCT1fQrFVM7dK3sITAmmd16hseJ5lTGy2jDw&s"
          className="w-22 lg:w-33 rounded cursor-pointer bg-transparent" alt="logo" /> </Link>
        <Link to={'/videos'}>
         <button className="px-2 py-1 lg:px-4 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 cursor-pointer"> 
         Get Started </button> </Link>
      </div>
    </div>
  );
};

export default Header;
