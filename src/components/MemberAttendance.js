import React, {Component} from 'react';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class MemberAttendancePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            memberList: []
        };
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    render() {
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