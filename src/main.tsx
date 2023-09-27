// React
import React from "react";
import ReactDOM from "react-dom/client";

// Styles
import "./styles/index.css";

//Components
import App from "./App.tsx";
import Home from "./routes/Home/index.tsx";

// Redux
import { store } from "./app/store";
import { Provider } from "react-redux";

// Axios
import axios from "axios";
axios.defaults.baseURL = "https://lorem-store-api-production.up.railway.app";

//React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProduct from "./routes/CreateProduct/index.tsx";
import ProductPage from "./routes/Product/index.tsx";
import Cart from "./routes/Cart/index.tsx";
import Login from "./routes/Login/index.tsx";
import Profile from "./routes/Profile/index.tsx";
import Signup from "./routes/Signup/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: "createproduct",
				element: <CreateProduct />
			},
			{
				path: "product/:productId",
				element: <ProductPage />
			},
			{
				path: "cart",
				element: <Cart />
			},
			{
				path: "profile",
				element: <Profile />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "signup",
				element: <Signup />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
