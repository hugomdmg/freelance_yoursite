import React from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
    const { i18n } = useTranslation();
    const changeLanguage = (lang) => { i18n.changeLanguage(lang) }

    return (
        <div className="flex">
            <button
                onClick={() => changeLanguage("en")}
                className={`px-1 py-0 ${i18n.language === "en"
                    ? "bg-[#2c5558] text-white"
                    : "bg-gray-800 text-[#d7e9e3] hover:bg-[#2c5558]"
                    }`}
            >
                En
            </button>
            <button
                onClick={() => changeLanguage("es")}
                className={`px-1 py-0 ${i18n.language === "es"
                    ? "bg-[#2c5558] text-white"
                    : "bg-gray-800 text-[#d7e9e3] hover:bg-[#2c5558]"
                    }`}
            >
                Es
            </button>
        </div>
    );
};

export default Language
