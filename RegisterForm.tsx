import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, User, Building2 } from 'lucide-react';
import { RegistrationData, UserRole } from '../../types/auth';
import { useAuthStore } from '../../store/authStore';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);
  const [role, setRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    regNo: '',
    section: '',
    isHosteler: false,
    clubId: '',
    university: '',
    teamSize: '',
    owner: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const registrationData: RegistrationData = {
        role,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        ...(role === 'student' && {
          regNo: formData.regNo,
          section: formData.section,
          isHosteler: formData.isHosteler,
        }),
        ...(role === 'club' && {
          clubId: formData.clubId,
          university: formData.university,
          teamSize: parseInt(formData.teamSize),
          owner: formData.owner,
        }),
      };

      await register(registrationData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <Clock className="w-12 h-12 mx-auto text-[#a87b00] mb-4" />
          <h1 className="text-3xl font-bold text-[#a87b00] mb-2">Join Timeless Odyssey</h1>
          <p className="text-gray-600">Begin your journey through the ages</p>
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

          {/* Common Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Student-specific fields */}
          {role === 'student' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isHosteler"
                  checked={formData.isHosteler}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#a87b00] focus:ring-[#a87b00] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I am a hosteler
                </label>
              </div>
            </div>
          )}

          {/* Club-specific fields */}
          {role === 'club' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club ID
                </label>
                <input
                  type="text"
                  name="clubId"
                  value={formData.clubId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Size
                </label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club Owner
                </label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#a87b00] text-white rounded-lg font-medium hover:bg-[#8b6500] focus:outline-none focus:ring-2 focus:ring-[#a87b00] focus:ring-offset-2 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#a87b00] hover:text-[#8b6500] font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;