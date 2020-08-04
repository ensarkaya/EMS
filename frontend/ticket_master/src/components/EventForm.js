import React, { Component } from 'react';
import { Container, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AppNav from './AppNav';
import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";

export default class EventForm extends Component {

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
            isLoading: false,
            item: this.emptyItem,
            questions : [{question: '', event: {id: 1}}],
            msg :'',
            isSuccess: false,
            isError: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.item;
        const response = await fetch(`/api/eventsSave`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        try {
            const body = await response.json();
            if(body.id > 0) {
                let questions = {...this.state.questions};
                questions.event.id = body.id;
                let questionList = this.state.questions;
                for(let i= 0; i< questionList.length; i++){
                    //console.log("question: "+questionList[i]);

                    let obj={event:body.id, question:questionList[i].question};
                    //alert('' + JSON.stringify(obj));
                    await fetch(`/api/questionSave`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj)
                    });
                }
                this.setState({isSuccess: true, isError: false});
                setTimeout(() => this.setState({isSuccess:false}),3000);
                setTimeout(() => this.props.history.push("/admin"),3000);
            }
            if(body.httpStatus === "BAD_REQUEST") {
                this.setState({isError: true, isSuccess: false, msg:body.message});
                setTimeout(() => this.setState({isError:false}),3000);
                setTimeout(() => this.props.history.push("/event"),3000);
            }
        } catch(e) {
            console.log("Error: "+ e);
        }
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

    // Extra Question part
    addClick(){
        this.setState(prevState => ({
            questions: [...prevState.questions, { question: ""}]
        }))
    }
    removeClick(i){
        let questions = [...this.state.questions];
        questions.splice(i, 1);
        this.setState({ questions });
    }
    createUI(){
        return this.state.questions.map((el, i) => (
            <div key={i}>
                <input placeholder="Soru?" name="question" value={el.question ||''} onChange={this.handleQuestionChange.bind(this, i)} />
                {'   '}<Button color="secondary" onClick={this.removeClick.bind(this, i)}>Soruyu Sil</Button>{' '}
            </div>
        ))
    }

    handleQuestionChange(i, event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let questions = [...this.state.questions];
        questions[i] = {...questions[i], [name]: value};
        this.setState({ questions });
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
        const title = <h3 style={{marginTop: '10px'}}>Etkinlik Formu</h3>
        const { isLoading} = this.state;

        if(isLoading)
             return (<div>Loading...</div>);

        return (
            <div>
                <div style={{"display": this.state.isSuccess || this.state.isError ? "block" : "none"}}>
                    <SuccessToast children={{show: this.state.isSuccess, message:"İşlem başarıyla gerçekleşti"}}/>

                    <ErrorToast children={{show: this.state.isError, message:this.state.msg}}/>
                </div>

                <div>
                    <AppNav />
                    <Button color="primary" tag={Link} to="/admin" style={{margin: '10px', float: 'right'}}>Geri Dön</Button>
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
                            {this.createUI()}
                                <Button color="primary" onClick={this.addClick.bind(this)}>Yeni Soru Ekle</Button>{' '}

                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit">Oluştur</Button>{' '}
                                <Button color="secondary" tag={Link} to="/admin">İptal Et</Button>
                            </FormGroup>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
