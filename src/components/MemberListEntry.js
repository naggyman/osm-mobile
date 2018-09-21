import React, {Component} from 'react';
import {ListItem} from 'react-native-elements';

export default (props) => {
    console.log(props);
    return (
        <ListItem
              roundAvatar
              title={`${props.member.first_name} ${props.member.last_name}`}
              containerStyle={{ borderBottomWidth: 0 }}
              avatar={{ uri: props.member.photoURL }}
              subtitle={`${props.member.patrol_and_role}`}
              onPress={(a) => {props.navigation.navigate("MemberDetailPage", {member: props.member, structure: props.structure})}}
            />
    );
}