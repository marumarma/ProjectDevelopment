import React from "react";
import * as  ReactDOMClient  from "react-dom/client";
import App from "./App";

const app1 = ReactDOMClient.createRoot(document.getElementById("app1"))
app1.render(
        <App/>
)
