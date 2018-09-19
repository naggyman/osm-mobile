import React, {Component} from 'react';
import {Text} from 'react-native';

export default (props) => {
    return (
        <Text>{props.member.first_name} {props.member.last_name}</Text>    
    );
}