import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Listing from './pages/Listing';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Navbar from './components/Navbar';

function RoutePage() {
  return (
    <>
        <Router>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Listing />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/course/:id" element={<Course/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default RoutePage
