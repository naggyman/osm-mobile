import { AsyncStorage, Fetch } from "react-native";

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

export async function onSignIn(user, pass){
    var res = await fetch(urlBase + 'users.php?action=authorise', {
        method: 'POST',
        body: getFormUrlEncoded()
    })
    console.log(res);
    return AsyncStorage.setItem(USER_KEY, "true");
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