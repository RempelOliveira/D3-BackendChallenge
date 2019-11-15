import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../Shared/styles/styles.scss";

import Home from "./views/Home";
import PageNotFound from "./views/404";

function Router()
{
	return	(
		<BrowserRouter>
			<Switch>

				<Route exact path="/(|home)" component={ Home } />

				<Route
					component={ PageNotFound }

				/>

			</Switch>
		</BrowserRouter>

	);

}

export default Router;