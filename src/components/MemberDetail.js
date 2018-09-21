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
    FlatList
  } from 'react-native';
import {Avatar, Card, Icon, ListItem} from 'react-native-elements';

const mainColor = '#01C89E'

export default class MemberDetailPage extends Component {
    constructor(props){
        super(props);

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
                      {member.age}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        )
    }

    renderItem = (structure) => {
        console.log(structure);
        return (
            <View>
                <Text>{structure.item.name}</Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader(this.state.member,this.state.member.photoURL)}
                        <FlatList
                            data={this.state.structure}
                            renderItem={(item) => <Text>>{item.name}</Text>}
                            keyExtractor={(item, pos) => pos.toString()} 
                        />
                    </Card>
                </View>
            </ScrollView>
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