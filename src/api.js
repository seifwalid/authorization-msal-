import {loginRequest} from "./authConfig";

const endpoint = {
    'ip': 'CheckIP',
    'anid': 'CheckAnid',
    'location': 'CheckLocation',
    'adid': 'CheckAdid',
    'idfa': 'CheckAdid'
}

function isTokenExpired(expirationTime) {
    const now = new Date();
    const expirationDate = new Date(expirationTime);
    return now > expirationDate;
}

async function getAuth(instance, accounts) {
    const response = (await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    }))

    if(isTokenExpired(response.expiresOn))
       return (await instance.acquireTokenPopup()).idToken

    return response.idToken
}

export async function getApiData(searchType, searchData, instance, accounts) {
    if (searchType === 'adid')
        searchData.DeviceIdType = 'ADID'
    else if (searchType === 'idfa') {
        searchData.adid = searchData.idfa
        searchData.idfa = undefined
        searchData.DeviceIdType = 'userIDFA'
    }

    console.log('searching for banned device details:', searchData)
    const auth = await getAuth(instance, accounts)
    console.log('Auth header: ', auth)
    const resp = await fetch(`https://banlistlookup.azurewebsites.net/api/${endpoint[searchType]}`, {
        headers: {
            'Authorization': auth
        },
        method: 'POST', body: JSON.stringify(searchData)
    })

    console.log(resp)
    if (!resp.ok)
        return { error: `${resp.status} - ${resp.statusText}` }

    const data = resp.json();

    return (data);
}
