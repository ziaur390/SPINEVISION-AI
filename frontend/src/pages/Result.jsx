/**
 * Result Page
 * Minimal professional design
 */

import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getResult, downloadReport, API_BASE_URL } from '../services/api';

const Result = () => {
    const { uploadId } = useParams();
    const location = useLocation();
    const [result, setResult] = useState(location.state?.result || null);
    const [loading, setLoading] = useState(!result);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        if (!result) fetchResult();
    }, [uploadId]);

    const fetchResult = async () => {
        try {
            const data = await getResult(uploadId);
            setResult(data);
        } catch (err) {
            console.error('Failed to fetch result:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await downloadReport(uploadId);
        } catch (err) {
            console.error('Failed to download:', err);
        } finally {
            setDownloading(false);
        }
    };

    const getClassStyle = (classification) => {
        if (!classification) return 'bg-gray-50 text-gray-700 border-gray-200';
        if (classification.includes('Normal')) return 'bg-green-50 text-green-700 border-green-200';
        if (classification.includes('High')) return 'bg-red-50 text-red-700 border-red-200';
        return 'bg-orange-50 text-orange-700 border-orange-200';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8fafc]">
                <Navbar />
                <Sidebar />
                <main className="ml-60 pt-16 p-8 flex items-center justify-center min-h-screen">
                    <div className="loader"></div>
                </main>
            </div>
        );
    }

    const data = result?.result || result;
    const predictions = data?.predictions || [];

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <Sidebar />

            <main className="ml-60 pt-16 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Link to="/history" className="text-[#9ca3af] hover:text-[#6b7280]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl font-bold text-[#1a1a2e]">Analysis Results</h1>
                        </div>
                        <p className="text-[#6b7280]">AI-powered spine analysis report</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className="px-5 py-2.5 bg-[#3b5998] text-white font-medium rounded-lg hover:bg-[#2d4373] transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {downloading ? 'Downloading...' : 'Download PDF'}
                        </button>
                        <Link to="/upload" className="px-5 py-2.5 bg-[#f3f4f6] text-[#374151] font-medium rounded-lg hover:bg-[#e5e7eb] transition-colors">
                            New Scan
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Classification */}
                        <div className={`rounded-2xl p-6 border ${getClassStyle(data?.overall_classification)}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium opacity-70 mb-1">Classification</p>
                                    <h2 className="text-2xl font-bold">
                                        {data?.overall_classification || 'Processing...'}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium opacity-70 mb-1">Confidence</p>
                                    <p className="text-3xl font-bold">
                                        {data?.confidence_score ? `${(data.confidence_score * 100).toFixed(0)}%` : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Predictions */}
                        <div className="bg-white rounded-2xl border border-[#e5e7eb]">
                            <div className="p-5 border-b border-[#e5e7eb]">
                                <h3 className="font-semibold text-[#1a1a2e]">Detected Conditions</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {predictions.length === 0 ? (
                                    <p className="text-center text-[#6b7280] py-4">No conditions detected</p>
                                ) : (
                                    predictions.map((pred, i) => (
                                        <div key={i} className="bg-[#f9fafb] rounded-xl p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-[#1a1a2e]">{pred.label}</span>
                                                <span className="text-lg font-bold text-[#1a1a2e]">
                                                    {(pred.probability * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${pred.probability >= 0.7 ? 'bg-red-500' :
                                                            pred.probability >= 0.5 ? 'bg-orange-500' :
                                                                pred.probability >= 0.3 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${pred.probability * 100}%` }}
                                                ></div>
                                            </div>
                                            {pred.description && (
                                                <p className="text-sm text-[#6b7280] mt-2">{pred.description}</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Heatmap */}
                        <div className="bg-white rounded-2xl border border-[#e5e7eb]">
                            <div className="p-5 border-b border-[#e5e7eb]">
                                <h3 className="font-semibold text-[#1a1a2e]">Heatmap</h3>
                            </div>
                            <div className="p-5">
                                <div className="bg-[#1a1a2e] rounded-xl overflow-hidden aspect-square">
                                    {data?.heatmap_url ? (
                                        <img
                                            src={`${API_BASE_URL}${data.heatmap_url}`}
                                            alt="Heatmap"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#6b7280]">
                                            <p className="text-sm">No heatmap available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> This AI analysis is for clinical decision support only.
                                Final diagnosis should be made by a qualified medical professional.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Result;
