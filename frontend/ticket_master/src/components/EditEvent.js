import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import AppNav from './AppNav';

class EditEvent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            event_date: new Date(),
            event_end_date: new Date(),
            quota: 0
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.loadEvent = this.loadEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state;
        await fetch('/api/event/'+ this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        
        this.props.history.push("/event");
    }

    componentDidMount() {
        this.loadEvent();
    }

    handleDateChange(date) {
        this.setState({ event_date: date });
    }

    handleEndDateChange(date) {
        this.setState({ event_end_date: date });
    }

    async loadEvent() {
        const response = await fetch('/api/event/' + window.localStorage.getItem("eventId"));
        const event = await response.json();
        this.setState({
            id: event.id,
            name: event.name
        });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const title = <h3>Edit Form</h3>

        return (
            <div>
                <AppNav />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Title</Label>
                            <Input type="text" name="name" id="name" value={this.state.name}
                                onChange={this.onChange} autoComplete="name" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="quota">Quota</Label>
                            <Input type="number" name="quota" id="quota" value={this.state.quota}
                                   onChange={this.onChange} autoComplete="0" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="event_date">Date</Label>
                            <DatePicker selected={this.state.event_date} onChange={this.handleDateChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="event_end_date">Date</Label>
                            <DatePicker selected={this.state.event_end_date} onChange={this.handleEndDateChange} />
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Edit</Button>{' '}
                            <Button color="secondary" tag={Link} to="/event">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default EditEvent;