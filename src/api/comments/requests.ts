import { createStore } from "effector";
import { CommentModel } from "@/api/comments/models";
import { createEffect } from "effector/compat";
import wait from "@/api/@helpers/wait";

type GetCommentsParams = {articleId: number}

export const getCommentsEx = createEffect(async (params: GetCommentsParams) => {
	const raw = localStorage.getItem("comments");
	let comments = raw ? JSON.parse(raw) as CommentModel[] : [];
	comments = comments.filter(comment => comment.articleId === params.articleId);
	await wait(1000);
	return comments;
})

type PostCommentBody = Pick<CommentModel, "articleId" | "author" | "text">

export const postCommentEx = createEffect(async (data: PostCommentBody) => {
	const newComment: CommentModel = {
		...data,
		id: Date.now(),
		createDate: Date.now(),
	}
	const raw = localStorage.getItem("comments");
	let comments = raw ? JSON.parse(raw) as CommentModel[] : [];
	comments = [...comments, newComment];
	localStorage.setItem("comments", JSON.stringify(comments));
	await wait(1000);
	return newComment;
})

