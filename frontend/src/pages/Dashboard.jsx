/**
 * Dashboard Page
 * Minimal professional design
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getStatistics, getStoredUser, getHistory } from '../services/api';

const Dashboard = () => {
    const user = getStoredUser();
    const [stats, setStats] = useState({
        total_uploads: 0,
        normal_count: 0,
        abnormal_count: 0,
        pending_count: 0,
    });
    const [recentScans, setRecentScans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsData, historyData] = await Promise.all([
                getStatistics(),
                getHistory(1, 5)
            ]);
            setStats(statsData);
            setRecentScans(historyData.items || []);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Scans', value: stats.total_uploads, color: 'bg-[#3b5998]' },
        { title: 'Normal', value: stats.normal_count, color: 'bg-[#10b981]' },
        { title: 'Abnormal', value: stats.abnormal_count, color: 'bg-[#f59e0b]' },
        { title: 'Processing', value: stats.pending_count, color: 'bg-[#6b7280]' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <Sidebar />

            {/* Main Content */}
            <main className="ml-60 pt-16 p-8">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#1a1a2e]">
                        Welcome back, {user?.full_name?.split(' ')[0] || 'Doctor'}
                    </h1>
                    <p className="text-[#6b7280] mt-1">
                        Here's your spine analysis overview
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {statCards.map((card) => (
                        <div key={card.title} className="bg-white rounded-2xl p-6 border border-[#e5e7eb]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[#6b7280]">{card.title}</p>
                                    <p className="text-3xl font-bold text-[#1a1a2e] mt-1">
                                        {loading ? '-' : card.value}
                                    </p>
                                </div>
                                <div className={`w-10 h-10 ${card.color} rounded-xl opacity-20`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions & Recent */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Upload Card */}
                            <Link to="/upload" className="block bg-white rounded-2xl p-6 border border-[#e5e7eb] hover:border-[#3b5998] transition-colors group">
                                <div className="w-12 h-12 bg-[#3b5998] rounded-xl flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1">Upload X-ray</h3>
                                <p className="text-sm text-[#6b7280]">Upload a new spine X-ray for AI analysis</p>
                            </Link>

                            {/* History Card */}
                            <Link to="/history" className="block bg-white rounded-2xl p-6 border border-[#e5e7eb] hover:border-[#3b5998] transition-colors group">
                                <div className="w-12 h-12 bg-[#6b7280] rounded-xl flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1">View History</h3>
                                <p className="text-sm text-[#6b7280]">Access previous scans and reports</p>
                            </Link>
                        </div>

                        {/* Recent Scans */}
                        <div className="bg-white rounded-2xl border border-[#e5e7eb]">
                            <div className="p-5 border-b border-[#e5e7eb] flex items-center justify-between">
                                <h3 className="font-semibold text-[#1a1a2e]">Recent Scans</h3>
                                <Link to="/history" className="text-sm text-[#3b5998] hover:underline">View all</Link>
                            </div>
                            <div className="divide-y divide-[#f3f4f6]">
                                {loading ? (
                                    <div className="p-8 text-center text-[#6b7280]">Loading...</div>
                                ) : recentScans.length === 0 ? (
                                    <div className="p-8 text-center text-[#6b7280]">No scans yet</div>
                                ) : (
                                    recentScans.slice(0, 4).map((scan) => (
                                        <div key={scan.upload_id} className="p-4 flex items-center justify-between hover:bg-[#fafbfc]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[#1a1a2e] truncate max-w-[180px]">{scan.file_name}</p>
                                                    <p className="text-xs text-[#9ca3af]">{new Date(scan.uploaded_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {scan.status === 'done' && (
                                                <Link to={`/result/${scan.upload_id}`} className="text-[#3b5998] hover:underline text-sm">View</Link>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* AI Info */}
                        <div className="bg-[#3b5998] rounded-2xl p-6 text-white">
                            <h4 className="font-semibold mb-2">AI-Powered Analysis</h4>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                Our deep learning model can detect spine conditions including disc narrowing,
                                spondylolisthesis, and degenerative changes.
                            </p>
                        </div>

                        {/* Conditions */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb]">
                            <h4 className="font-semibold text-[#1a1a2e] mb-4">Detectable Conditions</h4>
                            <div className="space-y-2">
                                {['Disc Narrowing', 'Degenerative Changes', 'Spondylolisthesis', 'Osteophytes', 'Scoliosis'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm text-[#6b7280]">
                                        <div className="w-1.5 h-1.5 bg-[#3b5998] rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
