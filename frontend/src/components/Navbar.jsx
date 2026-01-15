/**
 * Navbar Component
 * Minimal professional design
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getStoredUser } from '../services/api';
import logo from '../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const user = getStoredUser();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-[#e5e7eb] fixed w-full top-0 z-50">
            <div className="max-w-full mx-auto px-6">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center gap-3">
                            <img src={logo} alt="SpineVision AI" className="h-9 w-auto" />
                            <span className="text-lg font-bold text-[#1a1a2e] hidden sm:block">
                                SPINEVISION AI
                            </span>
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* New Scan Button */}
                        <Link
                            to="/upload"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#3b5998] text-white text-sm font-medium rounded-lg hover:bg-[#2d4373] transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Scan
                        </Link>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-[#3b5998] rounded-full flex items-center justify-center text-white font-medium text-sm">
                                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-[#374151]">
                                    {user?.full_name || 'User'}
                                </span>
                                <svg className="w-4 h-4 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {showDropdown && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#e5e7eb] py-1 z-20 shadow-lg">
                                        <div className="px-4 py-3 border-b border-[#e5e7eb]">
                                            <p className="text-sm font-medium text-[#1a1a2e]">{user?.full_name}</p>
                                            <p className="text-xs text-[#6b7280]">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-sm text-[#374151] hover:bg-gray-50"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/history"
                                            className="block px-4 py-2 text-sm text-[#374151] hover:bg-gray-50"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            History
                                        </Link>
                                        <div className="border-t border-[#e5e7eb]">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
