import React, { Component } from 'react';
import {Table, Container, Button, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faList} from '@fortawesome/free-solid-svg-icons'
import AppNav from './AppNav';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            bookings: []
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/bookings');
        const body = await response.json();
        this.setState({bookings: body, isLoading: false});
    }

    render() {
        const {isLoading} = this.state;

        if(isLoading)
             return (<div>Loading...</div>);

        let rows = this.state.bookings.map((booking, i) => 
            <tr>
                <td>{this.state.bookings[i][0]}</td>
                <td>{this.state.bookings[i][1]}</td>
                <td>{this.state.bookings[i][2]}</td>
                <td>{this.state.bookings[i][3]}</td>
                <td>{this.state.bookings[i][4]}</td>
            </tr>   
        )

        return (
            <div>
                <AppNav />
                <Button color="primary" tag={Link} to="/event" style={{margin: '10px', float: 'right'}}>Etkinlik Oluştur</Button>
                <Button color="primary" tag={Link} to="/eventList" style={{margin: '10px', float: 'right'}}>Etkinlik Listesini Göster</Button>
                <Button color="primary" tag={Link} to="/eventsBarChart" style={{margin: '10px', float: 'right'}}>Etkinlik Katılım Grafiklerini Göster</Button>
                {''}
                    <Container>
                        <h3 style={{marginTop: '20px'}}><FontAwesomeIcon icon={faList} /> Başvuru Listesi</h3>
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th width="20%">Ad</th>
                                    <th width="20%">Soyad</th>
                                    <th width="20%">TC</th>
                                    <th width="30%">Email</th>
                                    <th width="20%">Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Container>
            </div>
        );
    }
}

export default Admin;