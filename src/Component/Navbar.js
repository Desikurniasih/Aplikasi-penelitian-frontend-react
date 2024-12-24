import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFlask,FaCloudUploadAlt } from 'react-icons/fa';

function Navbar() {
    const location = useLocation();

    
    return (
        <nav className="bg-gray-800 text-white w-56 min-h-screen p-4 flex flex-col justify-between">
            <ul className="space-y-2">
                <li>
                    <Link to="/" className={`flex items-center py-2 px-3 rounded-md transition duration-300 text-sm ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                        <FaHome className="mr-2" />
                        <span className="font-semibold">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/penelitian" className={`flex items-center py-2 px-3 rounded-md transition duration-300 text-sm ${location.pathname === '/penelitian' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                        <FaFlask className="mr-2" />
                        <span className="font-semibold">Penelitian</span>
                    </Link>
                </li>
                <li>
                    <Link to="/upload" className={`flex items-center py-2 px-3 rounded-md transition duration-300 text-sm ${location.pathname === '/upload' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
                        <FaCloudUploadAlt className="mr-2" />
                        <span className="font-semibold">Upload</span>
                    </Link>
                </li>
               
            </ul>
            <div className="mt-auto pt-4 text-center text-xs text-gray-400">
                <p className="text-center text-gray-500 mt-6">SIPENA &copy; 2024</p>
            </div>
        </nav>
    );
}

export default Navbar;
