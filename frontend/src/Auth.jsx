import { useState } from 'react';
import axios from 'axios';

export default function Auth({ setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const payload = isLogin ? { email, password } : { name, email, password };
            
            const res = await axios.post(endpoint, payload);
            
            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                setToken(res.data.token);
            } else {
                setMessage("🎉 Signup successful! Please log in.");
                setIsLogin(true); 
                setPassword('');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred");
        }
        setIsLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', fontFamily: 'sans-serif' }}>
            <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                
                {/* Branding Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ color: '#ffffff', margin: '0 0 10px 0', fontSize: '28px' }}>🚀 AlgoJudge</h1>
                    <p style={{ color: '#888', margin: 0 }}>Secure Code Execution Engine</p>
                </div>

                {/* Login / Signup Tabs */}
                <div style={{ display: 'flex', marginBottom: '25px', borderBottom: '2px solid #333' }}>
                    <button 
                        onClick={() => { setIsLogin(true); setMessage(''); }} 
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', color: isLogin ? '#4facfe' : '#888', borderBottom: isLogin ? '2px solid #4facfe' : 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.3s' }}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => { setIsLogin(false); setMessage(''); }} 
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: 'none', color: !isLogin ? '#4facfe' : '#888', borderBottom: !isLogin ? '2px solid #4facfe' : 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: '0.3s' }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Alert Message Box */}
                {message && (
                    <div style={{ padding: '12px', marginBottom: '20px', borderRadius: '6px', backgroundColor: message.includes('successful') ? 'rgba(40, 167, 69, 0.15)' : 'rgba(220, 53, 69, 0.15)', color: message.includes('successful') ? '#4caf50' : '#ff5252', textAlign: 'center', fontSize: '14px', border: `1px solid ${message.includes('successful') ? '#4caf50' : '#ff5252'}` }}>
                        {message}
                    </div>
                )}
                
                {/* Auth Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            style={{ padding: '14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#252526', color: '#fff', fontSize: '15px', outline: 'none' }}
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ padding: '14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#252526', color: '#fff', fontSize: '15px', outline: 'none' }}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ padding: '14px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#252526', color: '#fff', fontSize: '15px', outline: 'none' }}
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        style={{ padding: '14px', marginTop: '10px', borderRadius: '8px', border: 'none', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, transition: '0.3s' }}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Secure Login' : 'Create Account')}
                    </button>
                </form>
            </div>
        </div>
    );
}