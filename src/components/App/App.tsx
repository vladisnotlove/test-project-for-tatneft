import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleList from "@/components/ArticleList";
import AddArticleForm from "@/components/AddArticleForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import Article from "../Article/index";
import Header from "../Header/index";
import { CssBaseline } from "@mui/material";

import "@/configs/dayjs";  // configure dayjs

const App: React.FC = () => {
	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Header />
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
