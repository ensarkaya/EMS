import React, { Component } from 'react';
import { Table, Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import "react-datepicker/dist/react-datepicker.css";
import AppNav from './AppNav';
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

class EventForm extends Component {

    emptyItem = {
        name: '',
        event_date: new Date(),
        event_end_date: new Date(),
        quota: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(),
            isLoading: true,
            events: [],
            item: this.emptyItem,
            msg :'',
            isSuccess: false,
            isError: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }

    async handleSubmit(event) {
        const item = this.state.item;
        await fetch(`/api/events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        event.preventDefault();
        this.props.history.push("/events");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({ item });
    }
    
    handleDateChange(date) {
        let item = {...this.state.item};
        item.event_date = date;
        this.setState({ item });
    }
    handleEndDateChange(date) {
        let item = {...this.state.item};
        item.event_end_date = date;
        this.setState({ item });
    }

    async remove(id) {
        const item = this.state.item;
        console.log(item);
        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        try {
            const body = await response.json();

            if(body === "ACCEPTED") {
                this.setState({isSuccess: true, isError: false});
                setTimeout(() => this.setState({isSuccess:false}),3000);
                let updatedEvents = [...this.state.events].filter(i => i.id !== id);
                this.setState({events: updatedEvents});
            }
            if(body.httpStatus === "BAD_REQUEST") {
                this.setState({isError: true, isSuccess: false, msg:body.message});
                setTimeout(() => this.setState({isError:false}),3000);
            }
        } catch(e) {}
        await this.componentDidMount();
    }

    editEvent(id) {
        window.localStorage.setItem("eventId", id);
        this.props.history.push('/editEvent');
    }

    async componentDidMount() {
        const response = await fetch('/api/events');
        const body = await response.json();
        this.setState({events: body, isLoading: false});
    }

    render() {
        const title = <h3 style={{marginTop: '10px'}}>Etkinlik Formu</h3>
        const {events, isLoading} = this.state;

        if(isLoading)
             return (<div>Loading...</div>);
        console.log(events);
        let rows = events.map(event => 
            <tr key={event.id}>
                <td>{event.name}</td>
                <td><Moment date={event.event_date} format="DD/MM/YYYY" /></td>
                <td><Moment date={event.event_end_date} format="DD/MM/YYYY" /></td>
                <td>{event.quota}</td>
                <td><Button size="sm" color="secondary" onClick={() => this.editEvent(event.id)} >Değiştir</Button></td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(event.id)}>Sil</Button></td>
            </tr>   
        )

        return (
            <div>
                <div style={{"display": this.state.isSuccess || this.state.isError ? "block" : "none"}}>
                    <SuccessToast children={{show: this.state.isSuccess, message:"İşlem başarıyla gerçekleşti"}}/>

                    <ErrorToast children={{show: this.state.isError, message:this.state.msg}}/>
                </div>

                <div>
                    <AppNav />
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">Etkinlik Adı</Label>
                                <Input type="text" name="name" id="name" value={this.state.item.name}
                                       onChange={this.handleChange} autoComplete="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="quota">Kota</Label>
                                <Input type="number" name="quota" id="quota" value={this.state.item.quota}
                                       onChange={this.handleChange} min={0} autoComplete={0} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="event_date">Başlangıç Tarihi</Label>
                                <DatePicker selected={this.state.item.event_date} onChange={this.handleDateChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="event_end_date">Bitiş  Tarihi</Label>
                                <DatePicker selected={this.state.item.event_end_date} onChange={this.handleEndDateChange} />
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Oluştur</Button>{' '}
                                <Button color="secondary" tag={Link} to="/admin">İptal Et</Button>
                            </FormGroup>
                        </Form>
                    </Container>

                    {''}
                    <Container>
                        <h3>Events List</h3>
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th width="30%">Etkinlik Adı</th>
                                <th width="30%">Başlangıç Tarihi</th>
                                <th width="30%">Bitiş  Tarihi</th>
                                <th width="30%">Kota</th>
                                <th width="10%">Aksiyon</th>
                            </tr>
                            </thead>

                            <tbody>
                            {rows}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>


        );
    }
}

export default EventForm;