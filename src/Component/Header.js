import React, { useState } from 'react';
import { useNavigate,Link,useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown, FaUniversity } from 'react-icons/fa';


function Header({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const location = useLocation();
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    return (
        <header className="bg-blue-500 text-white p-7 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <FaUniversity className="text-4xl text-white" />
                    <h1 className="text-3xl font-bold tracking-wider">
                        <span className="text-white"> SIPENA </span>
                       
                    </h1>
                </div>
                
                <div className="relative">
                    <button 
                        onClick={toggleLogout}
                        className="flex items-center focus:outline-none bg-white bg-opacity-20 px-6 py-3 rounded-full hover:bg-opacity-30 transition duration-300 shadow-md"
                    >
                        <FaUser className="mr-3 text-2xl text-white" />
                        <span className="font-semibold mr-3 text-white">Desi Kurniasih</span>
                        <FaChevronDown className={`transform transition-transform duration-200 ${showLogout ? 'rotate-180' : ''} text-white`} />
                    </button>
                    {showLogout && (
                        <div className="absolute right-0 mt-3 py-2 w-56 bg-white rounded-lg shadow-2xl z-20">
                        <button 
                            onClick={handleLogout}
                            className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center transition duration-200"
                        >
                            <FaSignOutAlt className="mr-3 text-blue-500" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header
