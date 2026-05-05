import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, UserPlus, AlertCircle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../../api/authService";

const AdminRegister = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if already logged in
    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password should be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const userData = {
                full_name: fullName,
                email: email,
                password: password,
                is_active: true,
                is_admin: true // Defaulting to admin for this specific use case
            };
            await authService.register(userData);
            toast.success("Registration Successful! Please login.");
            navigate("/admin/login");
        } catch (error) {
            console.error("Registration Error:", error);
            toast.error(typeof error === 'string' ? error : "Registration failed. Email might already exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-10" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 border border-white/20">
                        <ShieldCheck size={32} className="text-secondary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Reva Admin</h1>
                    <p className="text-white/60 mt-2">Create a new admin account</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest leading-none">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <User size={20} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest leading-none">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        placeholder="admin@reva.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest leading-none">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest leading-none">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                                    loading 
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                    : "bg-primary text-white hover:bg-primary/95 hover:shadow-xl active:scale-[0.98]"
                                }`}
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Register Now <UserPlus size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{" "}
                                <Link to="/admin/login" className="text-primary font-bold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex items-center gap-3 text-gray-500">
                        <AlertCircle size={18} className="shrink-0" />
                        <p className="text-xs leading-relaxed">
                            Fill in your details to create an admin account. All registrations are monitored.
                        </p>
                    </div>
                </div>

                {/* Return to website link */}
                <div className="text-center mt-8">
                    <Link to="/" className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                        ← Back to Main Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
