import { Route, redirect } from "react-router-dom";

// export default function PrivateRoute({ children, ...rest }) {
// 	return <Route {...rest} >{children}</Route>;
// }
import React from "react";

export default function PrivateRoute({ children, ...rest }) {
	const authenticated = false;

	return (
		<Route {...rest}>
			{!authenticated ? children : redirect("/login")}
		</Route>
	);
}
