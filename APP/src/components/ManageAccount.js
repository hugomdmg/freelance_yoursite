import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './shared/Loading';
import { useAuth } from "../infraestructure/AuthContext";
import { updateAccount, deleteAccount } from '../services/users';

const ManageAccount = () => {
  const { user, authLogin, logout } = useAuth();

  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [prevEmail, setPrevEmail] = useState(user?.email || '')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
      setTimeout(() => setAlert(''), 4000);
      return;
    }

    setLoading(true);
    const response = await updateAccount(prevEmail, email, password);
    if (response.status === 200) {
      authLogin(response.data);
      setAlert('Account updated successfully');
      setTimeout(() => { setAlert(''); navigate('/login') }
        , 4000);
    } else {
      setAlert(response.value || 'Error updating account');
      setTimeout(() => setAlert(''), 4000);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);
      const response = await deleteAccount(email, password);
      if (response.status === 200) {
        logout();
        navigate('/login');
      } else {
        setAlert(response.value || 'Error deleting account');
        setTimeout(() => setAlert(''), 4000);
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed w-full h-full flex flex-col items-center justify-center bg-[#d7e9e3] dark:bg-gray-900">
      <div className="bg-[#eaf1ef] dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-[#204051] dark:text-white mb-6 text-center">Manage Account</h2>
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your new email"
              className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </form>

        <button
          type="button"
          className="w-full bg-[#3c6e71] hover:bg-[#2c5558] text-[#d7e9e3] font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 mb-4"
          onClick={handleUpdate}
        >
          Update Account
        </button>

        <button
          type="button"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>

      <p className="text-red-500 px-4 py-2 rounded-md text-center">{alert}</p>
      {loading && <Loading size={120} />}
    </div>
  );
};

export default ManageAccount;
