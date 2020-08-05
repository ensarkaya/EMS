import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
import AppNav from './AppNav';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class EventsBarChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Events: []
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/charts');
        const body = await response.json();
        this.setState({Events: body, isLoading: false});
    }


    handleBarClick(element, id){
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    };

    render() {
        const {Events, isLoading} = this.state;
        if(isLoading)
            return (<div>Loading...</div>);

        const data = [];
        for(let i in Events){
            data.push({text: Events[i][0], value: Events[i][1]});
        }
       console.log(data);

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        return (
            <div>
                <AppNav />
                <Button color="primary" tag={Link} to="/admin" style={{margin: '10px', float: 'right'}}><FontAwesomeIcon icon={faUndo} /> Geri Dön</Button>
                {
                    <div style={{width: '50%'}}>
                    <BarChart ylabel='Başvuru Sayısı'
                    width={600}
                    height={600}
                    margin={margin}
                    data={data}
                    onBarClick={this.handleBarClick}/>
                    </div>
                }
            </div>
        );
    }

}