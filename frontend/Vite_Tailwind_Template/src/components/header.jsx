import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function Header() {
	let { user, logoutUser } = useContext(AuthContext);
	return (
		<div>
			<Link to={"/"}>Home</Link>
			<span> | </span>
			{user ? (
				<p onClick={logoutUser}>Logout</p>
			) : (
				<Link to="/login">Login</Link>
			)}

			{user && <p>hello {user.username}</p>}
		</div>
	);
}
