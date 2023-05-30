import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/authContext";
import { Trash } from "heroicons-react";

export default function NoteDetailed() {
	const [note, setNote] = useState([{}]);
	const { user } = useContext(AuthContext);
	const [hasSubmitted, setHasSubmitted] = useState(0);
	const [form, setForm] = useState({
		body: "",
	});
    
    const history = useNavigate()

	const parameter = useParams();
	console.log(parameter);
	useEffect(() => {
		getNote();
		return () => {};
	}, [hasSubmitted]);

	async function getNote() {
		let response = await fetch(
			`http://127.0.0.1:8000/api/notes/${user.username}/${parameter.id}`
		);
		let data = await response.json();
		setNote(data);
	}

	async function sendNote() {
		let response = await fetch(
			`http://127.0.0.1:8000/api/notes/${user.username}/${parameter.id}`,
			{
				headers: {
					"Content-Type": " application/json",
				},
				method: "PUT",
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

	/**@param {Event} event */
	function handleChange(event) {
		const { name, value } = event.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(form);
	}

	async function deleteNote() {
		let response = await fetch(
			`http://127.0.0.1:8000/api/notes/${user.username}/${parameter.id}`,
			{
				headers: {
					"Content-Type": " application/json",
				},
				method: "DELETE",
			}
		);
        history('/todo')
	}

	return (
		<section className="container mx-auto mt-3">
			<div>NoteDetailed {parameter.id}</div>
			<div className="flex justify-between ">
				<div>{note.body}</div>
				<button onClick={deleteNote} className="text-rose-900 bg-red-100 p-2 rounded-full hover:bg-rose-200 transition-all duration-300">
					<Trash />
				</button>
			</div>
			<h1 className="text-2xl font-bold">Edit NOTE HERE</h1>
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
		</section>
	);
}
