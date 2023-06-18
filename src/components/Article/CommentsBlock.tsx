import React, { useEffect } from "react";
import { CircularProgress, css, styled, Typography, TypographyProps } from "@mui/material";
import { useStore } from "effector-react";
import { $comments } from "@/components/App/state";
import { getCommentsEx, postCommentEx } from "@/api/comments/requests";
import SendCommentForm from "@/components/SendCommentForm";
import Comment from "@/components/Comment";

type CommentsBlockProps = {
	className?: string,
	children?: React.ReactNode,
	articleId: number,
}

const CommentsBlock: React.FC<CommentsBlockProps> = (
	{
		className,
		articleId,
	}
) => {
	const comments = useStore($comments);
	const loadingComments = useStore(getCommentsEx.pending);
	const sendingComment = useStore(postCommentEx.pending);

	useEffect(() => {
		getCommentsEx({ articleId });
	}, [articleId]);

	return <Root
		className={className}
	>
		<Typography variant={"h4"}>
			Комментарии
		</Typography>
		<StyledSendCommentForm
			onSubmit={(data) => {
				postCommentEx({
					articleId: articleId,
					...data,
				})
			}}
			loading={sendingComment}
		/>
		{loadingComments && <Loading />}
		{!loadingComments && comments.length > 0 &&
			<CommentList>
				{comments.map(comment => (
					<Comment comment={comment} />
				))}
			</CommentList>
		}
		{!loadingComments && comments.length === 0 &&
			<Typography color={"text.secondary"}>
				Нет комментариев
			</Typography>
		}
	</Root>;
};

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(3)};
  padding: ${p => p.theme.spacing(3)};
  border-radius: ${p => p.theme.shape.borderRadius * 2}px;
  background: ${p => p.theme.palette.background.paper};
`;

const StyledSendCommentForm = styled(SendCommentForm)`
  margin-bottom: ${p => p.theme.spacing(2)};
`

const CommentList = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(3)};
`;

const Loading = styled(
	(props: React.HTMLAttributes<HTMLDivElement>) => {
		return <div {...props}>
			<CircularProgress/>
		</div>;
	}
)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CommentsBlock;
