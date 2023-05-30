import React from "react";
import {
	Route,
	BrowserRouter as Router,
	Routes
} from "react-router-dom";
import Header from "./components/header";
import { AuthProvider } from "./context/authContext";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import Todo from "./pages/todos";
import NoteDetailed from "./pages/note_detailed";

function App() {
	return (
		<div className="app">
			<Router>
				<AuthProvider>
					<Header />
					<Routes>
						<Route
							Component={HomePage}
							path="/"
							exact
						/>
						<Route Component={LoginPage} path="/login" />
						<Route Component={Todo} path="/todo" />
						<Route path="/todo/:id" Component={NoteDetailed} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
