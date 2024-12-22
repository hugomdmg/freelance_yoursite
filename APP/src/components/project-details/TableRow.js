const TableRow = ({ label, value, isEditable, onChange, type = "text", link }) => (
    <tr className="even:bg-[#eaf1ef] dark:even:bg-gray-700 odd:bg-[#d7e9e3] dark:odd:bg-gray-800">
        <td className="p-2 border border-[#a3c4bc] dark:border-gray-600 font-semibold text-[#204051] dark:text-gray-300">
            {label}
        </td>
        <td className="p-2 border border-[#a3c4bc] dark:border-gray-600">
            {isEditable ? (
                <input
                    type={type}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={value || ''}
                    className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                />
            ) : link ? (
                value ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3c6e71] dark:text-green-400 underline hover:text-[#2c5558] dark:hover:text-blue-500 transition"
                    >
                        {value}
                    </a>
                ) : (
                    <span className="text-[#2c5558] dark:text-green-500">No Link</span>
                )
            ) : (
                <span className="dark:text-gray-200">{value}</span>
            )}
        </td>
    </tr>
);

export default TableRow