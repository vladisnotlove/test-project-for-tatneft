import React from "react";
import AddArticleForm from "@/components/AddArticleForm";
import { useNavigate } from "react-router";
import { postArticleFx } from "@/api/articles/requests";
import routes from "@/constants/routes";
import { useStore } from "effector-react";

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
	const posting = useStore(postArticleFx.pending);

	return <AddArticleForm
		className={className}
		title={"Создание статьи"}
		onSubmit={data => {
			postArticleFx(data).then(() => {
				navigate(routes.articles())
			})
		}}
		loading={posting}
	/>;
};

export default AddArticlePage;
