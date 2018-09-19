import { AsyncStorage, Fetch } from "react-native";

import {apiid, token} from '../secrets';
export const USER_KEY = "auth-demo-key";

const urlBase = 'https://osm.scouts.org.nz/';

function getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

export async function onSignIn(username, password){
    const loginDetails = {
        email: username,
        password: password,
        apiid: apiid,
        token: token,
    }
    console.log(getFormUrlEncoded(loginDetails));
    var res = await fetch(urlBase + 'users.php?action=authorise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: getFormUrlEncoded(loginDetails)
    })
    var resJson = await res.json();
    if(resJson.error){
        throw Error(resJson.error.message);
    }
    resJson.apiid = apiid;
    resJson.token = token;
    console.log(resJson);
    return AsyncStorage.setItem(USER_KEY, JSON.stringify(resJson));
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};