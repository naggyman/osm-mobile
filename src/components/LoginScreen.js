import React, {Component} from 'react';
import { View, Text, Button } from "react-native";
import { onSignIn } from '../auth';

export default ({navigation}) => (
    <View>
        <Text> Login Screen! </Text>
        <Button
            title = "SIGN IN"
            onPress = {() => {onSignIn('a','b').then(() => navigation.navigate("SignedIn"))}}
        />
    </View>
);