import React, {Component} from 'react';
import {Text} from 'react-native';

export default class EventList extends Component {
    static navigationOptions = {
        title: "Upcoming Events",
        tabBarLabel: 'Events'
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Text>List of stuff!</Text>
        );
    }
}