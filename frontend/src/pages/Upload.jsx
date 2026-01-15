/**
 * Upload Page
 * Minimal professional design
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { uploadXray } from '../services/api';

const Upload = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleFileSelect = (e) => {
        handleFile(e.target.files[0]);
    };

    const handleFile = (selectedFile) => {
        setError('');
        if (!selectedFile) return;

        const ext = selectedFile.name.split('.').pop().toLowerCase();
        if (!['png', 'jpg', 'jpeg', 'dcm', 'dicom'].includes(ext)) {
            setError('Please upload PNG, JPG, or DICOM files');
            return;
        }

        if (selectedFile.size > 50 * 1024 * 1024) {
            setError('File must be under 50MB');
            return;
        }

        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setProgress(0);
        setError('');

        try {
            const result = await uploadXray(file, setProgress);
            navigate(`/result/${result.upload_id}`, { state: { result } });
        } catch (err) {
            setError(err.response?.data?.detail || 'Upload failed');
            setUploading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <Sidebar />

            <main className="ml-60 pt-16 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#1a1a2e]">Upload X-ray</h1>
                    <p className="text-[#6b7280] mt-1">Upload a spine X-ray for AI analysis</p>
                </div>

                <div className="max-w-2xl">
                    {/* Upload Card */}
                    <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb]">
                        {/* Error */}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Drop Zone */}
                        {!file && (
                            <div
                                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging ? 'border-[#3b5998] bg-blue-50/30' : 'border-[#d1d5db] hover:border-[#9ca3af]'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept=".png,.jpg,.jpeg,.dcm,.dicom"
                                    className="hidden"
                                />

                                <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-5">
                                    <svg className="w-8 h-8 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>

                                <p className="text-[#1a1a2e] font-medium mb-2">
                                    Drop your X-ray image here
                                </p>
                                <p className="text-sm text-[#6b7280] mb-4">
                                    or <span className="text-[#3b5998]">browse</span> to upload
                                </p>
                                <p className="text-xs text-[#9ca3af]">
                                    PNG, JPG, DICOM • Max 50MB
                                </p>
                            </div>
                        )}

                        {/* Preview */}
                        {file && (
                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    {/* Image */}
                                    <div className="w-48 h-48 bg-[#1a1a2e] rounded-xl overflow-hidden flex-shrink-0">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#6b7280]">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <p className="font-medium text-[#1a1a2e] truncate mb-1">{file.name}</p>
                                        <p className="text-sm text-[#6b7280] mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                                        {/* Progress */}
                                        {uploading && (
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-[#6b7280]">Uploading...</span>
                                                    <span className="text-[#3b5998] font-medium">{progress}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleUpload}
                                                disabled={uploading}
                                                className="flex-1 py-3 bg-[#3b5998] text-white font-medium rounded-xl hover:bg-[#2d4373] transition-colors disabled:opacity-50"
                                            >
                                                {uploading ? 'Analyzing...' : 'Start Analysis'}
                                            </button>
                                            {!uploading && (
                                                <button onClick={clearFile} className="px-6 py-3 bg-[#f3f4f6] text-[#374151] font-medium rounded-xl hover:bg-[#e5e7eb] transition-colors">
                                                    Change
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex gap-4 mt-6">
                        {[
                            { icon: '🔒', title: 'Secure', desc: 'Encrypted upload' },
                            { icon: '⚡', title: 'Fast', desc: 'Instant results' },
                            { icon: '🧠', title: 'AI', desc: 'Deep learning' },
                        ].map((item) => (
                            <div key={item.title} className="flex-1 bg-white rounded-xl p-4 border border-[#e5e7eb] text-center">
                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                <p className="font-medium text-[#1a1a2e] text-sm">{item.title}</p>
                                <p className="text-xs text-[#9ca3af]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Upload;
