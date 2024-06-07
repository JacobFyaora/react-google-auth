import {useEffect, useState} from "react";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout} from "react-google-login";
import "./App.css";
import {gapi} from "gapi-script";

const clientId = "87256956143-asnok5obs605equ5n3hkbh8pvjtsm395.apps.googleusercontent.com"; //* you can use your own if you want, normally I should be secret by returning it from backend, but I wanted to create just a simple demo so I didn't see the reason to create backend for that app

function App() {
	const [result, setResult] = useState<string>("");

	useEffect(() => {
		function start() {
			gapi.client.init({clientId: clientId, scope: ""});
		}

		gapi.load("client:auth2", start);
	}, []);

	//* If we would like to use that google api script on a backend we could use that accessToken
	// const accessToekn = gapi.auth.getToken().access_token;

	const onSuccess = (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		if ("getBasicProfile" in data) {
			const name = data.getBasicProfile().getName();
			console.log(name);
			setResult(`Welcome on the board ${name}!`);
		} else {
			setResult(`Welcome on the board!`);
		}
	};

	const onFailure = () => {
		setResult("We couldn't log you in, try again");
	};

	const onLogoutSuccess = () => {
		setResult("We couldn't log you out, try again");
	};

	return (
		<div style={{display: "flex", flexDirection: "column", gap: "32px"}}>
			<GoogleLogin clientId={clientId} buttonText="Login with Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={"single_host_origin"} isSignedIn={true} />
			<GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onLogoutSuccess} />
			<span>{result}</span>
		</div>
	);
}

export default App;
