import React from "react";
import { styled, Typography } from "@mui/material";
import { CommentModel } from "@/api/comments/models";
import dayjs from "dayjs";

type CommentProps = {
	className?: string,
	children?: React.ReactNode,
	comment: CommentModel,
}

const Comment: React.FC<CommentProps> = (
	{
		className,
		comment,
	}
) => {

	return <Root
		className={className}
	>
		<Author>
			<Avatar />
			<Typography variant={"body2"}>
				{comment.author.name}
			</Typography>
		</Author>
		<Typography variant={"body1"}>
			{comment.text}
		</Typography>
		<CreateDate>
			{dayjs(comment.createDate).toNow(true)}
		</CreateDate>
	</Root>;
}

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(1.5)}
`

const Author = styled("div")`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(1.5)}
`

const Avatar = styled("div")`
  width: ${p => p.theme.spacing(4)};
  height: ${p => p.theme.spacing(4)};
  border-radius: 50%;
  background: #D9D9D9;
`

const CreateDate = styled("div")`
  font-size: 12px;
  color: ${p => p.theme.palette.text.moreSecondary}
`

export default Comment;
