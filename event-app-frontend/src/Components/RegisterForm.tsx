import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Dayjs} from 'dayjs';
import './RegisterForm.css';
import {toast} from "react-toastify";

const RegisterForm = () => {

    const [email, setEmail] = useState("");
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e: any) => {
        e.preventDefault()

        const userRegister = {
            "email": email,
            "userName": username,
            "password": password,
            "lastName": lastname,
            "firstName": firstname,
            "dateOfBirth": value?.format("DD/MM/YYYY").toString()
        }

        fetch("http://localhost:8081/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userRegister)

        }).then(async response => {

            const data = await response.text();
            if (data === 'true') {
                navigate("/login")
                localStorage.setItem('email', email)
                toast.success("Your account was created successfully!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                toast.error("Invalid fields! Please try again", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }
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
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleRegister} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date of birth"
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </LocalizationProvider>
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
                                > Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;