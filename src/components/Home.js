import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage, AppState, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { onSignOut } from '../auth';
import OSM from '../osm';

import moment from 'moment';

import SectionList from '../sectionList';

const CustomHeader = ({ params, switchSection }) => (
    <View>
        <Text style={styles.navTitleContainer}>{params.section}</Text>
        <Text style={styles.navSubtitleContainer}>{params.group} | {params.term}</Text>
    </View>
);

export default class NavigationPage extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (navigation.state.params) ? 
            <View>
                <TouchableOpacity onPress={() => {navigation.navigate('SectionSwitch')}}>
                    <CustomHeader params={navigation.state.params} />
                </TouchableOpacity> 
            </View>
            : 'Loading...',
        headerRight: 
            <Button 
                title = "Sign Out" 
                onPress = {() => {
                    onSignOut().then(() => navigation.navigate("SignedOut"))
                }}
        />
    })

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
        this.props.navigation.setParams({group: sectionJSON.section.groupname, section: sectionJSON.section.sectionname, term: sectionJSON.term.name})
        this.setState({selectedSection: sectionJSON});

        var dashboardData = await OSM('/ext/dashboard/?action=getNextThings&sectionid=' + sectionJSON.section.sectionid + '&termid=' + sectionJSON.term.termid, {});
        var dashboardJSON = JSON.parse(dashboardData._bodyText);
        console.log(dashboardJSON);
        this.setState({dashboardData: dashboardJSON});
    }

    render() {
        return (
            <View>
                <Text style={styles.headingContainer}>Welcome to OSM Mobile!</Text>

                <Text style={styles.sectionHeadingContainer}>Birthdays</Text>
                <FlatList
                    data={this.state.dashboardData.birthdays}
                    renderItem={({item}) => <Text>{new moment(item.dob).format("dddd, MMMM Do")} - {item.firstname} {item.lastname} - ({item.age}) </Text>}
                    ListEmptyComponent={() => <Text>No upcoming birthdays</Text>}
                />

                <Text style={styles.sectionHeadingContainer}>Events</Text>
                <FlatList
                    data={this.state.dashboardData.events}
                    renderItem={({item}) => <Text>{item.name} - {new moment(item.date).format("dddd, MMMM Do YYYY")} - (Yes: {item.yes}, No: {item.no})</Text>}
                    ListEmptyComponent={() => <Text>No upcoming events</Text>}
                />

                <Text style={styles.sectionHeadingContainer}>News</Text>
                <FlatList
                    data={this.state.dashboardData.news}
                    renderItem={({item}) => <Text>{item.title} ({new moment(item.date).format("dddd, MMMM Do YYYY")})</Text>}
                    ListEmptyComponent={() => <Text>No current news</Text>}
                /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeadingContainer: {
        backgroundColor: '#4d2177',
        fontSize: 19,
        color: 'white'
    },
    headingContainer:{
        fontSize: 20
    },
    navTitleContainer: {
        fontSize: 20
    },
    navSubtitleContainer: {
        fontSize: 12
    }
});