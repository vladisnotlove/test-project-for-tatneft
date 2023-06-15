import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleList from "@/components/ArticleList";
import AddArticleForm from "@/components/AddArticleForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import Article from "../Article/index";

type AppProps = {
	className?: string,
	children?: React.ReactNode,
}

const App: React.FC<AppProps> = (
	{
		className,
	}
) => {
	const [counter, setCounter] = useState(0);

	return <ThemeProvider theme={theme}>
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<ArticleList />} />
				<Route path={"/add"} element={<AddArticleForm />} />
				<Route path={"/:articleId"} element={<Article />} />
				<Route path={"/:articleId/edit"} element={<AddArticleForm />} />
			</Routes>
		</BrowserRouter>
	</ThemeProvider>
};


export default App;
