import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "effector-react";
import { getArticlesFx } from "@/api/articles/requests";
import { useParams } from "react-router";
import { styled, Typography, CircularProgress, TypographyProps, Container } from "@mui/material";
import ArticleBlock from "@/components/Article/ArticleBlock";
import { $articles, $articlesLoaded } from "@/components/App/state";

type ArticleProps = {
	className?: string,
	children?: React.ReactNode,
}

const Article: React.FC<ArticleProps> = (
	{
		className,
	}
) => {
	const params = useParams();
	const id = useMemo<number | null>(() => {
		const value = parseFloat(params.articleId);
		if (isNaN(value)) return null;
		return value;
	}, [params]);

	const articlesLoaded = useStore($articlesLoaded);
	const articles = useStore($articles);
	const article = useMemo(() => {
		return articles.find(article => article.id === id) ?? null;
	}, [id, articles]);

	// fetch articles
	useEffect(() => {
		if (!articlesLoaded) getArticlesFx();
	}, [articlesLoaded]);

	return <Root
		className={className}
		maxWidth={"md"}
	>
		{!articlesLoaded &&
			<Loading />
		}
		{articlesLoaded && article &&
			<ArticleBlock article={article} />
		}
		{articlesLoaded && !article &&
			<NotFound>
				Статья не найдена
			</NotFound>
		}
	</Root>;
};

const Root = styled(Container)`
  position: relative;
  min-height: 100%;
`;

const Loading = styled((props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}><CircularProgress /></div>)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotFound = styled((props: TypographyProps) => <Typography color={"text.secondary"} {...props} />)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Article;
