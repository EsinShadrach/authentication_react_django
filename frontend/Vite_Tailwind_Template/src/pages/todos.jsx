import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";

export default function Todo() {
	const { user } = useContext(AuthContext);
	const [notes, setNotes] = useState([{}]);
	const [form, setForm] = useState({
		body: "",
	});
	const [hasSubmitted, setHasSubmitted] = useState(0);

	useEffect(() => {
		getNotes();
		console.log("NUMBER OD RERENDERS");
		console.log(hasSubmitted);
		return () => {};
	}, [hasSubmitted]);

	async function getNotes() {
		let response = await fetch(
			`http://127.0.0.1:8000/api/notes/${user.username}`
		);
		let data = await response.json();
		setNotes(data);
	}

	function handleChange(event) {
		const { name, value } = event.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(form);
	}

	async function sendNote() {
		let response = await fetch(
			`http://127.0.0.1:8000/api/notes/${user.username}`,
			{
				headers: {
					"Content-Type": " application/json",
				},
				method: "POST",
				body: JSON.stringify(form),
			}
		);
		if (response.status === 200) {
			console.log("SUCCESS");
		} else {
			alert("ERROR");
			console.log(response.statusText);
		}
		setHasSubmitted((prev) => (prev += 1));
	}

	/**@param {Event} event */
	function handleSubmit(event) {
		event.preventDefault();
		sendNote();
	}

	return (
		<div>
			{notes.map((note) => (
				<div key={note.id}>
					<Link to={`/todo/${note.id}`}>
						<p>{note.body}</p>
						<br />
					</Link>
				</div>
			))}
			<div>
				<h1 className="text-2xl font-bold">ADD NOTE HERE</h1>
				<form action="" onSubmit={handleSubmit}>
					<textarea
						onChange={handleChange}
						name="body"
						cols="30"
						rows="10"
						className="border-2 rounded-md w-full max-w-md"
					/>
					<div>
						<button className="bg-emerald-100 border-emerald-200 text-emerald-900 font-bold w-full max-w-md py-1.5 border-2 rounded-md">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
