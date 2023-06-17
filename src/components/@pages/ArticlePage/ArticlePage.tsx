import React from "react";
import Article from "@/components/Article";

type ArticlePageProps = {
	className?: string,
	children?: React.ReactNode,
}

const ArticlePage: React.FC<ArticlePageProps> = (
	{
		className,
	}
) => {

	return <Article className={className} />
};

export default ArticlePage;
