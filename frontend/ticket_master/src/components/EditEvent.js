import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import AppNav from './AppNav';
import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";

class EditEvent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            name: '',
            today : new Date(),
            quota: 0,
            msg :'',
            isSuccess: false,
            isError: false
        }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.loadEvent = this.loadEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state;
        const response = await fetch('/api/event/'+ this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        try {
            const body = await response.json();
            console.log(body);
            if(body.id > 0) {
                this.setState({isSuccess: true, isError: false});
                setTimeout(() => this.setState({isSuccess:false}),3000);
                setTimeout(() => this.props.history.push('/event'),3000);
            }
            if(body.httpStatus === "BAD_REQUEST") {
                this.setState({isError: true, isSuccess: false, msg: body.message});
                setTimeout(() => this.setState({isError:false}),3000);
            }
        } catch(e) {}
        await this.componentDidMount();
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
        console.log(event);
        this.setState({
            id: event.id,
            name: event.name,
        });
        let tarih= Date.parse(event.event_date);
        console.log(tarih);
        let today = Date.parse(this.state.today.toISOString());
        console.log(today);
        if (tarih < today) {
            this.setState({isError: true, isSuccess: false, msg: "Zaten gerçekleşmiş bir etkinliği değiştiremezsiniz"});
            setTimeout(() => this.setState({isError:false}),2000);
            setTimeout(() => this.props.history.push('/event'),2000);
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const title = <h3>Etkinlik Değiştirme Forumu</h3>

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
                                <Input type="text" name="name" id="name" value={this.state.name}
                                       onChange={this.onChange} autoComplete="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="quota">Kota</Label>
                                <Input type="number" name="quota" id="quota" value={this.state.quota} min={0}
                                       onChange={this.onChange} autoComplete="0" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="event_date">Başlangıç Tarihi : </Label>
                                <DatePicker selected={this.state.event_date} onChange={this.handleDateChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="event_end_date">Bitiş Tarihi : </Label>
                                <DatePicker selected={this.state.event_end_date} onChange={this.handleEndDateChange} />
                            </FormGroup>

                            <FormGroup>
                                <Button color="primary" type="submit">Değiştir</Button>{' '}
                                <Button color="secondary" tag={Link} to="/event">İptal</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
            </div>

        );
    }
}

export default EditEvent;