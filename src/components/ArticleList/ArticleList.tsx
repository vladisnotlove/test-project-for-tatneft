import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, CircularProgress, styled, Typography } from "@mui/material";
import { useStore, useEvent } from "effector-react";
import { getArticlesFx, GetArticlesParams, postArticleFx } from "@/api/articles/requests";
import ArticleCard from "@/components/ArticleCard";
import { useNavigate } from "react-router";
import routes from "@/constants/routes";
import ArticleFilters, { FormValues } from "@/components/ArticleList/ArticleFilters";
import ArticleSearch from "@/components/ArticleList/ArticleSearch";
import {
	$articles,
	$filters,
	$searchText,
	filter,
	search
} from "@/components/App/state";
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

	const loadingArticles = useStore(getArticlesFx.pending);
	const articles = useStore($articles);

	const [filters, filtered] = useStore($filters);
	const filterFn = useEvent(filter);

	const [searchText, searched] = useStore($searchText);
	const searchFn = useEvent(search);

	useEffect(() => {
		const params: GetArticlesParams = {
			...filters,
			searchText,
		}
		getArticlesFx(filtered || searched ? params : undefined);
	}, [filters, filtered, searchText, searched]);

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
					onSubmit={searchFn}
					defaultValue={searchText}
					enableClear={searched}
				/>
				<ArticleFilters
					onSubmit={filterFn}
					defaultValues={filters}
					disableReset={!filtered}
				/>
			</FiltersPane>
		}
	>
		{loadingArticles && (
			<Loading/>
		)}
		{!loadingArticles &&
			<ArticleCards>
				{!loadingArticles && articles.map((article) => {
					return <ArticleCard
						key={article.id}
						article={article}
					/>;
				})}
			</ArticleCards>
		}
		{!loadingArticles && articles.length === 0 && !filtered && !searched &&
			<Typography color={"text.secondary"}>
				Нет статей
			</Typography>
		}
		{!loadingArticles && articles.length === 0 && (filtered || searched) &&
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

const ArticleCards = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-area: main;
  gap: ${p => p.theme.spacing(3)};
`;

const Loading = styled((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}><CircularProgress/></div>)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ArticleList;
