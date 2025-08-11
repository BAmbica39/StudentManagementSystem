import React from "react";
import { Link } from "react-router-dom";

const NotFound =()=>{
    return (
        <div className = 'flex flex-col items-center justify-cnter min-h-screen bg-gray-100'>
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-700 mt-4 mb-6">Page not found</p>
            <Link to="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded hover:big-blue-700">
            Go back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;