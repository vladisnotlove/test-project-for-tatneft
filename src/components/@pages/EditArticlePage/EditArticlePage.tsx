import React, { useEffect, useMemo } from "react";
import AddArticleForm from "@/components/AddArticleForm";
import { useNavigate, useParams } from "react-router";
import { getArticlesFx, patchArticleFx, postArticleFx } from "@/api/articles/requests";
import routes from "@/constants/routes";
import { useStore } from "effector-react";
import { ArticleModel } from "@/api/articles/models";
import { CircularProgress, Container, styled, Typography, TypographyProps } from "@mui/material";
import { $articles, $articlesLoaded } from "@/components/App/state";

type EditArticlePageProps = {
	className?: string,
	children?: React.ReactNode,
}

const EditArticlePage: React.FC<EditArticlePageProps> = (
	{
		className,
	}
) => {
	const navigate = useNavigate();
	const params = useParams();
	const id = useMemo<number | null>(() => {
		const id =  parseFloat(params.articleId);
		if (isNaN(id)) return null;
		return id;
	}, [params.articleId]);

	const articlesLoaded = useStore($articlesLoaded);
	const articles = useStore($articles);
	const article = useMemo<ArticleModel | null>(() => {
		if (id === null) return null;
		return articles.find(article => article.id === id);
	}, [articles, id]);

	useEffect(() => {
		if (!articlesLoaded) {
			getArticlesFx()
		}
	}, [articlesLoaded])

	const patching = useStore(patchArticleFx.pending);

	if (!articlesLoaded) {
		return <StyledContainer>
			<Loading />
		</StyledContainer>
	}

	if (articlesLoaded && !article) {
		return <StyledContainer>
			<NotFound>
				Статья для редактирования не найдена
			</NotFound>
		</StyledContainer>
	}

	return <AddArticleForm
		className={className}
		title={"Редактирование статьи"}
		onSubmit={data => {
			patchArticleFx({...data, id: article.id}).then(() => {
				navigate(routes.articles())
			})
		}}
		defaultValues={article}
		loading={patching}
	/>;
};

const StyledContainer = styled(Container)`
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

export default EditArticlePage;
