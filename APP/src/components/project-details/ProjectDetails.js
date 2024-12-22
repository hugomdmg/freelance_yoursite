import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Loading from "../shared/Loading";
import { useState } from "react";
import { updateProject } from "../../services/projects";
import TableRow from './TableRow';


const ProjectDetails = ({ admin, user, setUser, setSelectedProject, selectedProject, edit, setEdit }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const formatDates = selectedProject.dates.join(' .. ');

    const deleteDate = async (date) => {
        const index = selectedProject.dates.indexOf(date)
        selectedProject.dates.splice(index, 1)
        setLoading(true)
        const updatedUser = await updateProject(selectedProject, user)
        setUser(updatedUser)
        setLoading(false)
    }

    return (
        <div className="flex-1 bg-[#d7e9e3] dark:bg-gray-800 shadow-md rounded-lg p-8">
            {!edit ? (<h2 className="text-2xl font-bold text-[#3c6e71] dark:text-white mb-4">
                {selectedProject.name}
            </h2>) : (
                <input
                    type="text"
                    id="name"
                    value={selectedProject.name}
                    onChange={(e) => { setSelectedProject({ ...selectedProject, name: e.target.value }) }}
                    placeholder={selectedProject.name}
                    className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                />
            )}
            <table className="w-full border-collapse border border-[#a3c4bc] dark:border-gray-600 text-left">
                <tbody>
                    <TableRow
                        label={t("projectDetails.productionLink")}
                        value={selectedProject.link}
                        isEditable={edit}
                        onChange={(value) => setSelectedProject({ ...selectedProject, link: value })}
                        link
                    />
                    {(edit) ?
                        (
                            <tr className="even:bg-[#eaf1ef] dark:even:bg-gray-700 odd:bg-[#d7e9e3] dark:odd:bg-gray-800">

                                <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 font-semibold text-[#204051] dark:text-gray-300">
                                    {t("projectDetails.nextMeeting")}
                                </td>
                                <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 dark:text-gray-200">
                                    {selectedProject.dates.map((date, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className="px-1 py-1 m-0.5 bg-transparent dark:text-gray-300 text-[#3c6e71] border-2 border-[#3c6e71] rounded-lg hover:bg-red-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#204051] transition-all duration-300"
                                                onClick={() => { deleteDate(date) }}>
                                                {date}
                                            </button>
                                        )
                                    })}

                                </td>
                            </tr>
                        )
                        :
                        (
                            <TableRow
                                label={t("projectDetails.nextMeeting")}
                                value={formatDates}
                                isEditable={false}
                            />
                        )
                    }
                    {(!edit || !admin) ?
                        (
                            <tr className="even:bg-[#eaf1ef] dark:even:bg-gray-700 odd:bg-[#d7e9e3] dark:odd:bg-gray-800">

                                <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 font-semibold text-[#204051] dark:text-gray-300">
                                    {t("projectDetails.pendingPayment")}
                                </td>
                                <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 dark:text-gray-200">
                                    ${selectedProject.missingPayment}{' '}
                                    {!admin &&
                                        (<button
                                            onClick={() => { navigate('/payment', { state: { selectedProject: selectedProject } }); }}
                                            className="ml-2 px-4 py-2 bg-[#3c6e71] text-[#d7e9e3] rounded-lg hover:bg-[#2c5558] dark:bg-blue-600 dark:hover:bg-blue-700 transition"
                                            href="/payment"
                                        >
                                            {t("projectDetails.makePayment")}
                                        </button>)}
                                </td>
                            </tr>
                        )
                        :
                        (
                            <TableRow
                                label={t("projectDetails.pendingPayment")}
                                value={`${selectedProject.missingPayment}`}
                                isEditable={edit}
                                onChange={(value) => setSelectedProject({ ...selectedProject, missingPayment: value })}

                            />
                        )
                    }
                    <TableRow
                        label={t("projectDetails.totalPaid")}
                        value={`$${selectedProject.totalPaid}`}
                    />
                    <TableRow
                        label={t("projectDetails.trelloLink")}
                        value={selectedProject.trelloLink}
                        isEditable={edit}
                        onChange={(value) => setSelectedProject({ ...selectedProject, trelloLink: value })}
                        link
                    />
                </tbody>
            </table>

            {edit && (
                <div className="flex items-center gap-4">
                    <button
                        className="h-10 flex items-center justify-center h-12 px-4 py-2 bg-[#3c6e71] text-[#d7e9e3] rounded-lg hover:bg-[#2c5558] focus:outline-none focus:ring-2 focus:ring-[#a3c4bc] dark:bg-green-600 dark:text-white dark:hover:bg-green-700 transition duration-200"
                        onClick={async () => {
                            setLoading(true)
                            const updatedUser = await updateProject(selectedProject, user)
                            setUser(updatedUser);
                            setEdit(false)
                            setLoading(false)
                        }}
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 mr-2"
                        >
                            <path d="M17 3H7C5.895 3 5 3.895 5 5v14c0 1.105.895 2 2 2h10c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zm-5 16c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm3-10H8V6h7v3z" />
                        </svg>
                        Guardar
                    </button>

                    {loading && <Loading size={50} />}
                </div>
            )}

        </div>
    );
};

export default ProjectDetails;

