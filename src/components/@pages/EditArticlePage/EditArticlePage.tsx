import React, { useEffect, useMemo } from "react";
import AddArticleForm from "@/components/AddArticleForm";
import { useNavigate, useParams } from "react-router";
import { getArticleFx, patchArticleFx } from "@/api/articles/requests";
import routes from "@/constants/routes";
import { useStore } from "effector-react";
import { CircularProgress, Container, styled, Typography, TypographyProps } from "@mui/material";
import { $article } from "@/components/App/state";

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
		const value = parseFloat(params.articleId);
		if (isNaN(value)) return null;
		return value;
	}, [params]);

	const articleLoading = useStore(getArticleFx.pending);
	const article = useStore($article);

	// fetch article

	useEffect(() => {
		getArticleFx(id);
	}, [id]);

	const patching = useStore(patchArticleFx.pending);

	if (articleLoading) {
		return <StyledContainer>
			<Loading />
		</StyledContainer>
	}

	if (!articleLoading && !article) {
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
