import axios from 'axios';

const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:5005/api/users/register', {
            username: username,
            email: email,
            password: password,
            seller: false,
            verified: false
        });

        if (response.status === 201 || response.status === 200) {
            return { success: true, message: 'Registration successful', data: response.data };
        }
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.error || 'Something went wrong, please try again' };
        } else {
            return { success: false, message: 'Network error, please try again later' };
        }
    }
};

export default registerUser;
