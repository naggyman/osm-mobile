import React, {Component} from 'react';
import { View, Text, Button, Alert, TextInput } from "react-native";
import { onSignIn, isSignedIn } from '../auth';

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
                        .then(() => this.props.navigation.navigate("Home"))
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
