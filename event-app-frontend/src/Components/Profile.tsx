import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import {Card, Chip, Paper} from "@mui/material";
import Invite from "./Invite";
import SimpleEventList from "./SimpleEventList";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


interface Event {
    eventId: number;
    name: string;
    creationDate: string; // assuming LocalDate is serialized as a string
    startDate: string; // assuming LocalDate is serialized as a string
    endDate: string; // assuming LocalDate is serialized as a string
    startTime: string; // assuming LocalTime is serialized as a string
    endTime: string; // assuming LocalTime is serialized as a string
    description: string;
    location: string;
    organizer: string;
    locationDetails: string;
    imagePath: string;
    category: string;
    tags: string[];
}

function ProfileFunction() {
    const email = localStorage.getItem('email');
    const getUser = new URLSearchParams();
    if (email !== null) {
        getUser.append('email', email);
    }
    const [events, setEvents] = useState<Event[]>([]);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    //const [email, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        fetch("http://localhost:8081/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: getUser?.toString()

        }).then(async response => {
            const data = await response.json();
            //  if (data === 'true') {
            setUsername(data.userName);
            setFirstname(data.firstName);
            setLastname(data.lastName);
            //setEmail(data.email);
            localStorage.setItem("name", data.userName.toString());
            localStorage.setItem("avatar", 'https://ui-avatars.com/api/name=' + data.userName + '&background=random');
            localStorage.setItem("userid", data.userId.toString());
            localStorage.setItem("firstname", data.firstName.toString());
            localStorage.setItem("lastname", data.lastName.toString());
            setUserId(data.userId);
            console.log('da');
            console.log('https://ui-avatars.com/api/name=' + data.userName + '&background=random');

        })
            .catch((error) => {
                console.log(error)
            });
  }, []);
    const nameee = localStorage.getItem('name')?.toString();
    const avatar = localStorage.getItem('avatar');
    const userid = localStorage.getItem('userid');
    // const email = localStorage.getItem('email');
    const firstnameee = localStorage.getItem('firstname');
    const lastnameeee = localStorage.getItem('lastname');
    const avatarPhoto = 'https://ui-avatars.com/api/name=' + username + '&background=random';

    const formData = new FormData();
    const recipient = email ? email : '';
    formData.append('userEmail', recipient);

    useEffect(() => {
        fetch("http://localhost:8081/event-organiser", {
            method: "POST",
            body: formData

        }).then(async response => {
            const data = await response.json();
            setEvents(data);
            console.log('nu');
            if (data === 'succes') {
                toast.success("Your invitation was sent successfully! Please check your email", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                toast.error("Your invitation was not send! Please try again", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        });
    }, []);

    return (
        <div style={{backgroundImage: 'url(/background.jpg)', height: "100%"}}>
            <Navbar></Navbar>
            <Container maxWidth="md" style={{marginTop: '50px', paddingBottom: '50px'}}>
                <Paper style={{
                    borderRadius: '25px',
                    border: '2px solid #6b549c', height: "900px"
                }}>
                    <Avatar
                        alt="User profile picture"
                        src={avatarPhoto}
                        sx={{width: 200, height: 200, margin: 'auto', marginTop: "10px", marginBottom: "10px"}}
                    />

                    <Typography component={'span'} variant="h4">
                        {nameee}
                    </Typography>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography component={'span'} variant="body1" align="center">
                                    <strong>Name</strong>
                                    <br/>
                                    {firstnameee} {lastnameeee}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={'span'} variant="body1" align="center">
                                    <strong>Email</strong>
                                    <br/>
                                    {email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    &nbsp;
                    <div>
                        <Grid item xs={6}>
                            <Typography component={'span'} variant="body1" align="center">
                                <strong>Events organized by this user</strong>
                                <br/>
                                <Card style={{width: "50%", marginLeft: "27%", marginRight: "4vw"}}>
                                    &nbsp;
                                    {events.map((event) => (
                                        <div key={event.eventId}>
                                            <Link to={`/event/${event.eventId}`} style={{color: "black", textDecoration: "none"}}>
                                            <SimpleEventList key={event.eventId} products={[
                                                {
                                                    id: event.eventId,
                                                    image: event.imagePath,
                                                    name: event.name
                                                }
                                            ]}
                                            ></SimpleEventList>
                                            </Link>
                                        </div>))
                                    }</Card>
                            </Typography>
                        </Grid>
                    </div>
                </Paper>
            </Container>
        </div>);
}

export default ProfileFunction;