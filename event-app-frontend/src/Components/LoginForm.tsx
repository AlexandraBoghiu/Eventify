import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {MuiThemeProvider} from "@material-ui/core";
import Container from "@mui/material/Container";

const theme = createTheme({
    palette: {
        primary: {
            main: '#C9CFEC', // set your primary color
        }
    }
});
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
            const data = await response.text();
            console.log(data);
            if (data === 'true') {
                navigate("/home")
                localStorage.setItem('email', email)
            } else {
                toast.error("Error Notification!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 20000
                })
            }
        })
            .catch((error) => {
                console.log(error)
            });
        const notify = () => {
            toast.error("Error Notification!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 20000
            })
        };
    }

    return (
        <MuiThemeProvider theme={theme}>
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
            </div>
        </MuiThemeProvider>
    );
}

export default LoginForm;