import React, { useEffect, useState } from "react";
import { Button, CircularProgress, styled, Typography } from "@mui/material";
import { useList, useStore } from "effector-react";
import { $articles, $articlesLoaded, getArticlesFx, postArticleFx } from "@/api/articles/requests";
import ArticleCard from "@/components/ArticleCard";
import { useNavigate } from "react-router";
import routes from "@/constants/routes";

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

	const articlesJSX = useList($articles, (article) => {
		return <ArticleCard
			key={article.id}
			article={article}
		/>;
	});
	const articlesLoaded = useStore($articlesLoaded);

	useEffect(() => {
		getArticlesFx();
	}, []);

	return <Root className={className}>
		<FiltersContainer>
			filters
		</FiltersContainer>
		<ArticlesContainer>
			{!articlesLoaded && (
				<Loading/>
			)}
			{articlesLoaded && articlesJSX}
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
  grid-template-columns: 200px 1fr 200px;
  grid-template-areas: 
	"filters articles actions";
  gap: ${p => p.theme.spacing(5)};
  padding: ${p => p.theme.spacing(4, 2.5)};
`;

const Loading = styled((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}><CircularProgress/></div>)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FiltersContainer = styled("div")`
  grid-area: filters;
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

export default ArticleList;
