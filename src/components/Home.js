import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import { onSignOut } from '../auth';
import OSM from '../osm';

import SectionList from '../sectionList';

export default class NavigationPage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Home Page!</Text>
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
                    onPress = {() => {onSignOut().then(() => navigation.navigate("SignedOut"))}}
                />
            </View>
        );
    }
}