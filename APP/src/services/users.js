import api from './api'


export const fetchUsers = async () => {
    try {
        const response = await api.get('/users');

        if (response) {
            return response
        } else {
            console.warn('No data found in response:', response);
            return []
        }
    } catch (err) {
        console.error("Error fetching users:", err)
        return [];
    }
};


export const login = async (email, password, authLogin) => {
    let response = await api.post('/login', { email, password });
    if (response.status === 200) {
        authLogin(response.data)
    }
    return response
};

export const signup = async (email, password) => {
    let response = await api.post('/register', { email, password });
    return response
};

export const updateAccount = async (prevEmail, email, password) => {
    let response = await api.post('/update-account', { prevEmail, email, password });
    return response
};


export const deleteAccount = async (email, password) => {
    let response = await api.post('/delete-account', { email, password });
    return response
};