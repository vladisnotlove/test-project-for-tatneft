import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticleList from "@/components/ArticleList";
import AddArticleForm from "@/components/AddArticleForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import Article from "../Article/index";
import Header from "../Header/index";
import { CssBaseline } from "@mui/material";

import "@/styles/reset.sass";
import "@/styles/fonts.sass";
import "@/styles/global.sass";

import "@/configs/dayjs";
import Layout from "@/components/@layouts/Layout";  // configure dayjs

const App: React.FC = () => {
	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path={"/"} element={<ArticleList />} />
					<Route path={"/add"} element={<AddArticleForm />} />
					<Route path={"/:articleId"} element={<Article />} />
					<Route path={"/:articleId/edit"} element={<AddArticleForm />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	</ThemeProvider>
};


export default App;
