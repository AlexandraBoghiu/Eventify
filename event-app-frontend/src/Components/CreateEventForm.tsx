import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    Select,
    InputLabel,
    SelectChangeEvent,
    Chip,
    IconButton, Input, Card
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from 'dayjs';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import {TimeField, TimePicker} from "@mui/x-date-pickers";
import {MuiChipsInput} from 'mui-chips-input'
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import {toast, ToastContainer} from "react-toastify";


const CreateEventForm = () => {

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [startTimeValue, setStartTimeValue] = React.useState<Dayjs | null>(null);
    const [endTimeValue, setEndTimeValue] = React.useState<Dayjs | null>(null);
    const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(null);
    const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(null);
    const [error, setError] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState("");
    const [currentLocation, setCurrentLocation] = useState({lat: 44.4268, lng: 26.1025});
    const [locationDetails, setLocationDetails] = useState('');
    const [chips, setChips] = useState([]);
    const navigate = useNavigate();

    const marker =
        {
            position: {
                lat: 44.4268,
                lng: 26.1025
            },
            label: {color: "red", text: "P"},
            draggable: true
        };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    const center = currentLocation;
    const containerStyle = {
        width: "100%",
        height: "500px",
    }
    const markerDragEnd = (event: any) => {
        setCurrentLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }


    const geocodeMarker = () => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder
            .geocode({location: currentLocation})
            .then((response) => {
                setAddress(response.results[0].formatted_address);
                console.log(address)
            })
            .catch((error) => {
                console.error(error);
            });
    };
    geocodeMarker();
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    }

    const email = localStorage.getItem('email');
    const getUser = new URLSearchParams();
    if (email !== null) {
        getUser.append('email', email);
    }

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
            console.log(data.userName)
            setOrganizer(data.userName);
            //    } else {
            //    setError('Error. Please try again.')
            // }
        })
            .catch((error) => {
                console.log(error)
            });
    }, []);
    const handleCreateEvent = (e: any) => {
        e.preventDefault()

        const createEvent = {
            "name": name,
            "startTime": startTimeValue?.format("HH:mm"),
            "endTime": endTimeValue?.format("HH:mm"),
            "startDate": startDateValue,
            "endDate": endDateValue,
            "category": category,
            "description": description,
            "location": address,
            "organizer": organizer,
            "locationDetails": locationDetails,
            "tags": chips,
        }

      //  setSelectedFile(file);

        const formData = new FormData();
        formData.append('file', selectedFile!);
        formData.append('json', JSON.stringify(createEvent));

        fetch("http://localhost:8081/event", {
            method: "POST",
            // headers: {"Content-Type": "application/json"},
            body: formData

        }).then(async response => {
            const data = await response.text();
            console.log(createEvent)
            console.log(data)
            if (data === 'success') {
                toast.success("Your event was created successfully!", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                toast.error("Your event was not created! Please try again", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }


    const handleChangeChip = (newChips: any) => {
        setChips(newChips)
    }

    const [fileName, setFileName] = useState('');

    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
      //  if (event.target.files && event.target.files.length > 0) {
            //setSelectedFile(event.target.files[0]);
            //console.log(selectedFile);
       // }
    };

    return (
        <div className="event-form-background" style={{backgroundImage: 'url(/background.jpg)'}}>
            <Card style={{width: "98.5vw", backgroundColor: "transparent"}}>
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
                            <EventAvailableIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create an event
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleCreateEvent} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="event-name"
                                        name="name"
                                        required
                                        id="name"
                                        label="Name"
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                        style={{width: "70%", backgroundColor: 'white'}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider adapterLocale="ro" dateAdapter={AdapterDayjs}>
                                        <div style={{marginLeft: "30%", backgroundColor: 'white', width: "58%"}}>
                                            <DatePicker
                                                label="Start date"
                                                value={startDateValue}
                                                onChange={(newValue) => setStartDateValue(newValue)}
                                                format="DD-MM-YYYY"
                                                disablePast
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginLeft: "12%", backgroundColor: 'white', width: "58%"}}>
                                            <DatePicker
                                                label="End date"
                                                value={endDateValue}
                                                onChange={(newValue) => setEndDateValue(newValue)}
                                                format="DD-MM-YYYY"
                                                disablePast
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginLeft: "30%", backgroundColor: 'white', width: "58%"}}>

                                            <TimePicker
                                                label="Start time"
                                                value={startTimeValue}
                                                onChange={(newValue) => setStartTimeValue(newValue)}
                                                format="HH:mm"
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div style={{marginLeft: "12%", backgroundColor: 'white', width: "58%"}}>
                                            <TimePicker
                                                label="End time"
                                                value={endTimeValue}
                                                onChange={(newValue) => setEndTimeValue(newValue)}
                                                format="HH:mm"
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{width: "70%", backgroundColor: 'white'}}>
                                        <InputLabel id="demo-simple-select-label" required>Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Category"
                                            onChange={handleCategoryChange}
                                        >
                                            <MenuItem value={"arts"}>Arts</MenuItem>
                                            <MenuItem value={"charity"}>Charity</MenuItem>
                                            <MenuItem value={"comedy"}>Comedy</MenuItem>
                                            <MenuItem value={"concerts"}>Concerts</MenuItem>
                                            <MenuItem value={"conferences"}>Conferences</MenuItem>
                                            <MenuItem value={"festivals"}>Festivals</MenuItem>
                                            <MenuItem value={"food"}>Food</MenuItem>
                                            <MenuItem value={"gaming"}>Gaming</MenuItem>
                                            <MenuItem value={"movies"}>Movies</MenuItem>
                                            <MenuItem value={"online"}>Online</MenuItem>
                                            <MenuItem value={"others"}>Others</MenuItem>
                                            <MenuItem value={"pets"}>Pets</MenuItem>
                                            <MenuItem value={"product-launches"}>Product Launches</MenuItem>
                                            <MenuItem value={"sports"}>Sports</MenuItem>
                                            <MenuItem value={"theater"}>Theater</MenuItem>
                                            <MenuItem value={"travel"}>Travel</MenuItem>
                                            <MenuItem value={"workshops"}>Workshops</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div style={{marginLeft: "31%", backgroundColor: 'white'}}>
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={fileName ? fileName : 'Name of the image'}>
                                        </TextField>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <div style={{marginLeft: "30%", backgroundColor: 'white', width: "25%"}}>
                                        <input
                                            style={{display: 'none'}}
                                            id="contained-button-file"
                                            type="file"
                                            onChange={handleFileInputChange}
                                        />

                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">

                                                Upload
                                            </Button>
                                        </label></div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        style={{width: "70%", backgroundColor: 'white'}}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiChipsInput value={chips} onChange={handleChangeChip}
                                                   style={{width: "65%", backgroundColor: 'white'}}
                                                   label="Tags"/>
                                    <Tooltip
                                        title="Tags are relevant words that make your event easier to find by other users. e.g., football, Paris, League of Legends">
                                        <IconButton>
                                            <InfoIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Location"
                                        value={address}
                                        style={{width: "70%", marginBottom: "20px", backgroundColor: 'white'}}
                                    />
                                    <TextField
                                        id="outlined-required"
                                        label="Location details"
                                        style={{width: "70%", marginBottom: "20px", backgroundColor: 'white'}}
                                        onChange={(e) => setLocationDetails(e.target.value)}
                                    />
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={15}
                                    ><MarkerF //i came to know on local host we have to use MarkerF, and for online hosting use Marker.. this conflict is because of a react update.
                                        position={currentLocation}
                                        label={marker.label}
                                        draggable={marker.draggable}
                                        onDragEnd={(event) => markerDragEnd(event)}
                                    >
                                    </MarkerF>
                                    </GoogleMap>
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
                                        Create
                                    </Button>
                                </Grid> </Grid>
                        </Box>
                    </Box>
                </Container>
            </Card>
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
export default CreateEventForm;