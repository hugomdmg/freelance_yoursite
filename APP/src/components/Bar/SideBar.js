import { useAuth } from "../../infraestructure/AuthContext";
import { deleteNotification } from "../../services/notifications.js";
import { useTranslation } from 'react-i18next';


const Sidebar = ({ isSidebarOpen }) => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();

  return (
    <aside
      className={`fixed top-16 left-0 w-64 h-screen bg-[#eaf1ef] text-[#204051] transform transition-transform duration-300 ease-in-out z-10 dark:text-white dark:bg-gray-900 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <nav className="p-4 space-y-4">
        <p className="text-lg font-semibold">{t('sidebar.notifications')}</p>
        <ul className="space-y-2">
          {user && Array.isArray(user.notifications) && user.notifications.length > 0 ? (
            user.notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span>
                  <strong>{notification.user}</strong>: {notification.type}
                </span>
                <button
                  onClick={async () => {
                    const updatedUser = await deleteNotification(user, notification.id);
                    setUser(updatedUser);
                  }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m4 0v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6h16zm5-4H3v2h18V2z"
                    />
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <p>{t('sidebar.noNotifications')}</p>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


