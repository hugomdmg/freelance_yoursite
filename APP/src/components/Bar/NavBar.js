import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../infraestructure/AuthContext';
import Languages from './languages/Languages';
import DarkLightMode from './DarkLightMode';
import Sidebar from './SideBar';
import { DropDown } from './DropDown';

const NavBar = () => {
    const { user, logout, setIsVisible } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    return (
        <>
            <nav className="px-4 flex justify-between fixed w-full bg-[#3c6e71] py-3 shadow-md dark:bg-gray-800 dark:text-white z-10">
                <div className="hidden md:flex space-x-4 items-center">
                    {(user && user.roll == 'admin') && (
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle menu">
                            <svg
                                className="w-6 h-6 text-[#d7e9e3] dark:text-white"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    )}
                    <a
                        href="/"
                        className="text-2xl font-bold text-[#d7e9e3] hover:text-[#2c5558] dark:text-white dark:hover:text-gray-400"
                    >
                        YourSite
                    </a>
                    <button
                        className="px-1 py-1 m-0.5 bg-transparent dark:text-gray-300 text-[#3c6e71] border-2 border-[#3c6e71] rounded-lg hover:bg-green-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#204051] transition-all duration-300"
                        onClick={() => {
                            localStorage.removeItem("hasSeenIntroduction");
                            setIsVisible(true);
                        }}
                    >
                        Show Introduction
                    </button>
                </div>

                <div className="hidden md:flex space-x-4 items-center">
                    <Languages />
                    <DarkLightMode />
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="px-4 py-2 rounded-md bg-[#204051] text-[#d7e9e3] hover:bg-[#2c5558] dark:bg-gray-500 dark:text-black dark:hover:bg-gray-400"
                            >
                                {user.email}
                            </button>
                            {dropdownOpen && <DropDown
                                user={user}
                                setDropdownOpen={setDropdownOpen}
                                handleNavigation={handleNavigation}
                                logout={logout}
                            />}
                        </div>
                    ) : (
                        <a
                            href="/login"
                            className="px-4 py-2 rounded-md bg-[#204051] text-[#d7e9e3] hover:bg-[#2c5558] dark:bg-gray-500 dark:text-black dark:hover:bg-gray-400"
                        >
                            Log in
                        </a>
                    )}
                </div>
            </nav>

            {(user && user.roll == 'admin') && (<Sidebar isSidebarOpen={isSidebarOpen} />)}
        </>
    );
};

export default NavBar;

