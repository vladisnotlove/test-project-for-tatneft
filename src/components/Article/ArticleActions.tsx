import React, { useRef, useState } from "react";
import { ArticleModel } from "@/api/articles/models";
import { useNavigate } from "react-router";
import routes from "@/constants/routes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
	IconButton,
	ListItemText,
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Button
} from "@mui/material";
import { deleteArticleFx } from "@/api/articles/requests";

type ArticleActionsProps = {
	className?: string,
	article: ArticleModel,
	children?: React.ReactNode,
}

const ArticleActions: React.FC<ArticleActionsProps> = (
	{
		className,
		article,
	}
) => {
	const navigate = useNavigate();
	const actionBtnRef = useRef<HTMLButtonElement>();

	const [actionOpen, setActionOpen] = useState(false);
	const [deleteOpen, setConfirmOpen] = useState(false);

	return <>
		<IconButton
			ref={actionBtnRef}
			onClick={() => {
				setActionOpen(true);
			}}
		>
			<MoreHorizIcon/>
		</IconButton>
		{/* menu */}
		<Menu
			open={actionOpen}
			anchorEl={actionBtnRef.current}
			onClose={() => setActionOpen(false)}
			elevation={5}
		>
			<MenuItem
				onClick={() => {
					navigate(routes.editArticle(article.id));
				}}
			>
				<ListItemText>Редактировать</ListItemText>
			</MenuItem>
			<MenuItem
				onClick={() => {
					setConfirmOpen(true);
					setActionOpen(false);
				}}
			>
				<ListItemText>Удалить</ListItemText>
			</MenuItem>
		</Menu>
		{/* delete dialog */}
		<Dialog open={deleteOpen}>
			<DialogTitle>
				Удаление
			</DialogTitle>
			<DialogContent>
				<Typography>
					Вы уверены что хотите удалить статью?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button variant={"text"} onClick={() => setConfirmOpen(false)}>
					Отмена
				</Button>
				<Button
					variant={"contained"}
					color={"error"}
					onClick={() => {
						deleteArticleFx(article.id).then(() => {
							navigate(routes.articles())
						})
					}}
				>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	</>;
};

export default ArticleActions;
