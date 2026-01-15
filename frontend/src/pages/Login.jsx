/**
 * Login Page
 * Minimal professional design matching logo colors
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import logo from '../assets/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
            {/* Login Card */}
            <div className="w-full max-w-[420px] animate-fade-in">
                {/* Logo & Title */}
                <div className="text-center mb-10">
                    <img src={logo} alt="SpineVision AI" className="h-20 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-[#1a1a2e]">
                        SPINEVISION AI
                    </h1>
                    <p className="text-[#6b7280] mt-2 text-sm">
                        AI-Powered Spine Disease Detection
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb]">
                    <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">
                        Sign in to your account
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-5 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#3b5998] text-white font-medium rounded-xl hover:bg-[#2d4373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-[#6b7280] mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#3b5998] font-medium hover:underline">
                            Create account
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#9ca3af] mt-8">
                    © 2024 SPINEVISION AI • Medical Use Only
                </p>
            </div>
        </div>
    );
};

export default Login;
