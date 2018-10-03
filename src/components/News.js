import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';
import moment from 'moment';

export default class NewsItem extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 
            <View>
                <Text>{navigation.getParam('news').title}</Text>
                <Text>Posted: {new moment(navigation.getParam('news').date).format("dddd, MMMM Do YYYY")}</Text>
            </View>,
        };
    };

    constructor(props){
        super(props);

        const news = this.props.navigation.getParam('news');
        this.state = {
            news: news
        }
    }

    render(){
        console.log(this.state.news)
        return (
            <ScrollView style={{flex: 1, padding:20}}>
                <HTML html={this.state.news.msg} />
            </ScrollView>
        );
    }
}