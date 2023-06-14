import React from "react";
import store from "./app/store";
import ReactDOM from "react-dom/client";
import Layout from "./template/Layout";
import { router } from "./router";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./assets/css/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
