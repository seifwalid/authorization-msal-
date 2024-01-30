import React, {useState} from "react";
import {MsalAuthenticationTemplate, useMsal} from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";
import {loginRequest} from "./authConfig";
import {PageLayout} from "./components/PageLayout";
import {APIData} from "./components/APIData";
import "./styles/App.css";
import Searchbar from "./components/Searchbar";
import {getApiData} from "./api.js";

/**
 * Renders name of the signed-in user and a button to retrieve data from an API
 */
const AppContent = () => {
	const {instance, accounts} = useMsal();

	const [apiData, setApiData] = useState(null);
	const [loadingSearch, setLoadingSearch] = useState(false);
	const onSearch = (searchType, searchData) => {
		setLoadingSearch(true);
		getApiData(searchType, searchData, instance).then((apiData) => {
			setApiData(apiData);
			setLoadingSearch(false);
		});
	};

	function CallAPI() {
		// Silently acquires an access token which is then attached to a request for API call
		instance.acquireTokenSilent({
			...loginRequest,
			account: accounts[0]
		}).then((response) => {
			console.log(response.accessToken);
			console.log(response.idToken);
			const res = JSON.parse(sessionStorage.getItem('msalResponse'));
			const clientId = res.account.idTokenClaims.aud;
			const clientSecret = res.account.idTokenClaims.client_secret;
			console.log('Client Id:', clientId);
			console.log('Client Secret', clientSecret);

			// fetch('https://banlistlookup.azurewebsites.net/api/HttpTrigger1', {
			// 	method: 'post',
			// 	headers: new Headers({
			// 		'Authorization': 'Bearer ' + response.accessToken,
			// 		'x-functions-key': 'hello',
			// 		'Accept': 'application/json'
			// 	})
			// })
			// 	.then(data => data.json())
			// 	.then(json => {
			// 		console.log(json);
			// 		setApiData(json);
			// 	});
		});
	}

	return (
		<>
			<h5 className="card-title mt-3 mb-3">Welcome {accounts[0].name}</h5>
			<Searchbar
				onSubmit={(type, data) => onSearch(type, data)}
				loading={loadingSearch}
			/>
			<APIData data={apiData}></APIData>
			<button type={"button"} onClick={CallAPI}>Call api</button>
		</>
	);
};

/**
 * If a user is authenticated the AppContent component above is rendered.
 * Otherwise, the content is not rendered.
 */
const MainContent = () => {
	return (
		<div className="App">
			{
				<MsalAuthenticationTemplate interactionType={InteractionType.Redirect}
																		authenticationRequest={loginRequest}>
					<AppContent/>
				</MsalAuthenticationTemplate>
			}

		</div>
	);
};

export default function App() {
	return (
		<PageLayout>
			<MainContent/>

		</PageLayout>
	);
}
