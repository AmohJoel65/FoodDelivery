import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const LoginModal = ({ setShowLogin }) => {
  const { setToken, setUser, url } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login"); // "Login", "Sign Up", or "Forgot Password"
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    resetToken: "",
    newPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.email) {
      setErrorMsg("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${url}/api/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("Reset token generated. For testing, token: " + data.resetToken);
        setFormData({ ...formData, resetToken: data.resetToken });
        setCurrState("Reset Password");
      } else {
        setErrorMsg(data.message || "Failed to generate reset token");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.resetToken || !formData.newPassword) {
      setErrorMsg("Please enter the reset token and new password");
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${url}/api/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: formData.resetToken,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("Password reset successfully! You can now login with your new password.");
        setTimeout(() => {
          setShowLogin(false);
        }, 2000);
      } else {
        setErrorMsg(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate Input
    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    if (currState === "Sign Up" && !formData.name) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (currState === "Sign Up" && formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (currState === "Sign Up" && formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = currState === "Login"
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        // Save token and user details to Store Context & LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setToken(data.token);
        setUser(data.user);

        // Force full page reload or background cart refetch
        // We'll reload cart data dynamically inside the context state:
        const cartResponse = await fetch(`${url}/api/cart/get`, {
          method: "GET",
          headers: { token: data.token }
        });
        const cartData = await cartResponse.json();
        
        // Sync context
        window.location.reload(); // Hard reload synchronizes everything perfectly and cleanly
        setShowLogin(false);
      } else {
        setErrorMsg(data.message || "An authentication error occurred.");
      }
    } catch (err) {
      console.error("Auth submit error:", err);
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-brand-charcoal/50 backdrop-blur-sm animate-fade-in">
      
      {/* Background click listener to close */}
      <div className="absolute inset-0" onClick={() => setShowLogin(false)}></div>

      {/* Modal Card */}
      <div className="relative w-full sm:max-w-[420px] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto bg-brand-cream rounded-t-2xl sm:rounded-2xl border border-brand-charcoal/5 shadow-2xl p-6 sm:p-8 z-10 animate-scale-in safe-bottom">
        
        {/* Close Button */}
        <button 
          onClick={() => setShowLogin(false)}
          className="absolute top-6 right-6 text-brand-charcoal/40 hover:text-brand-charcoal p-1.5 rounded-full hover:bg-brand-charcoal/5 transition-all"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Brand/Title */}
        <div className="text-left mb-6">
          <h2 className="text-3xl font-bold font-serif text-brand-charcoal">
            {currState === "Login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-xs text-brand-charcoal/50 mt-1.5 font-light">
            {currState === "Login" ? "Sign in to view orders and manage your cart." : "Create an account to start ordering from Joel's Kitchen."}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-5 p-3.5 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100 text-left">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Success Alert Box */}
        {successMsg && (
          <div className="mb-5 p-3.5 bg-green-50 text-green-700 text-xs font-semibold rounded-xl border border-green-100 text-left">
            ✅ {successMsg}
          </div>
        )}

        {/* Forgot Password Form */}
        {currState === "Forgot Password" && (
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-bold text-sm rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Token"
              )}
            </button>

            <div className="text-center mt-4 pt-4 border-t border-brand-charcoal/5 text-xs">
              <p className="text-brand-charcoal/60">
                Remember your password?{" "}
                <span 
                  onClick={() => { setCurrState("Login"); setErrorMsg(""); setSuccessMsg(""); }}
                  className="text-brand-gold font-bold cursor-pointer hover:underline"
                >
                  Back to Login
                </span>
              </p>
            </div>
          </form>
        )}

        {/* Reset Password Form */}
        {currState === "Reset Password" && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Reset Token</label>
              <input 
                type="text" 
                name="resetToken" 
                value={formData.resetToken}
                onChange={handleChange}
                placeholder="Enter the reset token" 
                className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">New Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="newPassword" 
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password (6+ characters)" 
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-brand-charcoal/40 hover:text-brand-charcoal"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 py-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-bold text-sm rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="text-center mt-4 pt-4 border-t border-brand-charcoal/5 text-xs">
              <p className="text-brand-charcoal/60">
                <span 
                  onClick={() => { setCurrState("Login"); setErrorMsg(""); setSuccessMsg(""); }}
                  className="text-brand-gold font-bold cursor-pointer hover:underline"
                >
                  Back to Login
                </span>
              </p>
            </div>
          </form>
        )}

        {/* Auth Form (Login & Sign Up) */}
        {currState === "Login" || currState === "Sign Up" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          
          {/* Name Field (Sign Up ONLY) */}
          {currState === "Sign Up" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jean Joel" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                  required
                />
                <User className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. you@example.com" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                required
              />
              <Mail className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter 6+ characters" 
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-brand-charcoal/40 hover:text-brand-charcoal"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Confirmation Field (Sign Up ONLY) */}
          {currState === "Sign Up" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password" 
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-all"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 text-brand-charcoal/30" size={16} />
              </div>
            </div>
          )}

          {/* Action Execution Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream font-bold text-sm rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-brand-cream border-t-transparent rounded-full animate-spin"></div>
            ) : (
              currState === "Login" ? "Sign In" : "Register Account"
            )}
          </button>

          {/* Disclaimer (Sign Up ONLY) */}
          {currState === "Sign Up" && (
            <p className="text-[10px] text-brand-charcoal/40 leading-normal text-center mt-2">
              By creating an account, you agree to Joel.'s Terms of Service and Privacy Policies.
            </p>
          )}

          {/* Mode Switcher */}
          <div className="text-center mt-4 pt-4 border-t border-brand-charcoal/5 text-xs">
            {currState === "Login" ? (
              <p className="text-brand-charcoal/60">
                New to Joel.?{" "}
                <span 
                  onClick={() => { setCurrState("Sign Up"); setErrorMsg(""); }}
                  className="text-brand-gold font-bold cursor-pointer hover:underline"
                >
                  Create account
                </span>
              </p>
            ) : (
              <p className="text-brand-charcoal/60">
                Already registered?{" "}
                <span 
                  onClick={() => { setCurrState("Login"); setErrorMsg(""); }}
                  className="text-brand-gold font-bold cursor-pointer hover:underline"
                >
                  Sign in here
                </span>
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          {currState === "Login" && (
            <div className="text-center mt-2 text-xs">
              <span 
                onClick={() => { setCurrState("Forgot Password"); setErrorMsg(""); }}
                className="text-brand-charcoal/40 hover:text-brand-gold cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>
          )}

        </form>
        ) : null}
        {/* End Auth Form (Login & Sign Up) */}

      </div>
    </div>
  );
};

export default LoginModal;
