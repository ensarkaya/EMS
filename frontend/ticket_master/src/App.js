import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import Home from './components/Home';
import Admin from './components/Admin';
import User from './components/User';
import EventForm from './components/EventForm';
import BookingForm from './components/BookingForm';
import EditEvent from './components/EditEvent';
import EventsBarChart from "./components/EventsBarChart";
import DaysBarChart from "./components/DaysBarChart";
import EventList from "./components/EventList";

class App extends Component {
    render() {
        return (
            <Router>
            <ReactNotifications />
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/user' exact={true} component={User} />
                    <Route path='/admin' exact={true} component={Admin} />
                    <Route path='/event' exact={true} component={EventForm} />
                    <Route path='/eventList' exact={true} component={EventList}/>
                    <Route path='/booking' exact={true} component={BookingForm} />
                    <Route path='/editEvent' exact={true} component={EditEvent} />
                    <Route path='/eventsBarChart' exact={true} component={EventsBarChart} />
                    <Route path='/dayCharts' exact={true} component={DaysBarChart} />
                </Switch>
            </Router>
        );
    }
}

export default App;