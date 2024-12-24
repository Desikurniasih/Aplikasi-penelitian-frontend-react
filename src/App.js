import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Component/Header';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Penelitian from './Pages/Penelitian';
import Upload from './Pages/Upload';
import Login from './Pages/Login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
        <div className="flex flex-1">
          {isLoggedIn && <Navbar />}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="container mx-auto">
              <Routes>
                <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/penelitian" element={<Penelitian />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router> 
  );
}

export default App;
