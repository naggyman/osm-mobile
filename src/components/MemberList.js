import React, {Component} from 'react';
import {Text, View, Button, AsyncStorage, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { onSignOut } from '../auth';

import OSM from '../osm';

import MemberListEntry from './MemberListEntry';


export default class MemberListPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSection: {},
            memberList: [],
            memberListFull: [],
            memberDetailStructure: [],
            refreshing: false
        }
    }

    getPhotoURLI(scoutID, photoGUID, jpgSize){
        if(!scoutID || !photoGUID){return 'https://osm.scouts.org.nz/' + "graphics/NoPhoto.png";} 
        var scoutIDFolder = 0;
        if(scoutID < 1000){scoutIDFolder = 0;}
        else if(scoutID < 10000){scoutIDFolder = this.sigFigs(scoutID,1)}
        else scoutIDFolder = this.sigFigs(scoutID,2);
        return "https://osm.scouts.org.nz/sites/nz.onlinescoutmanager.com/public/member_photos/" + scoutIDFolder + "/" + scoutID + "/" + photoGUID + "/" + jpgSize;
    }

    sigFigs(n, sig) {
        var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
        return Math.floor(n * mult) / mult;
    }

    async componentDidMount(){
        this.refreshData();
    }

    async refreshData(){
        await this.setState({refreshing: true});
        //load all needed data
        var sectionData = await AsyncStorage.getItem('selectedSection');
        var sectionJSON = JSON.parse(sectionData)
        console.log(sectionJSON);

        var memberData = await OSM('ext/members/contact/grid/?action=getMembers', {section_id: sectionJSON.section.sectionid, term_id: sectionJSON.term.termid});
        var memberList = JSON.parse(memberData._bodyText);
        console.log(memberList);

        var structure = memberList.meta.structure;

        var members = [];
        for(member in memberList.data){
            var memberData = memberList.data[member];
            memberData.photoURL = this.getPhotoURLI(memberData.member_id, memberData.photo_guid, '100x100_0.jpg');
            members.push(memberData);
        }

        console.log(members);
        this.setState({selectedSection: sectionJSON, memberListFull: members, memberList: members, memberDetailStructure: structure, refreshing: false});
    }

    searchFilterFunction = (text) => {
        const searchTerm = text.toLowerCase();
        const newData = this.state.memberListFull.filter(item => {
            const itemString = item._filterString.toLowerCase();
            return itemString.indexOf(searchTerm) > -1;
        });

        this.setState({memberList: newData});
    }

    renderHeader = () => {
        return <SearchBar 
            placeholder='Type Here...'
            onChangeText={text => this.searchFilterFunction(text)}
        />;
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
    };


    render() {
        console.log(this.props);
        return (
            <View>
                <FlatList
                    data={this.state.memberList}
                    refreshing={this.state.refreshing}
                    renderItem={({item}) => <MemberListEntry member={item} navigation={this.props.navigation} structure={this.state.memberDetailStructure} />}
                    onRefresh={() => {this.refreshData}}
                    keyExtractor={(item) => item.member_id} 
                    ListHeaderComponent={this.renderHeader}
                    stickyHeaderIndices={[0]}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}