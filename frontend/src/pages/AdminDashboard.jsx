/**
 * Admin Dashboard
 * Administrative control panel for system management
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStoredUser } from '../services/api';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = getStoredUser();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalUsers: 156,
        activeUsers: 89,
        totalScans: 2834,
        todayScans: 47,
        pendingReviews: 12,
        systemHealth: 98
    });

    const [users, setUsers] = useState([
        { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@hospital.com', role: 'doctor', scans: 234, lastActive: '2 hours ago', status: 'active' },
        { id: 2, name: 'Dr. Michael Chen', email: 'mchen@clinic.org', role: 'doctor', scans: 189, lastActive: '5 hours ago', status: 'active' },
        { id: 3, name: 'Dr. Emily Davis', email: 'emily.d@medcenter.com', role: 'doctor', scans: 156, lastActive: '1 day ago', status: 'inactive' },
        { id: 4, name: 'Admin User', email: 'admin@spinevision.ai', role: 'admin', scans: 0, lastActive: 'Now', status: 'active' },
        { id: 5, name: 'Dr. Robert Wilson', email: 'rwilson@hospital.com', role: 'doctor', scans: 98, lastActive: '3 days ago', status: 'active' }
    ]);

    const [recentActivity, setRecentActivity] = useState([
        { id: 1, action: 'New user registered', user: 'Dr. Sarah Johnson', time: '2 min ago', type: 'user' },
        { id: 2, action: 'Scan completed', user: 'Dr. Michael Chen', time: '15 min ago', type: 'scan' },
        { id: 3, action: 'Report downloaded', user: 'Dr. Emily Davis', time: '1 hour ago', type: 'report' },
        { id: 4, action: 'User deactivated', user: 'John Doe', time: '3 hours ago', type: 'warning' },
        { id: 5, action: 'System backup completed', user: 'System', time: '6 hours ago', type: 'system' }
    ]);

    const [blogPosts, setBlogPosts] = useState([
        { id: 1, title: 'Understanding Lumbar Spine Disorders', status: 'published', views: 1234, date: 'Jan 15, 2026' },
        { id: 2, title: 'How AI is Revolutionizing Medical Imaging', status: 'published', views: 987, date: 'Jan 10, 2026' },
        { id: 3, title: 'Early Detection Saves Lives', status: 'draft', views: 0, date: 'Jan 5, 2026' }
    ]);

    // Check if user is admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            // For demo, allow access
            // navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'user': return '👤';
            case 'scan': return '🔬';
            case 'report': return '📄';
            case 'warning': return '⚠️';
            case 'system': return '⚙️';
            default: return '📌';
        }
    };

    const tabs = [
        { id: 'overview', name: 'Overview', icon: '📊' },
        { id: 'users', name: 'Users', icon: '👥' },
        { id: 'scans', name: 'Scans', icon: '🔬' },
        { id: 'blog', name: 'Blog', icon: '📝' },
        { id: 'settings', name: 'Settings', icon: '⚙️' }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="SpineVision AI" className="h-10 w-auto" />
                        <div>
                            <p className="font-bold">SPINEVISION AI</p>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                    ? 'bg-teal-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <span>🏠</span>
                        <span>User Dashboard</span>
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {tabs.find(t => t.id === activeTab)?.name || 'Dashboard'}
                        </h1>
                        <p className="text-gray-500">Manage your SPINEVISION AI platform</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                A
                            </div>
                            <span className="font-medium text-gray-700">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">👥</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">+12%</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                                <p className="text-gray-500">Total Users</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">🔬</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">+8%</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-800">{stats.totalScans}</p>
                                <p className="text-gray-500">Total Scans</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">📊</span>
                                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">{stats.todayScans}</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-800">{stats.todayScans}</p>
                                <p className="text-gray-500">Today's Scans</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">💚</span>
                                    <span className="text-green-600 font-bold">{stats.systemHealth}%</span>
                                </div>
                                <p className="text-3xl font-bold text-gray-800">Healthy</p>
                                <p className="text-gray-500">System Status</p>
                            </div>
                        </div>

                        {/* Recent Activity & Quick Actions */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">Recent Activity</h3>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                                                <div>
                                                    <p className="font-medium text-gray-800">{activity.action}</p>
                                                    <p className="text-sm text-gray-500">{activity.user}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-400">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full p-4 bg-teal-50 text-teal-700 rounded-xl text-left hover:bg-teal-100 transition-colors">
                                        <span className="font-medium">+ Add New User</span>
                                    </button>
                                    <button className="w-full p-4 bg-blue-50 text-blue-700 rounded-xl text-left hover:bg-blue-100 transition-colors">
                                        <span className="font-medium">📝 Create Blog Post</span>
                                    </button>
                                    <button className="w-full p-4 bg-purple-50 text-purple-700 rounded-xl text-left hover:bg-purple-100 transition-colors">
                                        <span className="font-medium">📊 Generate Report</span>
                                    </button>
                                    <button className="w-full p-4 bg-orange-50 text-orange-700 rounded-xl text-left hover:bg-orange-100 transition-colors">
                                        <span className="font-medium">⚙️ System Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">User Management</h3>
                            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                + Add User
                            </button>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Scans</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{u.name}</p>
                                                    <p className="text-sm text-gray-500">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{u.scans}</td>
                                        <td className="px-6 py-4 text-gray-500">{u.lastActive}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Blog Tab */}
                {activeTab === 'blog' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800">Blog Posts</h3>
                                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                    + New Post
                                </button>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Views</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {blogPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{post.views.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-gray-500">{post.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Scans Tab */}
                {activeTab === 'scans' && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                        <span className="text-6xl mb-4 block">🔬</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Scan Analytics</h3>
                        <p className="text-gray-500">View and manage all system scans and analytics.</p>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                        <span className="text-6xl mb-4 block">⚙️</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">System Settings</h3>
                        <p className="text-gray-500">Configure system preferences and integrations.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
