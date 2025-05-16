import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../../../assets/logo.png'; 
import containers from '../../CSS/containers.module.css'; 
import components from '../../CSS/components.module.css'; 
import { Link } from 'react-router-dom'; 
import loginUser from '../../../BackendIntegration/AxiosConnections/Login'; // Import the loginUser function

export default function Login() {
    const navigate = useNavigate();

    // Use state to manage input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Handle the form submit
    const handleClick = async (event) => {
        event.preventDefault(); // Prevent form from submitting and causing page reload

        const result = await loginUser(email, password);  // Call the login function from login.js

        if (result.success) {
            // If login is successful, navigate to Home page
            navigate("/Home");
        } else {
            // If login failed, display error message
            setErrorMessage(result.message);
        }
    };

    return (
        <div className={containers.LoginContainer}>
            <img src={logo} alt="logo" className={components.logo} />
            <h1 className={components.title}>Fashonly</h1>

            <form onSubmit={handleClick} className={components.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email} // Set value to state
                    onChange={(e) => setEmail(e.target.value)} // Update state on input change
                    className={components['input-field']}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password} // Set value to state
                    onChange={(e) => setPassword(e.target.value)} // Update state on input change
                    className={components['input-field']}
                    required
                />
                <button type="submit" className={components['submit-btn']}>
                    Log In
                </button>
            </form>

            {errorMessage && <div className={components.errorMessage}>{errorMessage}</div>}

            <div className={components.footer}>
                <span>
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </span>
            </div>
        </div>
    );
}
