import React from "react";
import { ArticleModel } from "@/api/articles/models";
import CommentIcon from '@mui/icons-material/Comment';
import { Chip, styled, Typography } from "@mui/material";
import dayjs from "dayjs";

type ArticleCardProps = {
	className?: string,
	article: ArticleModel
}

const ArticleCard: React.FC<ArticleCardProps> = (
	{
		className,
		article,
	}
) => {

	return <Root className={className}>
		<Poster />
		<Main>
			<Header>
				<Chip variant={"outlined"} label={article.theme} size={"small"} />
				<Typography variant={"body2"} color={"text.secondary"}>
					{article.author}
				</Typography>
			</Header>
			<Typography variant={"h5"}>
				{article.title}
			</Typography>
			<Typography variant={"body1"}>
				{article.shortText}
			</Typography>
			<Footer>
				<Stat>
					<CommentIcon fontSize={"small"} />
					{article.commentsCount}
				</Stat>
				<PublishDate>
					{dayjs(article.publishDate).format("DD.MM.YYYY")}
				</PublishDate>
			</Footer>
		</Main>
	</Root>;
};

const Root = styled("div")`
  border-radius: ${p => p.theme.shape.borderRadius * 2}px;
  overflow: hidden;
`

const Poster = styled("div")`
  background: #C2C8C7;
  height: 180px;
`

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(1.75)};
  background: ${p => p.theme.palette.background.paper};
  padding: ${p => p.theme.spacing(2)};
`

const Header = styled("div")`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(1.25)};
`

const Footer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing(1.25)};
`

const Stat = styled("div")`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(0.5)};
  ${p => p.theme.typography.body2};
  
  .MuiSvgIcon-root {
	color: ${p => p.theme.palette.text.moreSecondary};
  }
`

const PublishDate = styled("div")`
  font-size: ${p => p.theme.typography.body2.fontSize};
  color: ${p => p.theme.palette.text.moreSecondary}
`

export default ArticleCard;
