import React, { Component } from 'react';
import BarChart from 'react-bar-chart';
import AppNav from './AppNav';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

export default class DaysBarChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Days: []
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/dayCharts/'+ window.localStorage.getItem("eventId"));
        const body = await response.json();
        this.setState({Days: body, isLoading: false});
    }

    render() {
        const {Days, isLoading} = this.state;
        if(isLoading)
            return (<div>Loading...</div>);
        console.log("Days str: "+Days.toString());
        const data = [];
        if(Days)
        for(let i in Days){
            console.log("Days: "+Days[i][0] + " Value: " + Days[i][1] );
            data.push({text: Days[i][0], value: Days[i][1]});
        }
        console.log(data);

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        return (
            <div>
                <AppNav />
                <Button color="primary" tag={Link} to="/eventList" style={{margin: '10px', float: 'right'}}>Geri Dön</Button>
                {
                    <div style={{width: '50%'}}>
                        <BarChart ylabel='Kullanıcı Sayısı'
                                  width={600}
                                  height={600}
                                  margin={margin}
                                  data={data}/>
                    </div>
                }
            </div>
        );
    }

}