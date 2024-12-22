import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const backgroundImageUrl = 'images/people.jpg';

  const img = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 26, 46, 0.7)'
,
    zIndex: 0,
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4" style={img}>
      <div style={overlayStyle}></div>
      <div className="flex flex-col lg:flex-row text-center lg:text-left gap-12 items-start relative z-1">
        {/* Pricing Table */}
        <div className="w-full bg-[#3c6e71] dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-4xl font-semibold text-gray-800 dark:text-gray-300 p-6 border-b border-gray-300 dark:border-gray-700">
            {t("dashboard.table.title")}
          </h3>
          <table className="text-lg table-auto w-full text-left text-gray-300">
            <thead>
              <tr>
                <th className="p-4">{t("dashboard.table.columns.type")}</th>
                <th className="p-4">{t("dashboard.table.columns.price")}</th>
                <th className="p-4">{t("dashboard.table.columns.description")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">{t("dashboard.table.services.static")}</td>
                <td className="p-4">€300</td>
                <td className="p-4">{t("dashboard.table.services.staticDescription")}</td>
              </tr>
              <tr>
                <td className="p-4">{t("dashboard.table.services.simple")}</td>
                <td className="p-4">€600</td>
                <td className="p-4">{t("dashboard.table.services.simpleDescription")}</td>
              </tr>
              <tr>
                <td className="p-4">{t("dashboard.table.services.complex")}</td>
                <td className="p-4">€1000+</td>
                <td className="p-4">{t("dashboard.table.services.complexDescription")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Service Description */}
        <div className="w-full lg:w-2/3 text-gray-100 dark:text-blue-300 text-2xl space-y-6 text-justify">
          <p className="text-justify text-2xl leading-relaxed">
            {t("dashboard.intro")}
          </p>
          <p>
            {t('dashboard.explain1')}
          </p>
          <p>
            {t('dashboard.explain2')}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16 relative z-1 max-w-3xl">
        <h3 className="text-4xl font-semibold text-gray-100 dark:text-blue-300 mb-6">
          {t('dashboard.info')}

        </h3>
        <p className="text-2xl text-gray-100 dark:text-blue-300 mb-6">
          {t('dashboard.infotext.contact')}<span className="font-semibold text-gray-500">info@yoursite.com</span>{t('dashboard.infotext.or')}<a className="font-semibold text-blue-600" href='/signup'>{t('dashboard.infotext.link')}</a>{t('dashboard.infotext.details')}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

