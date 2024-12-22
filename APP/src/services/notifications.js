import api from "./api";

export const deleteNotification = async (user, notificationId) => {
    try {
        const response = await api.post('/delete-notification', { email: user.email, notificationId });
        if (response && response.data) {
            return (response.data);
        }
        return user
    } catch (error) {
        return user
    }
};
