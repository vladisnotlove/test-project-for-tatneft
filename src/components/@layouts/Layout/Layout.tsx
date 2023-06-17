import React from "react";
import { styled } from "@mui/material";
import Header, { headerHeight } from "@/components/Header";


type LayoutProps = {
	className?: string,
	children?: React.ReactNode,
}

const Layout: React.FC<LayoutProps> = (
	{
		className,
		children,
	}
) => {

	return <Root
		className={className}
	>
		<StyledHeader />
		<Content>
			{children}
		</Content>
	</Root>;
};

const Root = styled("div")`
  min-height: 100vh;
`

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 2;
`

const Content = styled("div")`
  min-height: calc(100vh - ${p => p.theme.spacing(headerHeight)});
  padding-bottom: ${p => p.theme.spacing(3)};
  height: 1px;
`

export default Layout;
