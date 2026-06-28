import { React, ReactDOM } from "./react.js";
import { App } from "./App.jsx";

// ReactアプリをHTMLのroot要素に表示します
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<App />);
