import React from "react";
import { ArticleModel } from "@/api/articles/models";
import { Chip, styled, Typography } from "@mui/material";
import ArticleActions from "@/components/Article/ArticleActions";
import CommentIcon from "@mui/icons-material/Comment";
import dayjs from "dayjs";

// Components

// Stores, utils, libs


type ArticleBlockProps = {
	className?: string,
	article: ArticleModel,
	children?: React.ReactNode,
}

const ArticleBlock: React.FC<ArticleBlockProps> = (
	{
		className,
		article,
	}
) => {
	return <Root className={className}>
		<Poster/>
		<Main>
			<Header>
				<HeaderMain>
					<Chip variant={"outlined"} label={article.theme} size={"small"}/>
					<Typography variant={"body2"} color={"text.secondary"}>
						{article.author}
					</Typography>
				</HeaderMain>
				<ArticleActions
					article={article}
				/>
			</Header>
			<Typography variant={"h4"}>
				{article.title}
			</Typography>
			<Footer>
				<Stat>
					<CommentIcon fontSize={"small"}/>
					{article.commentsCount}
				</Stat>
				<PublishDate>
					{dayjs(article.publishDate).format("DD.MM.YYYY")}
				</PublishDate>
			</Footer>
			<Typography variant={"body1"}>
				{article.text}
			</Typography>
		</Main>
	</Root>;
};

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom-left-radius: ${p => p.theme.shape.borderRadius * 2}px;
  border-bottom-right-radius: ${p => p.theme.shape.borderRadius * 2}px;
`;

const Poster = styled("div")`
  background: #C2C8C7;
  height: 220px;
`;

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(1.75)};
  background: ${p => p.theme.palette.background.paper};
  padding: ${p => p.theme.spacing(3)};
`;

const Header = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing(1.25)};
`;

const HeaderMain = styled("div")`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(1.25)};
`;


const Footer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing(1.25)};
`;

const Stat = styled("div")`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(0.5)};
  ${p => p.theme.typography.body2};

  .MuiSvgIcon-root {
    color: ${p => p.theme.palette.text.moreSecondary};
  }
`;

const PublishDate = styled("div")`
  font-size: ${p => p.theme.typography.body2.fontSize};
  color: ${p => p.theme.palette.text.moreSecondary}
`;

export default ArticleBlock;
