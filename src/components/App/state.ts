import { createStore } from "effector";
import { ArticleModel } from "@/api/articles/models";
import { deleteArticleFx, getArticleFx, getArticlesFx, patchArticleFx, postArticleFx } from "@/api/articles/requests";
import { CommentModel } from "@/api/comments/models";
import { getCommentsEx, postCommentEx } from "@/api/comments/requests";
import article from "@/components/Article";

export const $articlesLoaded = createStore(false)
	.on(getArticlesFx.doneData, () => true);

export const $articles = createStore<ArticleModel[]>([])
	.on(getArticlesFx.doneData, (state, payload) => payload)
	.on(postArticleFx.doneData, (state, payload) => [payload, ...state])
	.on(patchArticleFx.doneData, (state, payload) => {
		return state.map(article => {
			if (article.id === payload.id) return payload;
			return article;
		});
	})
	.on(deleteArticleFx.doneData, (state, payload) => {
		return state.filter(article => article.id !== payload);
	})
	.on(postCommentEx.doneData, (state, payload) => {
		return state.map(article => {
			if (article.id === payload.articleId) return {
				...article,
				commentsCount: article.commentsCount + 1
			}
			return article
		})
	});

export const $themes = createStore<string[]>([])
	.on($articles, (state, payload) => {
		const allThemes = payload.map(article => article.theme);
		return [...new Set(allThemes)]; // remove duplicates
	});

export const $authors = createStore<string[]>([])
	.on($articles, (state, payload) => {
		const allAuthors = payload.map(article => article.author);
		return [...new Set(allAuthors)]; // remove duplicates
	});

export const $article = createStore<ArticleModel | null>(null)
	.on(getArticleFx.doneData, (state, payload) => payload)
	.on(patchArticleFx.doneData, (state, payload) => {
		if (state.id === payload.id) return payload;
		return state;
	})
	.on(postCommentEx.doneData, (state, payload) => {
		if (state.id === payload.articleId) return {
			...state,
			commentsCount: state.commentsCount + 1
		}
		return state
	})

export const $comments = createStore<CommentModel[]>([])
	.on(getCommentsEx.doneData, (state, payload) => payload)
	.on(postCommentEx.doneData, (state, payload) => [...state, payload]);
