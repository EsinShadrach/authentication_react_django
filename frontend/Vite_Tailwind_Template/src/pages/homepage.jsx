import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function HomePage() {
	let { user, authToken, logoutUser } = useContext(AuthContext);
	let [notes, setNotes] = useState([]);

	const navigator = useNavigate();
	useEffect(() => {
		if (!user) {
			navigator("/login");
		} else {
			getNotes();
		}

		return () => {};
	}, []);

	// let getNotes = async () => {
	// 	let response = await fetch(`http://127.0.0.1:8000/api/notes/`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": " application/json",
	// 			'Authorization': "Bearer " + String(authToken.access),
	// 		},
	// 	});
	// 	let data = response.json();
	// 	// setNotes(data);
	// 	console.log(data);
	// 	console.log(authToken.access)
	// };
	let getNotes = async () => {
		try {
			let response = await fetch(`http://127.0.0.1:8000/api/notes/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authToken.access),
				},
			});

			if (response.status === 200) {
				let data = await response.json();
				setNotes(data);
			} else if (response.statusText === "Unauthorized") {
				logoutUser();
			} else {
				console.error("Error:", response.status);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<p>You are logged into the home page!</p>
			<ul className="marker:text-black list-disc pl-5">
				{notes.map((note) => (
					<li key={note.id}>{note.body}</li>
				))}
			</ul>
		</div>
	);
}
