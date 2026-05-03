/**
 * History Page
 * Displays user's upload history with filtering and pagination
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getHistory, deleteUpload, API_BASE_URL } from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, [page]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await getHistory(page, 10);
            setHistory(data.items || []);
            setTotalPages(data.total_pages || 1);
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (uploadId) => {
        if (!confirm('Are you sure you want to delete this scan?')) return;

        setDeleting(uploadId);
        try {
            await deleteUpload(uploadId);
            setHistory(history.filter(item => item.upload_id !== uploadId));
        } catch (err) {
            console.error('Failed to delete:', err);
        } finally {
            setDeleting(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            done: 'bg-emerald-100 text-emerald-700',
            processing: 'bg-yellow-100 text-yellow-700',
            uploaded: 'bg-blue-100 text-blue-700',
            failed: 'bg-red-100 text-red-700',
        };
        const labels = {
            done: 'Completed',
            processing: 'Processing',
            uploaded: 'Uploaded',
            failed: 'Failed',
        };
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
                {status === 'done' && (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )}
                {status === 'processing' && (
                    <div className="w-3 h-3 mr-1 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                {labels[status] || status}
            </span>
        );
    };

    const getClassificationBadge = (classification) => {
        if (!classification) return <span className="text-gray-400 text-sm">—</span>;
        if (classification.includes('Normal')) {
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Normal</span>;
        }
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Abnormal</span>;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Sidebar />

            {/* Main Content */}
            <main className="md:ml-64 pt-16 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Scan History</h1>
                        <p className="text-gray-500 mt-1">
                            View and manage your previous X-ray analyses
                        </p>
                    </div>
                    <Link
                        to="/upload"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg shadow-teal-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Scan
                    </Link>
                </div>

                {/* History Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading history...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No scans yet</h3>
                            <p className="text-gray-500 mb-6">Upload your first X-ray to get started</p>
                            <Link
                                to="/upload"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg shadow-teal-200"
                            >
                                Upload X-ray
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50">
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">File Name</th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Result</th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Confidence</th>
                                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {history.map((item) => (
                                            <tr key={item.upload_id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium text-gray-800 truncate max-w-[200px]">
                                                            {item.file_name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                                                    {formatDate(item.uploaded_at)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(item.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getClassificationBadge(item.overall_classification)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.confidence_score ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                                                                    style={{ width: `${item.confidence_score * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {(item.confidence_score * 100).toFixed(0)}%
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">—</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        {item.status === 'done' && (
                                                            <Link
                                                                to={`/result/${item.upload_id}`}
                                                                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition"
                                                                title="View Result"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(item.upload_id)}
                                                            disabled={deleting === item.upload_id}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                            title="Delete"
                                                        >
                                                            {deleting === item.upload_id ? (
                                                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                            ) : (
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Page {page} of {totalPages}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === totalPages}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default History;
