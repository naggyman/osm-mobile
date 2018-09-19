import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import { onSignOut } from '../auth';

import OSM from '../osm';


export default class ListPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Profile Page!</Text>
                <Button
                    title = "SIGN OUT"
                    onPress = {() => {onSignOut().then(() => navigation.navigate("SignedOut"))}}
                />
            </View>
        );
    }
}