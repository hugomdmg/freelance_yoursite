import { deleteProject, changeStatus } from "../../services/projects";


export const ProjectRow = ({ project, admin, setSelectedProject, setEdit, user, setUser, setLoading }) => {
    const handleChangeStatus = async () => {
        if (admin) {
            setLoading(true);
            setUser(await changeStatus(project, user));
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setSelectedProject(null)
        const updatedUser = await deleteProject(project, user)
        setUser(updatedUser);
        setLoading(false);
    };

    return (
        <tr className="cursor-pointer even:bg-[#eaf1ef] dark:even:bg-gray-700 odd:bg-[#d7e9e3] dark:odd:bg-gray-800 hover:bg-[#c9dcd6] dark:hover:bg-gray-700">
            <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-[#204051] dark:text-gray-300 text-left align-middle">
                {project.name}
            </td>
            <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left align-middle flex items-center justify-between space-x-2">
                <button
                    onClick={handleChangeStatus}
                    className={`text-sm font-semibold ${project.status === 'Finished'
                        ? 'text-[#3c6e71] dark:text-green-400'
                        : 'text-[#9a3c3c] dark:text-red-400'
                        }`}
                >
                    {project.status}
                </button>
                <div className="flex space-x-1">
                    <ActionButton
                        onClick={() => { setEdit(false); setSelectedProject(project); }}
                        className="bg-green-500 hover:bg-blue-900 dark:bg-green-700 dark:hover:bg-blue-900"
                        path="M12 4.5C7.305 4.5 3.305 7.362 1.5 12c1.805 4.638 5.805 7.5 10.5 7.5s8.695-2.862 10.5-7.5c-1.805-4.638-5.805-7.5-10.5-7.5zm0 2c3.545 0 6.805 2.038 8.5 5-1.695 2.962-4.955 5-8.5 5s-6.805-2.038-8.5-5c1.695-2.962 4.955-5 8.5-5zm0 2.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
                    />

                    <ActionButton
                        onClick={() => { setEdit(true); setSelectedProject(project); }}
                        className="bg-yellow-500 hover:bg-blue-900 dark:bg-yellow-700 dark:hover:bg-blue-900"
                        path="M16.292 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-12 12a1 1 0 01-.293.207l-5 2a1 1 0 01-1.272-1.272l2-5a1 1 0 01.207-.293l12-12zM15 5.414L5.414 15 4 20l5-1.414L18.586 8 15 5.414zM19 4.414L17.586 3 20 5.414 19 4.414z"
                    />

                    <ActionButton
                        onClick={handleDelete}
                        className="bg-gray-900 hover:bg-red-900 dark:bg-red-900 dark:hover:bg-red-900"
                        path="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m4 0v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6h16zm5-4H3v2h18V2z"
                    />
                </div>
            </td>
        </tr>
    );
};


const ActionButton = ({ onClick, className, path }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-sm text-white rounded-md transition ${className}`}
    >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path d={path} />
        </svg>
    </button>
);
