import React from 'react';
import './index.css';
import App, { loader as rootLoader } from "./App";
import Map from "./MyMap"
//import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route
      path="/"
      element={<App />}
      /* loader={rootLoader}
      action={rootAction} */
      errorElement={<ErrorPage />}
    />
 
    <Route
      path="/map"
      element={<Map />}
      /* loader={rootLoader}
      action={rootAction} */
      errorElement={<ErrorPage />}
    />
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
