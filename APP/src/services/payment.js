import api from "./api"


export const sendPayment = async (user, selectedProject, formData) => {
    await api.post('/make-payment', { email: user.email, projectId: selectedProject.id, paymentData: formData })
}