import React from "react";
import ArticleList from "@/components/ArticleList";

type ArticlesPageProps = {
	className?: string,
	children?: React.ReactNode,
}

const ArticlesPage: React.FC<ArticlesPageProps> = (
	{
		className,
	}
) => {
	return <ArticleList className={className} />
};

export default ArticlesPage;
