import axios from 'axios'; // Ensure axios is imported here
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import containers from '../../CSS/containers.module.css';
import components from '../../CSS/components.module.css';
import { Link } from 'react-router-dom';
import registerUser from '../../../BackendIntegration/AxiosConnections/SignUp';  // Import registration logic
import loginUser from '../../../BackendIntegration/AxiosConnections/Login';  // Import login logic
import { addBulkCategories ,   createDefaultCollection} from '../../../BackendIntegration/AxiosConnections/OnSignUp'; // Import addBulkCategories function
import { createWardrobe } from '../../../BackendIntegration/AxiosConnections/Login'; // Import createWardrobe function

export default function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !email || !password || !retypePassword) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        if (password !== retypePassword) {
            setErrorMessage("Passwords don't match.");
            return;
        }

        try {
            console.log('Attempting to register user...');
            const result = await registerUser(username, email, password);

            // Check if registration was successful
            if (result.success) {
                setSuccessMessage('Account created successfully!');
                setErrorMessage('');
                console.log('Registration successful, now logging in...');
                // Proceed with login
                await runDatabaseOperations(email, password);
            } else {
                console.log('Registration failed, proceeding to login...');
                setErrorMessage(result.message);
                setSuccessMessage('');
                // Attempt login if registration failed
                await runDatabaseOperations(email, password);
            }
        } catch (error) {
            setErrorMessage('Error during registration: ' + error.message);
            console.error('Error during registration:', error);
        }
    };

    const runDatabaseOperations = async (email, password) => {
        console.log('Attempting login for user:', email);

        // Adding a 5-second delay before proceeding
        setTimeout(async () => {
            try {
                console.log('Attempting login...');
                // Using the loginUser function to handle the login process
                const loginResponse = await loginUser(email, password);

                if (loginResponse.success) {
                    console.log('Login successful!');
                    const token = loginResponse.token;
                    localStorage.setItem('token', token); // Store token after login
                    console.log('Token stored in localStorage:', token);

                    // Fetch user data to get userID
                    try {
                        const userResponse = await axios.get('http://localhost:5005/api/users/me', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        });

                        if (userResponse.data) {
                            const userID = userResponse.data.userID; // Store userID in a constant
                            console.log('User ID:', userID);

                            // Now call createWardrobe using the token
                            const wardrobeResponse = await createWardrobe(token);

                            // Log the full response for debugging
                            console.log('Wardrobe creation response:', wardrobeResponse);

                            // Log the wardrobe ID
                            if (wardrobeResponse && wardrobeResponse.wardrobeID) {
                                console.log('Wardrobe ID:', wardrobeResponse.wardrobeID);
                            }

                            if (wardrobeResponse) {
                                console.log('Default wardrobe created successfully!');
                                // Proceed with adding categories
                                await addBulkCategories(wardrobeResponse.wardrobeID);
                                const collectionResponse = await createDefaultCollection(token);
if (collectionResponse) {
    console.log('Default collection created:', collectionResponse);
} else {
    console.error('Failed to create default collection.');
}
                            } else {
                                console.error('Failed to create default wardrobe.');
                            }

                        } else {
                            console.error('Failed to fetch user data');
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error.message);
                    }

                } else {
                    console.error('Login failed:', loginResponse.message || 'Unknown error');
                    setErrorMessage('Login failed: ' + (loginResponse.message || 'Unknown error'));
                }

            } catch (error) {
                console.error('Error during login:', error.message);
                setErrorMessage('Error during login: ' + error.message);
            }
        }, 5000); // 5-second delay before logging in
    };

    return (
        <div className={containers.LoginContainer}>
            <img src={logo} alt="logo" className={components.logo} />
            <h1 className={components.title}>Fashonly</h1>

            <form onSubmit={handleSubmit} className={components.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={components['input-field']}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={components['input-field']}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={components['input-field']}
                    required
                />
                <input
                    type="password"
                    placeholder="Retype Password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className={components['input-field']}
                    required
                />
                <button type="submit" className={components['submit-btn']}>
                    Sign Up
                </button>
            </form>

            {errorMessage && <div className={components.errorMessage}>{errorMessage}</div>}
            {successMessage && <div className={components.successMessage}>{successMessage}</div>}

            <div className={components.footer}>
                <span>
                    Already have an account? <Link to='/login'>Log In</Link>
                </span>
            </div>
        </div>
    );
}
