import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../infraestructure/AuthContext';
import { sendPayment } from "../services/payment.js";

const PaymentPage = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { selectedProject } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        payment: selectedProject.missingPayment
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pago procesado exitosamente!");
    };


    return (
        <div className="fixed w-full h-full flex flex-col items-center justify-center bg-[#eaf1ef] dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-[#204051] dark:text-white mb-6 text-center">
                Realizar Pago
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Nombre completo */}
                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                    >
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ingrese su nombre completo"
                        required
                        className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Correo electrónico */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ingrese su correo electrónico"
                        required
                        className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="cardNumber"
                        className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                    >
                        Número de Tarjeta
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Ingrese el número de su tarjeta"
                        required
                        className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Fecha de expiración y CVV */}
                <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                        <label
                            htmlFor="expiryDate"
                            className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                        >
                            Fecha de Expiración
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex-1">
                        <label
                            htmlFor="cvv"
                            className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                        >
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="fullName"
                        className="block text-[#204051] dark:text-gray-300 text-sm font-bold mb-2"
                    >
                        Ingreso a realizar
                    </label>
                    <input
                        type="text"
                        id="payment"
                        name="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                        placeholder=""
                        required
                        className="w-full px-3 py-2 text-[#204051] dark:text-gray-200 bg-[#f5f7f6] dark:bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] dark:focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    onClick={() => { sendPayment(user, selectedProject, formData) }}
                    type="submit"
                    className="w-full bg-[#3c6e71] hover:bg-[#2c5558] text-[#d7e9e3] font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c6e71] focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
                >
                    Realizar Pago
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;


