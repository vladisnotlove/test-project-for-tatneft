import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routePatterns } from "@/constants/routes";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import Layout from "@/components/@layouts/Layout";
import ArticlesPage from "@/components/@pages/ArticlesPage";
import ArticlePage from "@/components/@pages/ArticlePage";
import AddArticlePage from "@/components/@pages/AddArticlePage";
import EditArticlePage from "@/components/@pages/EditArticlePage/EditArticlePage";

// global sass
import "@/styles/reset.sass";
import "@/styles/fonts.sass";
import "@/styles/global.sass";

// configure dayjs
import "@/configs/dayjs";

const App: React.FC = () => {
	return <ThemeProvider theme={theme}>  {/* mui theme */}
		<LocalizationProvider dateAdapter={AdapterDayjs}>  {/* mui date-pickers */}
			<CssBaseline />  {/* styles reset */}
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path={routePatterns.articles()} element={<ArticlesPage />} />
						<Route path={routePatterns.addArticle()} element={<AddArticlePage />} />
						<Route path={routePatterns.article()} element={<ArticlePage />} />
						<Route path={routePatterns.editArticle()} element={<EditArticlePage />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</LocalizationProvider>
	</ThemeProvider>
};


export default App;
