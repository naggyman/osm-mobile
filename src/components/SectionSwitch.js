import React, {Component} from 'react';
import {Text, View, Button, Picker, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import SectionList from '../sectionList';

import Loader from './Loader';

export default class SectionSwitch extends Component {
    constructor(props, navigation){
        super(props);
        this.navigation = props.navigation;
        this.state = {
            loading: true,
            sections: [],
            selectedSection: {terms: []},
            selectedTerm: {}
        }
    }

    async componentDidMount(){
        var sectionList = await SectionList();
        var output = [];
        await sectionList.forEach(section => {
            output.push(section.groupname + ' - ' + section.sectionname)
        })
        let now = new Date();
        var selectedTerm = {};
        for(term in sectionList[0].terms){
            var thisTerm = sectionList[0].terms[term];
            if(new Date(thisTerm.startdate) < now && new Date(thisTerm.enddate) > now){
                selectedTerm = thisTerm;
            }
        }

        this.setState({sections: sectionList, selectedSection: sectionList[0], loading: false, selectedTerm: selectedTerm});
    }

    updateSection = (a) => {
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
        console.log(this.state.selectedTerm)
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
                            this.navigation.navigate("Home", {reset:true})
                            //this.navigation.dispatch(NavigationActions.reset({
                              //  index: 0,
                               // key: null,
                               // actions: [NavigationActions.navigate({ routeName: "TabNav" })],
                            //}));
                        });
                    }}
                />
            </View>
        );
    }
}