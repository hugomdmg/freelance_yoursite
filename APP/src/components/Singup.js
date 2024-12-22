import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/users';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sign = async () => {
    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
      setTimeout(() => { setAlert(''); }, 4000);
      return;
    }

    let response = await signup(email, password)
    if (response.status === 201) {
      navigate('/login');
    } else if (response.status === 400) {
      setAlert(response.value);
      setTimeout(() => { setAlert(''); }, 4000);
    }
  };

  return (
    <div className="fixed w-full h-full flex flex-col items-center justify-center bg-[#d7e9e3] dark:bg-gray-900">
      <div className="bg-[#eaf1ef] dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-[#204051] dark:text-white mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                placeholder="Enter your password"
                className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-[#204051] dark:text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); }}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>

        <button
          type="submit"
          className="w-full bg-[#3c6e71] hover:bg-[#2c5558] text-[#d7e9e3] font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
          onClick={() => { sign(); }}
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-[#204051] dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-[#3c6e71] hover:underline dark:text-blue-500"
          >
            Login
          </a>
        </p>
      </div>
      <p className="text-red-500 px-4 py-2 rounded-md text-center">
        {alert}
      </p>
    </div>
  );
};

export default Signup;
