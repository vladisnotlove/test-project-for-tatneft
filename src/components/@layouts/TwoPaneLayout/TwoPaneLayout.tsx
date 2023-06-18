import React from "react";
import { styled } from "@mui/material";
import { headerHeight } from "@/components/Header";


type TwoPaneLayoutProps = {
	className?: string,
	children?: React.ReactNode,
	left?: React.ReactNode,
	right: React.ReactNode,
}

const TwoPaneLayout: React.FC<TwoPaneLayoutProps> = (
	{
		className,
		left,
		right,
		children,
	}
) => {

	return <Root
		className={className}
	>
		<Left>
			{left}
		</Left>
		<Main>
			{children}
		</Main>
		<Right>
			{right}
		</Right>
	</Root>;
};

const paddingTop = 4;

const Root = styled("div")`
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  grid-template-areas: 
	"left main right";
  gap: ${p => p.theme.spacing(5)};
  padding: ${p => p.theme.spacing(paddingTop, 2.5)};
`;

const Left = styled("div")`
  position: sticky;
  top: ${p => p.theme.spacing(paddingTop + headerHeight)};
  grid-area: left;
  align-self: start;
`;

const Main = styled("div")`
  height: fit-content;
`;

const Right = styled("div")`
  position: sticky;
  top: ${p => p.theme.spacing(paddingTop + headerHeight)};
  grid-area: right;
  align-self: start;
`;

export default TwoPaneLayout;
