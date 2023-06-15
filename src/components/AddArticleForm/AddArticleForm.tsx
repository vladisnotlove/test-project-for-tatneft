import React from "react";

type AddArticleProps = {
	className?: string,
	children?: React.ReactNode,
}

const AddArticleForm: React.FC<AddArticleProps> = (
	{
		className,
	}
) => {

	return <div
		className={className}
	>
		add
	</div>;
};

export default AddArticleForm;
