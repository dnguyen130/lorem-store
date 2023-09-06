import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";
import "./styles/index.css";

import { store } from "./app/store";
import { Provider } from "react-redux";

axios.defaults.baseURL = "https://lorem-store-api-production.up.railway.app";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
