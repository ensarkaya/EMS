import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import PopupComp from "./PopupComp";
import AppNav from './AppNav';

class BookingForm extends Component {

    emptyItem = {
        tc: '',
        email: '',
        event: {id: 1},
        first_name: '',
        last_name: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            item: this.emptyItem,
            msg: '',
            isSuccess: false,
            isError: false,
            isPopup: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.item;
        const response = await fetch(`/api/users`, {
            method: 'POST',
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
                setTimeout(() => this.setState({isSuccess:false, isPopup:true}),3000);
                setTimeout(() => this.props.history.push('/user'),15000);
            }
            if(body.httpStatus === "BAD_REQUEST") {
                this.setState({isError: true, isSuccess: false, msg: body.message});
                setTimeout(() => this.setState({isError:false}),3000);
            }
        } catch(e) {}
        await this.componentDidMount();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({ item });
    }

    componentDidMount() {
        let item = {...this.state.item};
        const eventID = window.localStorage.getItem("eventId");
        const eventName = window.localStorage.getItem("eventName");
        const eventStart = window.localStorage.getItem("eventStartTime");
        const eventEnd = window.localStorage.getItem("eventEndTime");
        item.event.id = eventID;
        item.event.name = eventName;
        item.event.event_date = eventStart;
        item.event.event_end_date = eventEnd;
    }

    render() {
        const title = <h3>Başvuru Formu</h3>
        return (
            <div>
                <div style={{"display": this.state.isSuccess || this.state.isError ? "block" : "none"}}>
                    <SuccessToast children={{show: this.state.isSuccess, message:"İşlem başarıyla gerçekleşti. Aşağıdaki butona tıklayarak oluşturulan QR kodu görüntüleyebilirsiniz. 15 saniye içinde ana sayfaya yönlendirileceksiniz."}}/>

                    <ErrorToast children={{show: this.state.isError, message:this.state.msg}}/>
                </div>

                <div style={{"display": this.state.isPopup ? "block" : "none"}}>
                    <PopupComp children={{show: this.state.isPopup, eventName:this.state.item.event.name,
                        eventDate:this.state.item.event.event_date,eventEndDate:this.state.item.event.event_end_date,
                        userFirstName: this.state.item.first_name,userLastName: this.state.item.last_name,
                        userTc: this.state.item.tc, userEmail: this.state.item.email}}/>
                </div>

                <div>
                    <AppNav />
                    <Container>
                        {title}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="first_name">İsim</Label>
                                <Input type="text" name="first_name" id="first_name"
                                    onChange={this.handleChange} autoComplete="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="last_name">Soyisim</Label>
                                <Input type="text" name="last_name" id="last_name"
                                    onChange={this.handleChange} autoComplete="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="tc">TCK</Label>
                                <Input type="number" name="tc" id="tc" minLength="13" maxLength="15"
                                    onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email Adresi</Label>
                                <Input type="text" name="email" id="email"
                                    onChange={this.handleChange} />
                            </FormGroup>

                            <FormGroup>
                                <Button
                                    color="primary"
                                    type="submit"
                                >
                                    Başvur
                                </Button>{' '}
                                <Button color="secondary" tag={Link} to="/user">İptal et</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
export default BookingForm;