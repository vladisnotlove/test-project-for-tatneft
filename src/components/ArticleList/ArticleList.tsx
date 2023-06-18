import React, { useEffect, useMemo, useState } from "react";
import { Button, CircularProgress, styled, Typography } from "@mui/material";
import { useStore } from "effector-react";
import { getArticlesFx, postArticleFx } from "@/api/articles/requests";
import ArticleCard from "@/components/ArticleCard";
import { useNavigate } from "react-router";
import routes from "@/constants/routes";
import ArticleFilters, { FormValues } from "@/components/ArticleList/ArticleFilters";
import ArticleSearch from "@/components/ArticleList/ArticleSearch";
import useFilteredArticles from "@/components/ArticleList/useFilteredArticles";
import { $articles, $articlesLoaded } from "@/components/App/state";
import TwoPaneLayout from "@/components/@layouts/TwoPaneLayout/TwoPaneLayout";

type ArticleListProps = {
	className?: string,
	children?: React.ReactNode,
}

const ArticleList: React.FC<ArticleListProps> = (
	{
		className,
	}
) => {
	const navigate = useNavigate();

	const articlesLoaded = useStore($articlesLoaded);
	const articles = useStore($articles);

	const [filters, setFilters] = useState<FormValues>({
		authors: [],
		themes: [],
		publishDate: null,
	});
	const [searchText, setSearchText] = useState<string>("");

	const params = useMemo(() => {
		return {
			...filters,
			searchText
		};
	}, [filters, searchText]);

	useEffect(() => {
		if (!articlesLoaded) getArticlesFx();
	}, [articlesLoaded]);

	const filteredArticles = useFilteredArticles(articles, params);

	return <TwoPaneLayout
		className={className}
		right={
			<Button
				variant={"contained"}
				onClick={() => {
					navigate(routes.addArticle());
				}}
			>
				+ написать статью
			</Button>
		}
		left={
			<FiltersPane>
				<ArticleSearch
					onSubmit={setSearchText}
				/>
				<ArticleFilters
					onSubmit={setFilters}
				/>
			</FiltersPane>
		}
	>
		{!articlesLoaded && (
			<Loading/>
		)}
		{articlesLoaded && filteredArticles.map((article) => {
			return <ArticleCard
				key={article.id}
				article={article}
			/>;
		})}
		{articlesLoaded && articles.length === 0 &&
			<Typography color={"text.secondary"}>
				Нет статей
			</Typography>
		}
		{articlesLoaded && articles.length > 0 && filteredArticles.length === 0 &&
			<Typography color={"text.secondary"}>
				Статьи не найдены
			</Typography>
		}
	</TwoPaneLayout>;
};

const FiltersPane = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(5)};
`;

const Loading = styled((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}><CircularProgress/></div>)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ArticleList;
