import { useTranslation } from 'react-i18next';
import Loading from "../shared/Loading";
import { useState } from "react";
import { ProjectRow } from './Project-row';
import { createProject } from '../../services/projects';


const ProjectsList = ({ admin, setSelectedProject, setEdit, user, setUser }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex-1 bg-[#d7e9e3] dark:bg-gray-800 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#3c6e71] dark:text-gray-200 mb-4">
                {t("projectList.title")}
            </h2>
            <table className="w-full border-collapse border border-[#a3c4bc] dark:border-gray-600">
                <thead>
                    <tr className="bg-[#a3c4bc] dark:bg-gray-700 text-[#204051] dark:text-gray-300">
                        <th className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left">
                            {t("projectList.projectName")}
                        </th>
                        <th className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left">
                            {t("projectList.status")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {user.projects &&
                        user.projects.map((project, index) => (
                            <ProjectRow
                                key={index}
                                project={project}
                                admin={admin}
                                setSelectedProject={setSelectedProject}
                                setEdit={setEdit}
                                user={user}
                                setUser={setUser}
                                setLoading={setLoading}
                            />
                        ))}
                </tbody>
            </table>
            <div className="flex mt-4">
                <button
                    className="h-10 px-4 py-2 bg-[#3c6e71] text-[#d7e9e3] rounded-lg hover:bg-[#2c5558] focus:outline-none focus:ring-2 focus:ring-[#a3c4bc] dark:bg-green-600 dark:text-white dark:hover:bg-green-700 transition duration-200"
                    onClick={async () => {
                        setLoading(true);
                        const updatedUser = await createProject(user)
                        setUser(updatedUser);
                        setLoading(false);
                    }}
                >
                    {t("projectList.newProject")}
                </button>
                {loading && <Loading size={50} />}
            </div>
        </div>
    );
};

export default ProjectsList;

