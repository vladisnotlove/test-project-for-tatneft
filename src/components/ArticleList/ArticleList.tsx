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
		}
	}, [filters, searchText])

	useEffect(() => {
		if (!articlesLoaded) getArticlesFx();
	}, [articlesLoaded]);

	const filteredArticles = useFilteredArticles(articles, params);

	return <Root className={className}>
		<FiltersContainer>
			<ArticleSearch
				onSubmit={setSearchText}
			/>
			<ArticleFilters
				onSubmit={setFilters}
			/>
		</FiltersContainer>
		<ArticlesContainer>
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
		</ArticlesContainer>
		<ActionsContainer>
			<Button
				variant={"contained"}
				onClick={() => {
					navigate(routes.addArticle());
				}}
			>
				+ написать статью
			</Button>
		</ActionsContainer>
	</Root>;
};

const Root = styled("div")`
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  grid-template-areas: 
	"filters articles actions";
  gap: ${p => p.theme.spacing(5)};
  padding: ${p => p.theme.spacing(4, 2.5)};
`;

const FiltersContainer = styled("div")`
  grid-area: filters;
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(5)};
`;

const ArticlesContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-area: articles;
  gap: ${p => p.theme.spacing(3)}
`;

const ActionsContainer = styled("div")`
  grid-area: actions;
`;

const Loading = styled((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}><CircularProgress/></div>)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ArticleList;
