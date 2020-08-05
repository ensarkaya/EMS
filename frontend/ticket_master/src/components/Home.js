import React, { Component } from 'react';
import AppNav from './AppNav';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
class Home extends Component {
    render() {
        return (
            <div>
                <AppNav />
                <h2 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    Etkinlik Yönetim Sistemine Hoşgeldiniz!
                    <FontAwesomeIcon icon={faCoffee} />
                </h2>
            </div>
        );
    }
}

export default Home;