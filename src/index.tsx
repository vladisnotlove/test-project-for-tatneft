import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/App";

import "@/styles/fonts.sass";

const domNode = document.getElementById("root");
if (domNode) {
	const root = createRoot(domNode);
	root.render(
		<App />
	);
}



