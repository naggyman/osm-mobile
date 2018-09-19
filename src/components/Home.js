import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage, AppState, FlatList} from 'react-native';
import { onSignOut } from '../auth';
import OSM from '../osm';

import moment from 'moment';

import SectionList from '../sectionList';

export default class NavigationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSection: {section:{}, term:{}},
            dashboardData: {}
        }
    }

    async componentDidMount(){
        //load all needed data
        var sectionData = await AsyncStorage.getItem('selectedSection');
        var sectionJSON = JSON.parse(sectionData)
        console.log(sectionJSON);

        var dashboardData = await OSM('/ext/dashboard/?action=getNextThings&sectionid=' + sectionJSON.section.sectionid + '&termid=' + sectionJSON.term.termid, {});
        var dashboardJSON = JSON.parse(dashboardData._bodyText);
        console.log(dashboardJSON);
        this.setState({selectedSection: sectionJSON, dashboardData: dashboardJSON});
    }

    render() {
        return (
            <View>
                <Text>Home Page!</Text>
                <Text> {this.state.selectedSection.section.groupname + " - " + this.state.selectedSection.section.sectionname} </Text>
                
                <Text>Members</Text>
                
                <Text>Birthdays</Text>
                <FlatList
                    data={this.state.dashboardData.birthdays}
                    renderItem={({item}) => <Text>{new moment(item.dob).format("dddd, MMMM Do")} - {item.firstname} {item.lastname} - ({item.age}) </Text>}
                />

                <Text>Events</Text>
                <FlatList
                    data={this.state.dashboardData.events}
                    renderItem={({item}) => <Text>{item.name} - {new moment(item.date).format("dddd, MMMM Do YYYY")} - (Yes: {item.yes}, No: {item.no})</Text>}
                />

                <Text>News</Text>
                <FlatList
                    data={this.state.dashboardData.news}
                    renderItem={({item}) => <Text>{item.title} ({new moment(item.date).format("dddd, MMMM Do YYYY")})</Text>}
                />

                <Button
                    title = "SIGN OUT"
                    onPress = {() => {
                        onSignOut().then(() => navigation.navigate("SignedOut"))
                    }}
                />
            </View>
        );
    }
}