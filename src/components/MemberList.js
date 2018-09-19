import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage, FlatList, ScrollView} from 'react-native';
import { onSignOut } from '../auth';

import OSM from '../osm';

import MemberListEntry from './MemberListEntry';


export default class MemberListPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSection: {},
            memberList: []
        }
    }

    async componentDidMount(){
        //load all needed data
        var sectionData = await AsyncStorage.getItem('selectedSection');
        var sectionJSON = JSON.parse(sectionData)
        console.log(sectionJSON);

        var memberData = await OSM('ext/members/contact/grid/?action=getMembers', {section_id: sectionJSON.section.sectionid, term_id: sectionJSON.term.termid});
        var memberList = JSON.parse(memberData._bodyText);
        console.log(memberList);

        var members = [];
        for(member in memberList.data){
            members.push(memberList.data[member]);
        }

        console.log(members);
        this.setState({selectedSection: sectionJSON, memberList: members});
    }


    render() {
        return (
            <View>
                <Text>Members Page!</Text>

                <FlatList
                    data={this.state.memberList}
                    renderItem={({item}) => <MemberListEntry member={item} />}
                />
                
                <Button
                    title = "SIGN OUT"
                    onPress = {() => {onSignOut().then(() => navigation.navigate("SignedOut"))}}
                />
            </View>
        );
    }
}