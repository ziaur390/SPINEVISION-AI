/**
 * Register Page
 * Minimal professional design
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import logo from '../assets/logo.png';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        full_name: '',
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await register({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
            {/* Register Card */}
            <div className="w-full max-w-[420px] animate-fade-in">
                {/* Logo & Title */}
                <div className="text-center mb-10">
                    <img src={logo} alt="SpineVision AI" className="h-20 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-[#1a1a2e]">
                        SPINEVISION AI
                    </h1>
                    <p className="text-[#6b7280] mt-2 text-sm">
                        Create your account
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb]">
                    <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">
                        Register
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-5 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="input"
                                placeholder="Dr. John Smith"
                                required
                            />
                        </div>

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
                                placeholder="Minimum 6 characters"
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-[#374151] mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input"
                                placeholder="Confirm password"
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
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-[#6b7280] mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#3b5998] font-medium hover:underline">
                            Sign in
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

export default Register;
