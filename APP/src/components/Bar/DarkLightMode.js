import { useState, useEffect } from "react";

const DarkLightMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDarkMode(savedTheme === "dark");
        document.documentElement.classList.add(savedTheme);
    }, []);

    return (
        <>
            <button
                onClick={toggleDarkMode}
                className="px-1 py-0 rounded-md bg-[#204051] text-[#d7e9e3] hover:bg-[#2c5558] dark:bg-gray-500 dark:text-black dark:hover:bg-gray-400"
            >
                {isDarkMode ? "☀️" : "🌙"}
            </button>
        </>

    )
}

export default DarkLightMode