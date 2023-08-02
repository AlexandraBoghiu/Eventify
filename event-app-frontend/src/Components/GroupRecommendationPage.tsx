import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    TextField,
    Button,
    Box, Card, CardActionArea, CardContent
} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import {toast, ToastContainer} from "react-toastify";
import Groups2Icon from '@mui/icons-material/Groups2';
interface Event {
    eventId: number;
    name: string;
    creationDate: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
    locationDetails: string;
    organizer: string | null;
    imagePath: string;
    category: string;
    tags: string[];
}

const GroupRecommendationPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const [email3, setEmail3] = useState("");
    const [email4, setEmail4] = useState("");

    const email = localStorage.getItem('email');
    const getUser = new URLSearchParams();
    if (email !== null) {
        getUser.append('email', email);
    }
    const handleGetGroupRecommendation = (e: any) => {
        e.preventDefault()
        const email = localStorage.getItem('email');
        const userEmails = [email];
        if (email1 != "") userEmails.push(email1);
        if (email2 != "") userEmails.push(email2);
        if (email3 != "") userEmails.push(email3);
        if (email4 != "") userEmails.push(email4);
        console.log(userEmails);
        fetch("http://localhost:8081/recommend", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userEmails)
        }).then(async response => {
            const data = await response.json();
            console.log(data);
            setEvents(data);
            toast.success("Here are the suggestions for your group! Have fun", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
            .catch((error) => {
                console.log(error)
            });

    };

    return (
        <div className="event-form-background" style={{backgroundImage: 'url(/background.jpg)', height: '100vh'}}>
            <Navbar></Navbar>

            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#6b549c'}}>
                        <Groups2Icon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Group suggestions
                    </Typography>
                    <Typography component="h1" variant="h6" style={{color: "#5e5b64"}}>
                        Type up to 4 emails of your friends and find the best recommendations for your group
                    </Typography>
                    <Box component="form" onSubmit={handleGetGroupRecommendation} noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="first-user"
                                    name="first-user"
                                    id="first-user"
                                    label="First user email"
                                    autoFocus
                                    onChange={(e) => setEmail1(e.target.value)}
                                    style={{width: "70%", backgroundColor: 'white'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="second-user"
                                    name="second-user"
                                    id="second-user"
                                    label="Second user email"
                                    autoFocus
                                    onChange={(e) => setEmail2(e.target.value)}
                                    style={{width: "70%", backgroundColor: 'white'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="third-user"
                                    name="third-user"
                                    id="third-user"
                                    label="Third user email"
                                    autoFocus
                                    onChange={(e) => setEmail3(e.target.value)}
                                    style={{width: "70%", backgroundColor: 'white'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fourth-user"
                                    name="fourth-user"
                                    id="fourth-user"
                                    label="Fourth user email"
                                    autoFocus
                                    onChange={(e) => setEmail4(e.target.value)}
                                    style={{width: "70%", backgroundColor: 'white'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                >
                                    Get suggestions
                                </Button>
                            </Grid> </Grid>
                    </Box>
                </Box>
            </Container>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                {events.map((event, index) => (
                    <Card key={index} raised={true} style={{
                        width: "80%", height: '120px', marginTop: '20px', display: 'flex', borderRadius: '25px',
                        border: '2px solid #6b549c'
                    }}>
                        <img src={event.imagePath} style={{width: "200px", height: "120px"}}></img>
                        <CardActionArea style={{height: '100%'}}>
                            <Link to={`/event/${event.eventId}`} style={{color: "black", textDecoration: "none"}}>
                                <CardContent>
                                    <Typography component="div" sx={{
                                        marginBottom: "-30px",
                                        fontWeight: 300,
                                        fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
                                        textAlign: 'right'
                                    }}>
                                        {event.creationDate}
                                    </Typography>
                                    <Typography gutterBottom component="div" sx={{
                                        fontSize: '25px',
                                        fontWeight: 600,
                                        fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
                                    }}>
                                        {event.name}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{
                                        fontWeight: 500,
                                        fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
                                    }}>
                                        Location: {event.location}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{
                                        fontWeight: 500,
                                        fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
                                    }}>
                                        Starts
                                        on {event.startDate} at {event.startTime?.substring(0, event?.startTime.length - 3)}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>

                    </Card>

                ))}
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

    )
        ;
}
export default GroupRecommendationPage;