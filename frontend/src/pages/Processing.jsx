/**
 * Processing Page
 * Loading animation while AI analyzes the X-ray
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResult } from '../services/api';
import logo from '../assets/logo.png';

const Processing = () => {
    const navigate = useNavigate();
    const { uploadId } = useParams();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? prev : prev + Math.random() * 10));
        }, 400);

        const checkResult = async () => {
            try {
                const result = await getResult(uploadId);
                if (result) {
                    setProgress(100);
                    setTimeout(() => navigate(`/result/${uploadId}`, { state: { result } }), 500);
                }
            } catch {
                setTimeout(checkResult, 2000);
            }
        };

        setTimeout(checkResult, 2000);

        return () => clearInterval(progressInterval);
    }, [uploadId, navigate]);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
            <div className="text-center animate-fade-in">
                {/* Spinner */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-[#e5e7eb] rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-[#3b5998] rounded-full animate-spin"></div>
                    <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
                    Analyzing X-ray...
                </h2>
                <p className="text-[#6b7280] mb-6">
                    Our AI model is processing your image
                </p>

                {/* Progress */}
                <div className="w-64 mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6b7280]">Processing</span>
                        <span className="text-[#3b5998] font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#3b5998] rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Processing;
