import axios from 'axios';

const loginUser = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5005/api/users/login', {
            email: email,
            password: password
        });

        if (response.status === 200) {
            // Clear any previous session data
            localStorage.removeItem('token');
            localStorage.removeItem('userData');

            // Store new token and user data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data));

            return { success: true, message: 'Login successful', token: response.data.token };
        }
    } catch (error) {
        if (error.response && error.response.data) {
            return { success: false, message: error.response.data.error || 'Something went wrong, please try again' };
        } else {
            return { success: false, message: 'Network error, please try again later' };
        }
    }
};

export default loginUser;


export const createWardrobe = async (token) => {
    try {
        const response = await axios.post('http://localhost:5005/api/wardrobe', {
            wardrobeName: "defaultwardrobe",
            visibility: "private"
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200 || response.status === 201) {
            console.log('Wardrobe created successfully:', response.data);
            return response.data; // Return the response data for further processing if needed
        } else {
            console.error('Failed to create wardrobe, unexpected status:', response.status);
            return null; // Return null or handle the error as needed
        }
    } catch (error) {
        console.error('Error creating wardrobe:', error.response ? error.response.data : error);
        return null; // Return null or handle the error as needed
    }
}