import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "effector-react";
import { $articles, $articlesLoaded, getArticlesFx } from "@/api/articles/requests";
import { useParams } from "react-router";
import { styled, Typography, CircularProgress, TypographyProps } from "@mui/material";
import ArticleBlock from "@/components/Article/ArticleBlock";

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
	>
		<Content>
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
		</Content>
	</Root>;
};

const Root = styled("div")`
  display: grid;
  grid-template-columns: 200px minmax(400px, 1fr) 200px;
  grid-template-areas: 
	". content .";
  gap: ${p => p.theme.spacing(3)};
  min-height: 100%;
`;

const Content = styled("div")`
  position: relative;
  grid-area: content;
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
