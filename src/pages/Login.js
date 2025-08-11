import React,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { saveToken } from '../utils/jwtUtils';
import './Auth.css';

const Login =() =>
{
    const [credentials,setCredentials]=useState({username: " ,password: "});
    const navigate = useNavigate();

    const handleChange =(e) =>
    {
        setCredentials({...credentials,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const res = await authService.login(credentials);
            saveToken(res.data.token);
            navigate('/dashboard');
        }
        catch(err)
        {
            alert('Login Failed');
        }
    };

    return (
        <div className ="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter Your username" 
                value={credentials.username} onChange={handleChange} required></input>

                <label>password</label>
                <input type="password" name="password" placeholder="Enter Your Password" 
                value={credentials.password} onChange={handleChange}required></input>

                <button type="submit">Login</button>

                <p className="link-text">
                    Dont have an acoount ? <Link to = "/register">Register here</Link>
                </p>
            </form>
        </div>
    );


};

export default Login;