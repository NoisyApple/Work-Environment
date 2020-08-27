import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// import data from "./db.json";

// let requestOptions = {
//   method: "PUT",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// };

// fetch(
//   "https://work-environment-664b6.firebaseio.com/.json",
//   requestOptions
// ).then((res) => console.log(res));

ReactDOM.render(<App />, document.querySelector("#root"));
