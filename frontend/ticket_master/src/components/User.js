import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';

import AppNav from './AppNav';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isLoading: true,
            Events: []
        }
        this.bookEvent = this.bookEvent.bind(this);
    }
    bookEvent(id) {
        window.localStorage.setItem("eventId", id);
        this.props.history.push('/booking');
    }

    async componentDidMount() {
        const response = await fetch('/api/events');
        const body = await response.json();
      /*
        let tarih1= Date.parse(body[0].event_date);
        let today1 = Date.parse(this.state.date.toISOString());
        console.log(tarih1);
        console.log(typeof tarih1);
        console.log(today1);
        console.log(typeof today1);
        console.log(tarih1 < today1);
        console.log(tarih1 > today1);
       */
        for (let i in body) {
            let tarih= Date.parse(body[i].event_date);
            let today = Date.parse(this.state.date.toISOString());
            if (tarih < today) {
                body.splice(i, 1);
            }
        }
        this.setState({Events: body, isLoading: false});
    }

    render() {
        const {Events, isLoading} = this.state;
        if(isLoading)
            return (<div>Loading...</div>);

        return (
            <div>
                <AppNav />
                {
                    Events.map(event => 
                        <div id={event.id} className="boxed" style={{ justifyContent: 'center'}}>
                            <h3>{event.name}</h3>
                            <p>Başlangıç Tarihi: </p>
                            <Moment format="DD/MM/YYYY">{event.event_date}</Moment>
                            <p> </p>
                            <p>Bitiş Tarihi: </p>
                            <Moment format="DD/MM/YYYY">{event.event_end_date}</Moment>
                            <hr/>

                            <Button 
                                color="primary"
                                onClick={() => this.bookEvent(event.id)}
                                >
                                Book
                                </Button>
                        </div>    
                    )
                }   
            </div>
        );
    }
}

export default User;