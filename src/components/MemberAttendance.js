import React, {Component} from 'react';
import {Text, Button, View, TouchableOpacity, ScrollView, FlatList, AsyncStorage} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {ListItem, CheckBox} from 'react-native-elements';
import OSM from '../osm';

export default class MemberAttendancePage extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (navigation.state.params) ? 
            <View style={{padding:10}}>
                <TouchableOpacity onPress={() => {}}>
                    <Text>{navigation.state.params.date}</Text>
                </TouchableOpacity> 
            </View>
            : 'Loading...'
    })
    
    constructor(props){
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            memberList: [],
            date: '',
            loading: false,
            present: [],
            explainedAbsense: []
        };
        this.props.navigation.setParams({date: new Date().toString()})
    }

    async componentDidMount() {
        this.refreshData();
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({date});
        this.props.navigation.setParams({date: date.toString()})
        this._hideDateTimePicker();
    };

    async refreshData() {
        await this.setState({loading: true});

        var sectionData = await AsyncStorage.getItem('selectedSection');
        var sectionJSON = JSON.parse(sectionData)
        console.log(sectionJSON);

        var attendanceData = await OSM('/ext/members/attendance/?action=get&sectionid=' + sectionJSON.section.sectionid + '&termid=' + sectionJSON.term.termid, {});
        var attendanceDataJson = JSON.parse(attendanceData._bodyText);
        console.log(attendanceDataJson);

        await this.setState({loading: false, memberList: attendanceDataJson.items})
    }

    pressedItem(item, evt){
        console.log(item);
        var presentList = this.state.present;
        presentList.push(item.scoutid);

        this.setState({present: presentList})
        console.log(evt);
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text>Show DatePicker</Text>
                </TouchableOpacity>
                
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />

                <FlatList 
                    data={this.state.memberList}
                    refreshing={this.state.loading}
                    renderItem={({item}) => {
                            if(this.state.present.indexOf(item.scoutid) != -1){
                                <TouchableOpacity onPress={(evt) => this.pressedItem(item, evt)}>
                                    <Text>{item.firstname} {item.lastname}</Text>
                                    <Text>Present</Text>
                                </TouchableOpacity>
                            }

                            return (
                                <TouchableOpacity onPress={(evt) => this.pressedItem(item, evt)}>
                                    <Text>{item.firstname} {item.lastname}</Text>
                                </TouchableOpacity>
                            );
                        }
                    }
                />
            </ScrollView>
        );
    }
}

/* 

*/