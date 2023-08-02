import React from 'react';
import CreateEventForm from './CreateEventForm';
import Navbar from "./Navbar";

function CreateEvent() {
    const handleSubmit = (data : any) => {
        // handle form submission data
    };

    return (
        <div>
            <Navbar></Navbar>
            <CreateEventForm></CreateEventForm>
        </div>
    );
}

export default CreateEvent;
