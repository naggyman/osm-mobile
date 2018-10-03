import React, {Component} from 'react';
import {Text, ScrollView, FlatList, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';
import OSM from '../osm';

export default class EventList extends Component {
    static navigationOptions = {
        title: "Upcoming Events",
        tabBarLabel: 'Events'
    }

    constructor(props){
        super(props);
        this.state = {
            eventList: [],
            loading: false
        }
    }

    async componentDidMount(){
        this.refreshData();
    }

    async refreshData() {
        await this.setState({loading: true});

        var sectionData = await AsyncStorage.getItem('selectedSection');
        var sectionJSON = JSON.parse(sectionData)
        console.log(sectionJSON);

        var eventData = await OSM('ext/events/summary/?action=get&sectionid=' + sectionJSON.section.sectionid + '&termid=' + sectionJSON.term.termid, {});
        var eventDataJson = JSON.parse(eventData._bodyText);
        console.log(eventDataJson);

        await this.setState({loading: false, eventList: eventDataJson.items})
    }

    render() {
        return (
            <ScrollView>
                <FlatList 
                    data={this.state.eventList}
                    refreshing={this.state.loading}
                    renderItem={({item}) => <ListItem title={item.name} subtitle={item.date} />}
                    keyExtractor={(item) => item.eventid} 
                />
            </ScrollView>
        );
    }
}