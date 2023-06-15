import React from "react";

type ArticleProps = {
	className?: string,
	children?: React.ReactNode,
}

const Article: React.FC<ArticleProps> = (
	{
		className,
	}
) => {
	return <div
		className={className}
	>
		article
	</div>;
};

export default Article;
