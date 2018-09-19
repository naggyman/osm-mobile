import React, {Component} from 'react';
import {Text, View, Button, Picker, AsyncStorage} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import { onSignOut } from '../auth';
import OSM from '../osm';
import SectionList from '../sectionList';

import Loader from './Loader';

export default class SectionSwitch extends Component {
    constructor(props, navigation){
        super(props);
        this.navigation = navigation;
        this.state = {
            loading: true,
            sections: [],
            selectedSection: {terms: []},
            selectedTerm: {}
        }
    }

    async componentDidMount(){
        var sectionList = await SectionList();
        //var sectionListJson = await sectionList.json();
        console.log(sectionList); 
        var output = [];
        sectionList.forEach(section => {
            output.push(section.groupname + ' - ' + section.sectionname)
        })
        this.setState({sections: sectionList});
        let now = new Date();
        sectionList[0].terms.forEach((term) => {
            if(new Date(term.startdate) < now && new Date(term.enddate) > now){
                this.setState({selectedTerm: term});
            }
        })

        this.setState({loading: false});
    }

    updateSection = (a) => {
        console.log(a);
        this.setState({selectedSection:a});

        let now = new Date();
        a.terms.forEach((term) => {
            if(new Date(term.startdate) < now && new Date(term.enddate) > now){
                this.setState({selectedTerm: term});
            }
        })
    }

    updateTerm = (a) => {
        console.log(a);
        this.setState({selectedTerm:a});
    }

    render() {
        return (
            <View>
                <Loader loading={this.state.loading}/>
                <Text>Section Switch</Text>
                <Picker
                    selectedValue={this.state.selectedSection}
                    onValueChange={this.updateSection}
                >
                    {
                        this.state.sections.map((itemVal) => {
                            return <Picker.Item label={itemVal.groupname + ' - ' + itemVal.sectionname} value={itemVal} key={itemVal.sectionid} />
                        })
                    }
                </Picker>
                <Picker
                    selectedValue={this.state.selectedTerm}
                    onValueChange={this.updateTerm}
                >
                    {
                        this.state.selectedSection.terms.map((itemVal) => {
                            return <Picker.Item label={itemVal.name} value={itemVal} key={itemVal.termid} />
                        })
                    }
                </Picker>
                <Button
                    title = "Select Section"
                    onPress = {() => {
                        var toSave = {
                            section: this.state.selectedSection, term: this.state.selectedTerm
                        };
                        console.log(toSave);
                        AsyncStorage.setItem('selectedSection', JSON.stringify(toSave)).then((resp) => {
                            //this.navigation.navigate("Home")
                        });
                    }}
                />
            </View>
        );
    }
}