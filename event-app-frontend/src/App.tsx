import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FrontPage from "./components/FrontPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import CreateEvent from "./components/CreateEvent";
import moment from "moment-timezone";
import EventDetails from "./components/EventDetails";
import EventList from "./components/EventList";
import PrivateRoutes from "./components/PrivateRoutes";
import MyEvents from "./components/MyEvents";
import RecommendationPage from "./components/Recommendationpage";
import GroupRecommendationPage from "./components/GroupRecommendationPage";

function App() {

    let launchMoment = require('moment')
    require('moment-timezone')
    moment.tz.setDefault('Europe/Bucharest')

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<FrontPage/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/create-an-event" element={<CreateEvent/>}/>
                        <Route path="/arts" element={<EventList category={"arts"}/>}/>
                        <Route path="/charity" element={<EventList category={"charity"}/>}/>
                        <Route path="/comedy" element={<EventList category={"comedy"}/>}/>
                        <Route path="/concerts" element={<EventList category={"concerts"}/>}/>
                        <Route path="/food" element={<EventList category={"food"}/>}/>
                        <Route path="/movies" element={<EventList category={"movies"}/>}/>
                        <Route path="/gaming" element={<EventList category={"gaming"}/>}/>
                        <Route path="/sports" element={<EventList category={"sports"}/>}/>
                        <Route path="/arts" element={<EventList category={"arts"}/>}/>
                        <Route path="/theater" element={<EventList category={"theater"}/>}/>
                        <Route path="/pets" element={<EventList category={"pets"}/>}/>
                        <Route path="/festivals" element={<EventList category={"festivals"}/>}/>
                        <Route path="/conferences" element={<EventList category={"conferences"}/>}/>
                        <Route path="/others" element={<EventList category={"others"}/>}/>
                        <Route path="/travel" element={<EventList category={"travel"}/>}/>
                        <Route path="/workshops" element={<EventList category={"workshops"}/>}/>
                        <Route path="/product-launch" element={<EventList category={"product-launch"}/>}/>
                        <Route path="/online" element={<EventList category={"online"}/>}/>
                        <Route path="/event/:eventId" element={<EventDetails/>}/>
                        <Route path="/saved-events" element={<MyEvents/>}/>
                        <Route path="/suggestions" element={<RecommendationPage/>}/>
                        <Route path="/group-suggestions" element={<GroupRecommendationPage/>}/>
                    </Route>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
