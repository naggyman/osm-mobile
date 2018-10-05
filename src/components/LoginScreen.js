import React, {Component} from 'react';
import { View, Text, Button, Alert, TextInput, AsyncStorage } from "react-native";
import { onSignIn, isSignedIn } from '../auth';
import SectionList from '../sectionList';

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        isSignedIn().then((val) => {
            if(val) {
                this.props.navigation.navigate("Home")
            }
        })
    }

    async doPostSignin() {
        var sectionList = await SectionList();

        var selectedSection = sectionList[0];
        var selectedTerm = {};

        var now = new Date();

        for(term in selectedSection.terms){
            var thisTerm = selectedSection.terms[term];
            if(new Date(thisTerm.startdate) < now && new Date(thisTerm.enddate) > now){
                selectedTerm = thisTerm;
            }
        }

        if(selectedTerm === {}){
            selectedTerm = selectedSection.terms[0];
        }

        var toSave = {
            section: selectedSection, term: selectedTerm
        };

        await AsyncStorage.setItem('selectedSection', JSON.stringify(toSave));

        this.props.navigation.navigate("Home");
    }

    render() {
        return(
            <View>
            <Text> Login Screen! </Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({username: text})}
                placeholder="example@example.com"
            />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
            />
            <Button
                title = "Sign In"
                onPress = {() => {
                    onSignIn(this.state.username,this.state.password)
                        .then(() => {
                            this.doPostSignin();
                        })
                        .catch((error) => {
                            Alert.alert('Error Logging In:', JSON.stringify(error));
                        })
                }}
            />
            <Text>{this.state.username}</Text>
            <Text>{this.state.password}</Text>
            </View>
        );
    }
}
