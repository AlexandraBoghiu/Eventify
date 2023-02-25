import React from 'react';
import './FrontPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";

const FrontPage = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/register")
    };
    const handleLogin = () => {
        navigate("/login")
    };
    return (
        <div className="background-image">
            <div className="overlay">
                <p className="app-name">Event app</p>
                <p className="description"> lorem ipsum ceva bla bla bla bla bla</p>
                <div className="button-container">
                    <Button
                        type="submit"
                        size='medium'
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: '#6b549c',
                            '&:hover': {
                                backgroundColor: '#3a2d57',
                            }
                        }}
                        onClick={handleRegister}>Register</Button>
                    <Button
                        type="submit"
                        size='medium'
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: '#6b549c',
                            '&:hover': {
                                backgroundColor: '#3a2d57',
                            }
                        }}
                        onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
