import { createStore } from "effector";
import { CommentModel } from "@/api/comments/models";
import { createEffect } from "effector/compat";
import wait from "@/api/@helpers/wait";
import { ArticleModel } from "@/api/articles/models";

type GetCommentsParams = {articleId: number}

export const getCommentsEx = createEffect(async (params: GetCommentsParams) => {
	const raw = localStorage.getItem("comments");
	let comments = raw ? JSON.parse(raw) as CommentModel[] : [];
	comments = comments.filter(comment => comment.articleId === params.articleId);
	await wait(600);
	return comments;
})

type PostCommentBody = Pick<CommentModel, "articleId" | "author" | "text">

export const postCommentEx = createEffect(async (data: PostCommentBody) => {
	// save comment
	const newComment: CommentModel = {
		...data,
		id: Date.now(),
		createDate: Date.now(),
	}
	let raw = localStorage.getItem("comments");
	let comments = raw ? JSON.parse(raw) as CommentModel[] : [];
	comments = [...comments, newComment];
	localStorage.setItem("comments", JSON.stringify(comments));

	// update comments count in article
	raw = localStorage.getItem("articles");
	let articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	articles = articles.map(article => {
		if (article.id === data.articleId) return {
			...article,
			commentsCount: article.commentsCount + 1,
		}
		return article
	});
	localStorage.setItem("articles", JSON.stringify(articles));


	await wait(600);
	return newComment;
})

