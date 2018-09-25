import React, {Component} from 'react';
import {Text, FlatList, ScrollView, Linking} from 'react-native';
import {ListItem} from 'react-native-elements';
import call from 'react-native-phone-call'

//parts of this page with inspiration from https://github.com/nattatorn-dev/react-native-user-profile/tree/master/screens/Profile1

export default class MemberDetailEntry extends Component {
    constructor(props){
        super(props);

        const details = this.props.navigation.getParam('details');
        
        details.columns = details.columns.filter(item => {
            return item.value;
        })
        this.state = {
            details
        };

        console.log(details);
    }

    renderItem = (item) => {
        if(item.item.type === "telephone"){
            return (
                <ListItem 
                    title={item.item.value}
                    subtitle={item.item.label}
                    onPress={() => {
                        call({number: item.item.value, prompt: false}).catch(console.error);
                    }}
                />
            );
        } else if(item.item.type === "email"){
            return (
                <ListItem 
                    title={item.item.value}
                    subtitle={item.item.label}
                    onPress={() => {
                        Linking.openURL('mailto:' + item.item.value)
                    }}
                />
            );
        }
        return (
            <ListItem 
                title={item.item.value}
                subtitle={item.item.label}
            />
        );
    }
    
    render() {
        return (
            <ScrollView>
                <FlatList 
                    data={this.state.details.columns}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.column_id}
                />
            </ScrollView>
        );
    }
}
