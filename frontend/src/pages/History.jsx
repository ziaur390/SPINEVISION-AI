/**
 * History Page
 * Minimal professional design
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getHistory, deleteUpload } from '../services/api';

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

    const handleDelete = async (id) => {
        if (!confirm('Delete this scan?')) return;
        setDeleting(id);
        try {
            await deleteUpload(id);
            setHistory(history.filter(item => item.upload_id !== id));
        } catch (err) {
            console.error('Failed to delete:', err);
        } finally {
            setDeleting(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            done: 'badge-success',
            processing: 'badge-warning',
            uploaded: 'badge-info',
            failed: 'badge-danger',
        };
        return <span className={`badge ${styles[status] || ''}`}>{status}</span>;
    };

    const getResultBadge = (classification) => {
        if (!classification) return null;
        if (classification.includes('Normal')) return <span className="badge badge-success">Normal</span>;
        if (classification.includes('High')) return <span className="badge badge-danger">Abnormal</span>;
        return <span className="badge badge-warning">Review</span>;
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <Sidebar />

            <main className="ml-60 pt-16 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a1a2e]">Scan History</h1>
                        <p className="text-[#6b7280] mt-1">View and manage your X-ray scans</p>
                    </div>
                    <Link to="/upload" className="px-5 py-2.5 bg-[#3b5998] text-white font-medium rounded-lg hover:bg-[#2d4373] transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Scan
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-[#e5e7eb]">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="loader mx-auto"></div>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-[#6b7280] mb-4">No scans yet</p>
                            <Link to="/upload" className="text-[#3b5998] font-medium hover:underline">Upload your first X-ray</Link>
                        </div>
                    ) : (
                        <>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>File</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Result</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item) => (
                                        <tr key={item.upload_id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium text-[#1a1a2e] truncate max-w-[200px]">
                                                        {item.file_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-[#6b7280] text-sm">
                                                {new Date(item.uploaded_at).toLocaleDateString()}
                                            </td>
                                            <td>{getStatusBadge(item.status)}</td>
                                            <td>{getResultBadge(item.overall_classification)}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    {item.status === 'done' && (
                                                        <Link
                                                            to={`/result/${item.upload_id}`}
                                                            className="p-2 text-[#3b5998] hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(item.upload_id)}
                                                        disabled={deleting === item.upload_id}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between p-4 border-t border-[#e5e7eb]">
                                    <p className="text-sm text-[#6b7280]">Page {page} of {totalPages}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-4 py-2 bg-[#f3f4f6] text-[#374151] font-medium rounded-lg hover:bg-[#e5e7eb] disabled:opacity-50"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setPage(page + 1)}
                                            disabled={page === totalPages}
                                            className="px-4 py-2 bg-[#f3f4f6] text-[#374151] font-medium rounded-lg hover:bg-[#e5e7eb] disabled:opacity-50"
                                        >
                                            Next
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
