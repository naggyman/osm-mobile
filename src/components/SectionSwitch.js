import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import { onSignOut } from '../auth';
import OSM from '../osm';

export default class SectionSwitch extends Component {
    constructor(props){
        super(props);
        state = {
            sections: {}
        }
    }

    componentDidMount(){
        var sectionList = await SectionList();
        this.setState({sections: sectionList});
    }

    render() {
        return (
            <View>
                <Text>Section Switch</Text>
                
            </View>
        );
    }
}