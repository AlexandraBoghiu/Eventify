import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel, Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

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

type SortOption = {
    label: string;
    value: string;
    sortFn: (a: Event, b: Event) => number;
};

const sortOptions: SortOption[] = [
    {
        label: "A-Z",
        value: "alphabetical",
        sortFn: (a: Event, b: Event) => a.name.localeCompare(b.name),
    },
    {
        label: "Z-A",
        value: "reverse_alphabetical",
        sortFn: (a: Event, b: Event) => b.name.localeCompare(a.name),
    }
];

interface CategoryProps {
    category: string;
}

function MyEvents() {

    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        const userEmail = new URLSearchParams();
        if (email !== null) {
            userEmail.append('email', email);
        }

        // Make the fetch request
        fetch("http://localhost:8081/user-event-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: userEmail?.toString(),
        }).then(async response => {
            const data = await response.json();
            console.log(data)
            setEvents(data);
        })
            .catch((error) => {
                console.log(error)
            });

    }, []);

    const filteredEvents = events.filter((event) => {
        const eventName = event.name.toLowerCase();
        const eventLocation = event.location.toLowerCase();
        const eventTags = event.tags.map((tag) => tag.toLowerCase());

        return (
            eventName.includes(searchTerm.toLowerCase()) ||
            eventLocation.includes(searchTerm.toLowerCase()) ||
            eventTags.includes(searchTerm.toLowerCase())
        );
    });
    const [selectedSortOption, setSelectedSortOption] = useState<string>(
        sortOptions[0].value
    );

    useEffect(() => {
        // sort the photos array based on the selected sort option
        const sortOption = sortOptions.find(
            (option) => option.value === selectedSortOption
        );
        if (sortOption) {
            setEvents([...events].sort(sortOption.sortFn));
        }
    }, [selectedSortOption]);

    const handleSortOptionChange = (event: SelectChangeEvent<string>) => {
        setSelectedSortOption(event.target.value);
    };

    return (
        <div style={{backgroundImage: 'url(/background.jpg)', height: '100vh'}}>
            <Navbar></Navbar>
            <h1>Saved events</h1>
            <TextField
                label="Search events"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{marginRight: '20px', marginTop: '20px', marginBottom: '20px'}}
                style={{width: "30%", backgroundColor: 'white'}}
            />
            <FormControl sx={{marginTop: '20px'}}>
                <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Age"
                    value={selectedSortOption}
                    onChange={handleSortOptionChange}
                    sx={{marginBottom: '20px'}}
                    style={{width: "100%", backgroundColor: 'white'}}
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                {filteredEvents.map((event, index) => (
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

export default MyEvents;