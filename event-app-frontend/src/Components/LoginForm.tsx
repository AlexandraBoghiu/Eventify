import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Container from "@mui/material/Container";
import {toast, ToastContainer} from "react-toastify";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault()
        const userLogin = {"email": email, "password": password}
        fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userLogin)

        }).then(async response => {
            const session = await response.text();
            localStorage.setItem('session', session);
            if (session != 'KO') {
                toast.success("Welcome!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                navigate("/home")
                localStorage.setItem('email', email)

            } else {
                toast.error("Wrong email or password!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }).catch((error) => {
                console.log(error)
            });

        };

    return (
            <div className="background-image">
                <div className="overlay">
                    <div className="register-form-background">
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{m: 1, bgcolor: '#6b549c'}}>
                                    <LockOutlinedIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleLogin}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            /></Grid>
                                        <Grid item xs={12}> <FormControlLabel
                                            control={<Checkbox value="remember" style={{color: '#6b549c'}}/>}
                                            label="Remember me"
                                        />
                                        </Grid>
                                    </Grid>
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
                                    >Sign in
                                    </Button>

                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>

                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
    );
}

export default LoginForm;