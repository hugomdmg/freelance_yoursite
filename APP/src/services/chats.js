import api from "./api";

const emptyChat = {
    user: null,
    messages: []
}

export const getMessages = async (user1, user2) => {
    try {
        const response = await api.post('/get-messages', { user1, user2 });

        if (response && response.data.messages) { return (response.data.messages); }
        if (!response) return emptyChat.messages
    } catch (error) {
        return emptyChat.messages
    }
};

export const sendMessage = async (inputMessage, emailUser1, emailUser2) => {
    if (inputMessage !== '') {
        const data = { emailUser1, emailUser2, message: inputMessage }
        await api.post('/send-message', data)
    }
};