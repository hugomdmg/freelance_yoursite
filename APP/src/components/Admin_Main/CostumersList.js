import React from 'react';
import { useTranslation } from 'react-i18next';

const CostsumersList = ({ users, setSelectedCostumer, setSelectedProject }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#3c6e71] dark:text-gray-200">
          {t('costumersList.title')}
        </h2>
      </div>

      <table className="w-full border-collapse border border-[#a3c4bc] dark:border-gray-600">
        <thead>
          <tr className="bg-[#a3c4bc] dark:bg-gray-700 text-[#204051] dark:text-gray-300">
            <th className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left">
              {t('costumersList.headers.email')}
            </th>
            <th className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left">
              {t('costumersList.headers.pendingProjects')}
            </th>
            <th className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-left">
              {t('costumersList.headers.totalProjects')}
            </th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(users) ? users : []).map((costumer, index) => {
            if (costumer.roll !== 'admin') {
              let total = 0;
              costumer.projects.forEach(project => {
                if (project.status === 'Not Finished') {
                  total++;
                }
              });
              return (
                <tr
                  key={index}
                  className="even:bg-[#eaf1ef] dark:even:bg-gray-700 odd:bg-[#d7e9e3] dark:odd:bg-gray-800 hover:bg-[#c9dcd6] dark:hover:bg-gray-700"
                  onClick={() => {
                    setSelectedCostumer(costumer);
                    setSelectedProject(null);
                  }}
                >
                  <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-[#204051] dark:text-gray-300">
                    {costumer.email}
                  </td>
                  <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-[#204051] dark:text-gray-300">
                    {total}
                  </td>
                  <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 text-[#204051] dark:text-gray-300">
                    {costumer.projects.length}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default CostsumersList;
