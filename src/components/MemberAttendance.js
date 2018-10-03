import React, {Component} from 'react';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class MemberAttendancePage extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (navigation.state.params) ? 
            <View style={{padding:10}}>
                <TouchableOpacity onPress={navigation.setParams({isDateTimePickerVisible: true})}>
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
            date: ''
        };
        //this.props.navigation.setParams({date: new Date().toString()})
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    //_showDateTimePicker = () => this.props.navigation.setParams({isDateTimePickerVisible: true});
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({date});
        this._hideDateTimePicker();
    };

    render() {
        //console.log(this.props.navigation.state.params.isDateTimePickerVisible);
        return (
            <View>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text>Show DatePicker</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        );
    }
}

/* 

*/