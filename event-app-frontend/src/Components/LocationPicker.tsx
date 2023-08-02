import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, LoadScript, Marker, MarkerF, useLoadScript} from "@react-google-maps/api";
import {TextField} from "@mui/material";
import Grid from "@mui/material/Grid";

const MapComponent = () => {
    const marker =
        {
            position: {
                lat: 44.4268,
                lng: 26.1025
            },
            label: {color: "red", text: "P"},
            draggable: true
        };
    const [currentLocation, setCurrentLocation] = useState({lat: 44.4268, lng: 26.1025});

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
    const [address, setAddress] = useState("");
    const geocoder = new window.google.maps.Geocoder();

    geocoder
        .geocode({location: currentLocation})
        .then((response) => {
            setAddress(response.results[0].formatted_address);
        })
        .catch((error) => {
            console.error(error);
        });
    return (
        <div>
            <TextField
                required
                id="outlined-required"
                label="Location"
                value={address}
                style={{width: "70%", marginBottom: "20px"}}
            />
            <TextField
                id="outlined-required"
                label="Location details"
                style={{width: "70%", marginBottom: "20px"}}
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
        </div>
    );
};
export default MapComponent;
