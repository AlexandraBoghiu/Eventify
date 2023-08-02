import {useParams} from 'react-router-dom';
import React, {MouseEventHandler, useEffect, useState} from "react";
import './Ambilight.css';
import {Card, CardContent, Chip, Divider, Grid, Menu, Rating, ToggleButton} from '@mui/material';
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import {CommentSection} from "react-comments-section";
import 'react-comments-section/dist/index.css';
import Popup from 'reactjs-popup';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

interface Comment {
    comId: string;
    eventId: string;
    userId: string; // assuming LocalDate is serialized as a string
    avatarUrl: string; // assuming LocalDate is serialized as a string
    userProfile: string; // assuming LocalDate is serialized as a string
    fullName: string; // assuming LocalTime is serialized as a string
    text: string; // assuming LocalTime is serialized as a string
    replies: undefined;
}

const containerStyle = {
    width: "100%",
    height: "500px",
}
const marker =
    {
        position: {
            lat: 44.4268,
            lng: 26.1025
        },
        label: {color: "red", text: "P"},
        draggable: false
    };


function EventDetails() {
    const {eventId} = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [organizer, setOrganizer] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [center, setCenter] = useState({
        lat: 44.4268,
        lng: 26.1025
    });
    const [isFilled, setIsFilled] = useState(false); // State to keep track of icon status
    const geocoder = new window.google.maps.Geocoder();
    geocoder
        .geocode({address: event?.location})
        .then((response) => {
                var latitude = response.results[0].geometry.location.lat();
                var longitude = response.results[0].geometry.location.lng();
                setCenter({
                    lat: latitude,
                    lng: longitude
                });
            }
        );

    useEffect(() => {
        fetch(`http://localhost:8081/event/${eventId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }).then(async response => {
            const respData = await response.json();
            console.log(data);
            setEvent(respData);

        }).catch(error => {
            console.log(error);
        });
    }, [eventId]);

    const email = localStorage.getItem('email');
    const getUser = new URLSearchParams();
    if (email !== null) {
        getUser.append('email', email);
    }

    const getRating = {
        "email": email,
        "eventId": eventId,
        "rating": 0
    }
    useEffect(() => {
        fetch("http://localhost:8081/rating-value", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(getRating)

        }).then(async response => {
            console.log(getRating.email)
            console.log(getRating.eventId)
            const data = await response.text();
            console.log("DAAAAAAAAAAAA" + data)
            setRating(parseInt(data));
        })
            .catch((error) => {
                console.log(error)
            });
    });

    //const [organizer, setOrganizer] = useState("");
    //  useEffect(() => {
    fetch("http://localhost:8081/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getUser?.toString()

    }).then(async response => {
        const data = await response.json();
        //  if (data === 'true') {
        setName(data.userName.toString());
        localStorage.setItem("name", data.userName.toString());
        localStorage.setItem("avatar", 'https://ui-avatars.com/api/name=' + data.userName + '&background=random');
        localStorage.setItem("userid", data.userId.toString());
        setUserId(data.userId);
        console.log('https://ui-avatars.com/api/name=' + data.userName + '&background=random');

    })
        .catch((error) => {
            console.log(error)
        });
    //  }, []);

    const nameee = localStorage.getItem('name');
    const avatar = localStorage.getItem('avatar');
    const userid = localStorage.getItem('userid');
    useEffect(() => {
        const checkEventStatus = {
            "eventId": eventId,
            "email": localStorage.getItem("email")
        }

        fetch("http://localhost:8081/user-eventstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkEventStatus)

        }).then(async response => {
            const data = await response.text();
            if (data == "OK") {
                setIsFilled(true);
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }, []);
    //(e: React.MouseEvent<HTMLButtonElement>)
    const handleSaveRating = (a: any) => {
        // e.preventDefault()
        const saveRating = {
            "email": email,
            "eventId": eventId,
            "rating": a
        }
        console.log(saveRating.rating)
        fetch("http://localhost:8081/rating", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(saveRating)

        }).then(async response => {
            console.log(saveRating.email)
            console.log(saveRating.eventId)
            const data = await response.text();
            if (data === 'true') {

            } else {
                //  setError('Used email or username, please try again.')
            }
        })
            .catch((error) => {
                console.log(error)
            });
    }
    const handleGetRating = (a: any) => {
        const getRating = {
            "email": email,
            "eventId": eventId,
            "rating": 0
        }
        fetch("http://localhost:8081/rating-value", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(getRating)

        }).then(async response => {
            console.log(getRating.email)
            console.log(getRating.eventId)
            const data = await response.text();
            if (data === 'true') {

            } else {
                //  setError('Used email or username, please try again.')
            }
        })
            .catch((error) => {
                console.log(error)
            });

    }
    const handleHeartClick = (e: any) => {
        e.preventDefault()
        const createEvent = {
            "eventId": eventId,
            "email": localStorage.getItem("email")
        }
        if (isFilled) {

            fetch("http://localhost:8081/user-event", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createEvent)

            }).then(async response => {
                const data = await response.text();
                setIsFilled(!isFilled);
            })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            fetch("http://localhost:8081/user-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createEvent)

            }).then(async response => {
                const data = await response.text();
                setIsFilled(!isFilled);
            })
                .catch((error) => {
                    console.log(error)
                });
        }
    };

    const handleCalendarInvitation = (e: any) => {
        e.preventDefault()

        const createEvent = {
            "name": event?.name,
            "startTime": event?.startTime,
            "endTime": event?.endTime,
            "startDate": event?.startDate,
            "endDate": event?.endDate,
            "category": event?.category,
            "description": event?.description,
            "location": event?.location,
            "organizer": event?.organizer,
            "locationDetails": event?.locationDetails,
        }

        const formData = new FormData();
        const email = localStorage.getItem("email");
        const recipient = email ? email : '';
        formData.append('recipient', recipient);
        formData.append('json', JSON.stringify(createEvent));

        fetch("http://localhost:8081/sendCalendarInvite", {
            method: "POST",
            body: formData

        }).then(async response => {
            const data = await response.text();
            console.log(createEvent)
            console.log(data)
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
        })
            .catch((error) => {
                console.log(error)
            });
    };

    // const initialData: Comment[] = [
    //     {
    //         comId: "1",
    //         eventId: "123",
    //         userId: "user123",
    //         avatarUrl: "https://example.com/avatar.png",
    //         userProfile: "https://example.com/user-profile",
    //         fullName: "John Doe",
    //         text: "This is a comment.",
    //         replies: undefined,
    //     },
    // ];
     const [data, setData] = useState<Comment[]>([]);
    // const data = [
    //     {
    //         userId: '01a',
    //         comId: '012',
    //         fullName: 'Riya Negi',
    //         avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
    //         userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
    //         text: 'Hey, Loved your blog! ',
    //         replies :[]
    //     }
    // ];
    const handleCommentList = () => {
        console.log(eventId);
        //  useEffect(() => {
        fetch(`http://localhost:8081/comment-list/${eventId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async response => {
            const responseList = await response.json();
                setData(responseList);
              //  console.log(`http://localhost:8081/comment-list/${eventId}`);
              console.log(data.toString())
            console.log(responseList)
        })
            .catch((error) => {
                console.log(error)
            });
        //  });
    }
    const handleCommentEvent = (comment: any) => {

        const formData = new FormData();
        formData.append('eventId', eventId!.toString());
        formData.append('json', JSON.stringify(comment));

        fetch('http://localhost:8081/comment', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                handleCommentList();
                console.log(comment); // This will log the response from the server
            })
            .catch(error => {
                console.error(error);
            });
    }

    const notify = () => {
        toast.success("Your invitation was sent successfully!", {
            position: toast.POSITION.BOTTOM_CENTER
        });

    }

    return (
        <div>

            <div onClick={handleCommentList} style={{backgroundImage: 'url(/background.jpg)', height: '120vh'}}>
                <div onClick={handleGetRating}>
                    <Navbar></Navbar>
                    <Card style={{width: "98.5vw", backgroundColor: "transparent", marginBottom: "40px"}}>
                        <div className="ambilight">
                            <img src={event?.imagePath} alt="Image" className="image"/>
                            <img src={event?.imagePath} alt="" className="light"/>
                        </div>
                        <AppBar position="static"
                                sx={{backgroundColor: 'white', height: "60px", marginTop: "10px", width: "98.5vw"}}>
                            <Toolbar style={{backgroundImage: 'url(/background.jpg)'}}>
                                <div style={{marginLeft: 'auto', display: 'flex'}}>
                                    <Rating style={{marginTop: '10px', display: 'flex'}}
                                            name="size-large" defaultValue={rating!}
                                            value={rating}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                                handleSaveRating(newValue);
                                            }}
                                    />

                                    &nbsp;&nbsp;&nbsp;
                                    <ToggleButton style={{
                                        backgroundColor: 'white',
                                        border: '2px solid #6b549c',
                                    }}
                                                  value="check">
                                        <div onClick={handleCalendarInvitation}>
                                            <EventIcon style={{color: 'black'}}/>
                                        </div>
                                    </ToggleButton>
                                    &nbsp;&nbsp;&nbsp;
                                    <ToggleButton style={{
                                        backgroundColor: 'white',
                                        border: '2px solid #6b549c',
                                    }}
                                                  value="check"
                                    >
                                        <div onClick={handleHeartClick}>
                                            {isFilled ? (
                                                <FavoriteIcon style={{color: 'red'}}/>
                                            ) : (
                                                <FavoriteBorderIcon style={{color: 'gray'}}/>
                                            )}
                                        </div>
                                    </ToggleButton>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Card>
                </div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: "2vw"}}>
                        <div>

                            <Card style={{
                                width: "25vw", maxHeight: "50vh", marginLeft: "4vw", borderRadius: '25px',
                                border: '2px solid #6b549c'
                            }}
                                  raised={true}>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={15}
                                ><MarkerF //i came to know on local host we have to use MarkerF, and for online hosting use Marker.. this conflict is because of a react update.
                                    position={center}
                                    label={marker.label}
                                    draggable={marker.draggable}
                                >
                                </MarkerF>
                                </GoogleMap>
                            </Card>
                        </div>
                        <Card style={{
                            width: "30vw", borderRadius: '25px',
                            border: '2px solid #6b549c'
                        }} raised={true}>
                            <Grid item xs={12} sm={10}>
                                <CardContent>
                                    <Typography component={'span'} variant="h4" gutterBottom
                                                style={{fontWeight: '750', fontSize: '50px', marginBottom: '50px'}}>
                                        {event?.name}
                                    </Typography>
                                    <Typography component={'span'} variant="body1" color="text.secondary" gutterBottom
                                                style={{display: 'flex', justifyContent: 'left'}}>
                                        <LocationOnIcon></LocationOnIcon>&nbsp;{event?.location}, {event?.locationDetails}
                                    </Typography>
                                    <Typography component={'span'} variant="body1" color="text.secondary" gutterBottom
                                                style={{display: 'flex', justifyContent: 'left'}}>
                                        <CalendarTodayIcon></CalendarTodayIcon>&nbsp;{event?.startDate} at {event?.startTime.substring(0, event?.startTime.length - 3)} until {event?.endDate} at {event?.endTime.substring(0, event?.endTime.length - 3)}
                                    </Typography>
                                    <Typography component={'span'} variant="body1" color="text.secondary" gutterBottom
                                                style={{display: 'flex', justifyContent: 'left', textAlign: 'left'}}>
                                        <DescriptionIcon></DescriptionIcon>&nbsp;{event?.description}
                                    </Typography>
                                    <Typography component={'span'} variant="body1" color="text.secondary" gutterBottom
                                                style={{display: 'flex', justifyContent: 'left', textAlign: 'left'}}>
                                        <LocalOfferIcon></LocalOfferIcon>&nbsp;
                                        <Chip style={{backgroundColor: '#816dab'}} label={event?.category}
                                              sx={{marginRight: 1}}/>
                                        {event?.tags.map((tag, index) => (
                                            <Chip key={index} style={{backgroundColor: '#816dab'}} label={tag}
                                                  sx={{marginRight: 1}}/>
                                        ))}</Typography>
                                    <Typography component={'span'} variant="body2" color="text.secondary" gutterBottom
                                                sx={{marginTop: 3}}>
                                        Created on: {event?.creationDate} by {event?.organizer}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Card>
                        <Card style={{
                            marginRight: "3vw", width: "34vw", borderRadius: '25px',
                            border: '2px solid #6b549c'
                        }} raised={true}>
                            <CommentSection overlayStyle={{
                                backgroundColor: 'white', position: "absolute",
                                top: '467px',
                                left: '64.3%',
                                right: '0.5vw',
                                maxHeight: '47%',
                                maxWidth: '90%',
                                overflow: 'auto',
                                borderRadius: '50px',
                                marginRight: "3vw",
                                marginTop: '19px'
                            }}
                                            formStyle={{backgroundColor: 'rgba(107,84,156,0.26)'}}
                                            submitBtnStyle={{
                                                backgroundColor: '#6b549c', fontSize: '12px',
                                                borderStyle : '#6b549c',
                                                padding: '5px 10px'
                                            }}

                                            cancelBtnStyle={{
                                                fontSize: '12px',
                                                padding: '5px 10px'
                                            }}
                                            currentUser={{
                                                currentUserId: userid!,
                                                currentUserImg:
                                                    avatar!,
                                                currentUserProfile:
                                                    '',
                                                currentUserFullName: nameee!
                                            }}
                                            logIn={{
                                                loginLink: 'http://localhost:3001/',
                                                signupLink: 'http://localhost:3001/'
                                            }}
                                            commentData={data}
                                            onSubmitAction={(data: {
                                                userId: string
                                                comId: string
                                                avatarUrl: string
                                                userProfile?: string
                                                fullName: string
                                                text: string
                                                replies: any
                                                commentId: string

                                            }) => handleCommentEvent(data)}
                                            currentData={(data: any) => {
                                                console.log('curent data', data)
                                            }}
                            />

                        </Card>

                    </div>
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

export default EventDetails;
