import React, { Component } from 'react';
import {Table, Container, Button, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import "react-datepicker/dist/react-datepicker.css";
import AppNav from './AppNav';
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faUndo} from "@fortawesome/free-solid-svg-icons";

export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(),
            isLoading: true,
            events: [],
            msg :'',
            isSuccess: false,
            isError: false
        }

        this.editEvent = this.editEvent.bind(this);
        this.showCharts=this.showCharts.bind(this);
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

    showCharts(id){
        window.localStorage.setItem("eventId", id);
        this.props.history.push('/dayCharts');
    }

    async componentDidMount() {
        const response = await fetch('/api/events');
        const body = await response.json();
        this.setState({events: body, isLoading: false});
    }

    render() {
        const {events, isLoading} = this.state;

        if(isLoading)
            return (<div>Loading...</div>);
       // console.log(events);
        let rows = events.map(event =>
            <tr key={event.id}>
                <td>{event.name}</td>
                <td><Moment date={event.event_date} format="DD/MM/YYYY" /></td>
                <td><Moment date={event.event_end_date} format="DD/MM/YYYY" /></td>
                <td>{event.quota}</td>
                <td><Button size="sm" color="secondary" onClick={() => this.editEvent(event.id)} >Değiştir</Button></td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(event.id)}>Sil</Button></td>
                <td><Button size="sm" color="primary" onClick={() => this.showCharts(event.id)}>Günlük Kayıtlar</Button></td>
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
                    <Button color="primary" tag={Link} to="/admin" style={{margin: '10px', float: 'right'}}><FontAwesomeIcon icon={faUndo} /> Geri Dön</Button>
                    <Container>
                        <h3 style={{marginTop: '10px'}}><FontAwesomeIcon icon={faList} /> Etkinlik Listesi</h3>
                    </Container>

                    {''}
                    <Container>
                        <Table className="mt-4">
                            <thead>
                            <tr>
                                <th width="30%">Etkinlik Adı</th>
                                <th width="30%">Başlangıç Tarihi</th>
                                <th width="30%">Bitiş  Tarihi</th>
                                <th width="30%">Kota</th>
                                <th width="30%" align={"right"}>Aksiyon</th>
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

