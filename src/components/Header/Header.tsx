import React from "react";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import routes from "@/constants/routes";

export const headerHeight = 7; // in spacings

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
		<Link to={routes.articles()}>
			articles-app
		</Link>
	</Root>;
};

const Root = styled("div")`
  display: flex;
  align-items: center;
  background: ${p => p.theme.palette.primary.light};
  padding: ${p => p.theme.spacing(0, 2.5)};
  height: ${p => p.theme.spacing(headerHeight)};
`;

export default Header;
