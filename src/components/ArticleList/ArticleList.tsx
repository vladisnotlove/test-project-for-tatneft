import React from "react";
import { Link } from "react-router-dom";

type ArticleListProps = {
	className?: string,
	children?: React.ReactNode,
}

const ArticleList: React.FC<ArticleListProps> = (
	{
		className,
	}
) => {
	return <div className={className}>
		{(new Array(10).fill(0)).map((_value, index) => (
			<div key={index}>
				<Link to={"/" + index}>
					{index}
				</Link>
			</div>
		))}
	</div>;
};

export default ArticleList;
