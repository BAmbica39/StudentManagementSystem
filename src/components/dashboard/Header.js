import React from 'react';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

