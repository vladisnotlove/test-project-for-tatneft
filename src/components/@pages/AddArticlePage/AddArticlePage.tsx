import React from "react";
import AddArticleForm from "@/components/AddArticleForm";
import { useNavigate } from "react-router";
import { postArticleFx } from "@/api/articles/requests";
import routes from "@/constants/routes";

type AddArticlePageProps = {
	className?: string,
	children?: React.ReactNode,
}

const AddArticlePage: React.FC<AddArticlePageProps> = (
	{
		className,
	}
) => {
	const navigate = useNavigate();

	return <AddArticleForm
		className={className}
		title={"Создание статьи"}
		onSubmit={data => {
			postArticleFx(data).then(() => {
				navigate(routes.articles())
			})
		}}
	/>;
};

export default AddArticlePage;
