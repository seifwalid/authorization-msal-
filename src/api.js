const endpoint = {
    'ip': 'checkIP',
    'anid': 'CheckAnid',
    'location': 'CheckLocation',
    'adid': 'checkAdid',
    'idfa': 'checkAdid'
}

export function getAuth(instance, accounts) {
    const secret = sessionStorage.getItem('idToken')
    console.log("secret from getAuth: ", secret)

    // instance.acquireTokenSilent({
    //     ...loginRequest,
    //     account: accounts[0]
    // }).then((response) => {
    //     console.log(response.accessToken);
    //     console.log(response.idToken);
    // }
    //
}

export async function getApiData(searchType, searchData) {
    if (searchType === 'adid')
        searchData.DeviceIdType = 'ADID'
    else if (searchType === 'idfa') {
        searchData.adid = searchData.idfa
        searchData.idfa = undefined
        searchData.DeviceIdType = 'userIDFA'
    }

    console.log(searchData)
    getAuth()
    const resp = await fetch(`https://banlistlookup.azurewebsites.net/api/${endpoint[searchType]}`, {
         method: 'POST', body: JSON.stringify(searchData)
    })

    console.log(resp)
    if (!resp.ok)
        return { error: `${resp.status} - ${resp.statusText}` }

    const data = resp.json();

    return (data);
}
