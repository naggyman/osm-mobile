import React, {Component} from 'react';
import {
    Image,
    ImageBackground,
    Linking,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button
  } from 'react-native';
import {Avatar, Card, Icon, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';

const mainColor = '#01C89E'


//parts of this page with inspiration from https://github.com/nattatorn-dev/react-native-user-profile/tree/master/screens/Profile1

export default class MemberDetailPage extends Component {
    static navigationOptions = {
        title: "Member Detail",
        headerRight: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Edit"
              color="#fff"
            />
        )
    }
    
    constructor(props){
        super(props);

        console.log(props);

        const member = this.props.navigation.getParam('member');
        let structure = this.props.navigation.getParam('structure');
        for(let i = 0; i < structure.length; i++){
            let groupid = structure[i].group_id;
            
            for(let g = 0; g < structure[i].columns.length; g++){
              if(member.custom_data[groupid]){
                structure[i].columns[g]['value'] = member.custom_data[groupid][structure[i].columns[g].column_id];
              }
            }
        }
        
        this.state = {
            member: member,
            structure: structure
        };

        this.state.structure.forEach((item) => console.log(item));
    }

    renderHeader = (member) => {
        return (
          <View style={styles.headerContainer}>
            <ImageBackground
              style={styles.headerBackgroundImage}
              blurRadius={10}
            >
              <View style={styles.headerColumn}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: member.photoURL,
                  }}
                />
                <Text style={styles.userNameText}>{member.first_name} {member.last_name}</Text>
                <View style={styles.userAddressRow}>
                  <View style={styles.userCityRow}>
                    <Text style={styles.userCityText}>
                      {member.patrol_role_level_label || member.patrol_and_role}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        )
    }

    renderItem = (structure) => {
        //<Text>{structure.item.name}</Text>
        return (
            <ListItem 
                title={structure.item.name}
                onPress={() => {this.props.navigation.navigate("MemberDetailEntry", {details: structure.item})}}
            />
        );
    }
    
    renderContent = (structure) => {
        return (<Text>Content!</Text>);
    }
    
    render() {
        if(this.state.selected){
            return(<Text>{this.state.selected.name}</Text>)
        }
        return (
            <View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Card containerStyle={styles.cardContainer}>
                            {this.renderHeader(this.state.member)}
                        </Card>
                        <View>
                            <Text>Date of Birth: {new moment(this.state.member.date_of_birth).format("dddd, MMMM Do YYYY")}</Text>
                            <Text>Joined Movement: {new moment(this.state.member.started).format("dddd, MMMM Do YYYY")}</Text>
                            <Text>Started Section: {new moment(this.state.member.joined).format("dddd, MMMM Do YYYY")}</Text>
                            <Text>SCOUT ID Number: {this.state.member.member_id}</Text>
                        </View>
                        <FlatList
                            data={this.state.structure}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.group_id}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFF',
      borderWidth: 0,
      flex: 1,
      margin: 0,
      padding: 0,
    },
    container: {
      flex: 1,
    },
    emailContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 35,
    },
    headerContainer: {
        backgroundColor: '#4d2177'
    },
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    placeIcon: {
      color: 'white',
      fontSize: 26,
    },
    scroll: {
      backgroundColor: '#FFF',
    },
    telContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    userAddressRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    userCityRow: {
      backgroundColor: 'transparent',
    },
    userCityText: {
      color: '#A5A5A5',
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    userImage: {
      borderColor: mainColor,
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
  });