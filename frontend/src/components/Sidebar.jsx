/**
 * Sidebar Component
 * Minimal professional design
 */

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: 'Upload Scan',
            path: '/upload',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
        },
        {
            name: 'History',
            path: '/history',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-white border-r border-[#e5e7eb] flex flex-col">
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider px-3 mb-4">
                    Menu
                </p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-[#e5e7eb]">
                <div className="flex items-center gap-3 px-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-[#6b7280]">AI Model Active</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
