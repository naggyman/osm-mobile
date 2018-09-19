import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import { onSignOut } from '../auth';
import OSM from '../osm';

import SectionList from '../sectionList';

export default class NavigationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSection: {}
        }
    }

    async componentDidMount(){
        var sectionData = await AsyncStorage.getItem('selectedSection');
        console.log(JSON.parse(sectionData))
        var sectionJSON = JSON.parse(sectionData)
        this.setState({selectedSection: sectionJSON});
    }

    render() {
        return (
            <View>
                <Text>Home Page!</Text>
                <Text> {this.state.selectedSection.groupname + " - " + this.state.selectedSection.sectionname} </Text>
                <Button
                    title = "Get data"
                    onPress = {async () => {
                        /* var res = await OSM('api.php?action=getTerms', {});
                        console.log(JSON.parse(res._bodyText)); */
                        var sectionList = await SectionList();
                        console.log(sectionList);
                    }}
                />
                <Button
                    title = "SIGN OUT"
                    onPress = {() => {
                        console.log(props);
                        onSignOut().then(() => navigation.navigate("SignedOut"))
                    }}
                />
            </View>
        );
    }
}