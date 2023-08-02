import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";


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

function RecommendationPage() {

    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        const userEmails = [email];

        fetch("http://localhost:8081/recommend", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userEmails)
        }).then(async response => {
            const data = await response.json();
            console.log(data)
            setEvents(data);
        })
            .catch((error) => {
                console.log(error)
            });

    }, []);
    return (
        <div style={{backgroundImage: 'url(/background.jpg)', height: '100vh'}}>
            <Navbar></Navbar>
            <h1>Your suggestions</h1>
            <TextField
                label="Search categories by name"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{marginRight: '20px', marginTop: '20px', marginBottom: '20px'}}
                style={{width: "30%", backgroundColor: 'white'}}
            />
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
        </div>
    );
}

export default RecommendationPage;