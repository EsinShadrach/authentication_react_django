import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	let token = localStorage.getItem("authTokens");
	const [loading, setLoading] = useState(true);
	let [user, setUser] = useState(() =>
		token ? jwt_decode(JSON.parse(token).access) : null
	);
	// ! THIS MEANS THAT IF THERE'S SOMETHING IN THE LOCAL STORAGE WE'D SET IT TO TOKEN OTHERWISE NULL
	let [authToken, setSetAuthToken] = useState(() =>
		token ? JSON.parse(token) : null
	);
	const history = useNavigate();

	/**@param  {Event} e*/
	let loginUser = async (e) => {
		e.preventDefault();

		let response = await fetch("http://127.0.0.1:8000/api/token/", {
			method: "POST",
			headers: {
				"Content-Type": " application/json",
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});
		let data = await response.json();

		if (response.status === 200) {
			setSetAuthToken(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			history("/");
		} else {
			alert("Some thing went wring");
		}
	};

	let logoutUser = () => {
		setSetAuthToken(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		history("/login");
	};
	// ! THERE'S A PROBLEM WITH THE UPDATE TOKEN
	let updateToken = async () => {
		console.log("updated token");
		let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": " application/json",
			},
			body: JSON.stringify({
				refresh: authToken?.refresh,
			}),
		});
		let data = await response.json();
		if (response.status === 200) {
			setSetAuthToken(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			logoutUser();
		}

		if (loading) {
			setLoading(false);
		}
	};

	let contextData = {
		user: user,
		authToken: authToken,
		loginUser: loginUser,
		logoutUser: logoutUser,
	};

	useEffect(() => {
		if (loading) {
			updateToken();
		}
		let fourMins = 1000 * 60 * 4;
		// ! 1000 milliseconds multiplied by 60 -> 1 mins then multiplied by 4 -> 4 mins
		let interval = setInterval(() => {
			if (authToken) {
				updateToken();
			}
		}, fourMins);

		return () => {
			clearInterval(interval);
		};
	}, [authToken, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
