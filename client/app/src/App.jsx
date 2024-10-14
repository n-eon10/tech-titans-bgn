import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import SideBar from './components/ui/sidebar.jsx';
import LoginForm from './pages/login';
import Explore from './pages/explore';
import Maps from './pages/map';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
  const location = useLocation(); // Hook to get the current route

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen">
        {/* Header Section with Logo and Title */}
        <header className="flex items-center justify-between bg-transparent p-4"> {/* Added padding */}
          <div className="flex items-center">
            <img src="logo.png" alt="We Outside Logo" className="h-12 w-12 mr-4" />
            <h1 className="text-white font-bold text-2xl">We Outside</h1>
          </div>
        </header>

        {/* Main content section with Sidebar and Routes */}
        <div className="flex flex-1">
          {/* Conditionally render the Sidebar only if not on the login page */}
          {location.pathname !== '/' && (
            <SideBar />
          )}

          {/* Main content container */}
          <div className="flex-1 p-4 overflow-auto"> {/* Added overflow-auto for vertical scrolling */}
            <Routes>
              <Route path="/" element={<LoginForm />} /> {/* Default route */}
              <Route path="/maps" element={<Maps />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
