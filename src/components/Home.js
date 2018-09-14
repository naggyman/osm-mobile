import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import { onSignOut } from '../auth';

export default ({navigation}) => (
    <View>
        <Text>Home Page!</Text>
        <Button
            title = "SIGN OUT"
            onPress = {() => {onSignOut().then(() => navigation.navigate("SignedOut"))}}
        />
    </View>
)