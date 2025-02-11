import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, User, Building2 } from 'lucide-react';
import { LoginCredentials, UserRole } from '../../types/auth';
import { useAuthStore } from '../../store/authStore';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [role, setRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ identifier, password, role });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <Clock className="w-12 h-12 mx-auto text-[#a87b00] mb-4" />
          <h1 className="text-3xl font-bold text-[#a87b00] mb-2">Welcome to Timeless Odyssey</h1>
          <p className="text-gray-600">Embark on an eternal journey through time</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-4 rounded-lg ${
                role === 'student'
                  ? 'bg-[#a87b00] text-white'
                  : 'bg-gray-100 text-gray-600'
              } flex flex-col items-center justify-center transition-all hover:shadow-md`}
            >
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('club')}
              className={`p-4 rounded-lg ${
                role === 'club'
                  ? 'bg-[#a87b00] text-white'
                  : 'bg-gray-100 text-gray-600'
              } flex flex-col items-center justify-center transition-all hover:shadow-md`}
            >
              <Building2 className="w-6 h-6 mb-2" />
              <span className="text-sm">Club</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-4 rounded-lg ${
                role === 'admin'
                  ? 'bg-[#a87b00] text-white'
                  : 'bg-gray-100 text-gray-600'
              } flex flex-col items-center justify-center transition-all hover:shadow-md`}
            >
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm">Admin</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {role === 'student' ? 'Registration Number' : 'Club ID'}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
              placeholder={role === 'student' ? 'Enter reg number' : 'Enter club ID'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#a87b00] text-white rounded-lg font-medium hover:bg-[#8b6500] focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#a87b00] hover:text-[#8b6500] font-medium"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;