import { auth, googleProvider, githubProvider } from "../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaGoogle, FaGithub, FaCode, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success('Logged in successfully!');
      navigate('/home');
    } catch (error) {
      console.error("Email login failed:", error);
      let errorMessage = 'Login failed';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Email Registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      console.error("Registration failed:", error);
      let errorMessage = 'Registration failed';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      toast.success('Logged in successfully with Google!');
      navigate('/home');
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error('Google login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub login
  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      toast.success('Logged in successfully with GitHub!');
      navigate('/home');
    } catch (error) {
      console.error("GitHub login failed:", error);
      toast.error('GitHub login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await auth.signOut();
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error('Logout failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden relative">
        {/* Top decorative border */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-75 backdrop-filter backdrop-blur-sm -z-10"></div>
        
        {/* Content container */}
        <div className="p-8">
          {user ? (
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-100 p-1 shadow-inner">
                  <img 
                    src={user.photoURL || 'default-avatar.png'} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-2 border-blue-500"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              
              <h2 className="mt-6 text-2xl font-bold text-gray-900">{user.displayName}</h2>
              <p className="mt-2 text-gray-600">{user.email}</p>
              
              <button
                onClick={handleLogout}
                className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : "Sign Out"}
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                  <FaCode className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {isLogin ? "Welcome back" : "Join us today"}
                </h2>
                <p className="text-gray-600 mb-8">
                  {isLogin 
                    ? "Sign in to access your account" 
                    : "Create an account to get started"}
                </p>
              </div>

              <form className="space-y-6" onSubmit={isLogin ? handleEmailLogin : handleEmailRegister}>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="appearance-none pl-10 rounded-lg block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      required
                      className="appearance-none pl-10 rounded-lg block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Remember me / Forgot password row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (isLogin ? "Sign in" : "Create account")}
                </button>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <FaGoogle className="mr-2 text-red-500" />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleGithubLogin}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </button>
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-medium text-blue-600 hover:text-blue-500 transition-all duration-300"
                  >
                    {isLogin ? "Need an account? Register" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;