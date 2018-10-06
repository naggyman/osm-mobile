// Wrapper to perform API calls

import {AsyncStorage, Fetch} from 'react-native';
import {url} from '../secrets';
import { func } from 'prop-types';

export const USER_KEY = "auth-demo-key";

export function getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

export default async function (text, body) {
    let additions = {};
    let userDetails = await AsyncStorage.getItem(USER_KEY);
    if(userDetails !== null){
        console.log(userDetails);
        additions = JSON.parse(userDetails);
    }
    const bodyParameters = Object.assign(body, additions);
    console.log(bodyParameters);
    console.log("Fetching " + url + text + " body:" + getFormUrlEncoded(bodyParameters));
    var res = await fetch(url + text, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getFormUrlEncoded(bodyParameters)
    });
    console.log(res);
    return res;
}