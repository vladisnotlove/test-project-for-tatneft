import React from "react";

type HeaderProps = {
	className?: string,
	children?: React.ReactNode,
}

const Header: React.FC<HeaderProps> = (
	{
		className,
	}
) => {
	return <div
		className={className}
	>
		header
	</div>;
};

export default Header;
