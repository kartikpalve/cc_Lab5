import { auth, googleProvider, githubProvider, db } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FaGoogle, FaGithub, FaUser, FaLock, FaEnvelope, FaPhone, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        phone,
        bio,
        createdAt: new Date()
      });
      setUser(user);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">{isLogin ? "Sign In" : "Register"}</h2>
        <form className="mt-6 space-y-4" onSubmit={isLogin ? handleEmailLogin : handleEmailRegister}>
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                required
                className="pl-10 border rounded w-full py-2 px-3"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              required
              className="pl-10 border rounded w-full py-2 px-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                className="pl-10 border rounded w-full py-2 px-3"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
          {!isLogin && (
            <div className="relative">
              <FaInfoCircle className="absolute left-3 top-3 text-gray-400" />
              <textarea
                className="pl-10 border rounded w-full py-2 px-3"
                placeholder="Short Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              required
              className="pl-10 border rounded w-full py-2 px-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isLogin ? "Sign In" : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
            {isLogin ? "Register here" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
