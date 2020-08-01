import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
import AppNav from './AppNav';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

export default class EventsBarChart extends Component{
    handleBarClick(element, id){
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    };

    render() {
        const data = [
            {text: 'Man', value: 500},
            {text: 'Woman', value: 300}
        ];

        const margin = {top: 20, right: 20, bottom: 30, left: 40};

        return (
            <div>
                <AppNav />
                <Button color="primary" tag={Link} to="/admin" style={{margin: '10px', float: 'right'}}>Geri Dön</Button>


                <div style={{width: '50%'}}>
                    <BarChart ylabel='Quantity'
                              width={500}
                              height={500}
                              margin={margin}
                              data={data}
                              onBarClick={this.handleBarClick}/>
                </div>
            </div>
        );
    }

}