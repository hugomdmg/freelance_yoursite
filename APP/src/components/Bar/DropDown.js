import { useNavigate } from 'react-router-dom';


export const DropDown = ({user, setDropdownOpen, handleNavigation, logout}) => {
        const navigate = useNavigate();
    
    return (
    <div
        className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded-md shadow-lg"
        onMouseLeave={() => setDropdownOpen(false)}
    >
        <ul className="py-1">
            <li>
                <button
                    onClick={() => handleNavigation(user.roll === 'admin' ? '/admin-main' : '/costumer-main')}
                    className="flex items-center px-4 py-2 text-sm text-[#204051] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    <Icon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.21 0-6 1.79-6 4v1h12v-1c0-2.21-3.79-4-6-4z" />
                    Profile
                </button>
            </li>
            <li>
                <button
                    onClick={() => handleNavigation('/account')}
                    className="flex items-center px-4 py-2 text-sm text-[#204051] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    <Icon path="M19 3h-4v2h3v12h-3v2h4c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zM5 3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2h-3v-12h3v-2h-4z" />
                    Account
                </button>
            </li>
            <li>
                <button
                    onClick={()=>{logout(); navigate('/login')}}
                    className="flex items-center px-4 py-2 text-sm text-[#204051] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    <Icon path="M12 2c1.1 0 2 .9 2 2v4h5v2h-7v7h-2v-7h-7v-2h5v-4c0-1.1.9-2 2-2z" />
                    Log out
                </button>
            </li>
        </ul>
    </div>
)
}

export const Icon = ({ path }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
        <path d={path} />
    </svg>
);