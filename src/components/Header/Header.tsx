import React from "react";
import { styled } from "@mui/material";

type HeaderProps = {
	className?: string,
	children?: React.ReactNode,
}

const Header: React.FC<HeaderProps> = (
	{
		className,
	}
) => {
	return <Root
		className={className}
	>
		articles-app
	</Root>;
};

const Root = styled("div")`
  display: flex;
  align-items: center;
  background: ${p => p.theme.palette.primary.light};
  padding: ${p => p.theme.spacing(0, 2.5)};
  height: ${p => p.theme.spacing(7)};
`;

export default Header;
