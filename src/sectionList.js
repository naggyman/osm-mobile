//import { AsyncStorage } from "react-native";
import OSM from './osm';

export default async function() {
    var sections = [];

    var termsResp = await OSM('api.php?action=getTerms', {});
    var userRolesResp = await OSM('api.php?action=getUserRoles', {});

    var terms = JSON.parse(termsResp._bodyText);
    var userRoles = JSON.parse(userRolesResp._bodyText);

    for(section in userRoles){
        const thisSection = userRoles[section];
        thisSection.terms = terms[thisSection.sectionid];
        sections.push(thisSection);
    }

    return sections;
}