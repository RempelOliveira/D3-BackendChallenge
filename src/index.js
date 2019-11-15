import React from "react";
import ReactDOM from "react-dom";

import Router from "./App/Router";
import * as sw from "./serviceWorker";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt, faStreetView, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

library.add(faMapMarkerAlt, faStreetView, faExclamationTriangle);

ReactDOM.render(
	<Router />, document.getElementById("root"));

sw.unregister();