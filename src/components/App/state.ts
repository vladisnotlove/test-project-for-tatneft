import { createEvent, createStore } from "effector";
import { ArticleModel } from "@/api/articles/models";
import { deleteArticleFx, getArticleFx, getArticlesFx, patchArticleFx, postArticleFx } from "@/api/articles/requests";
import { CommentModel } from "@/api/comments/models";
import { getCommentsEx, postCommentEx } from "@/api/comments/requests";
import deepEqual from "deep-equal"


// articles

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

// filters

type Filters = {
	publishDate: null | number,
	themes: string[],
	authors: string[],
}

const initialFilters: Filters = {
	publishDate: null,
	themes: [],
	authors: [],
};

export const filter = createEvent<Filters>();

export const $filters = createStore<[Filters, boolean]>([initialFilters, false])  // [filters, filtered]
	.on(filter, (state, payload) => {
		const applied = !deepEqual(payload, initialFilters);
		return [payload, applied];
	})

// search

export const search = createEvent<string>();

export const $searchText = createStore<[string, boolean]>(["", false])  // [search, searched]
	.on(search, (state, payload) => {
		const applied = payload.trim() !== "";
		return [payload, applied]
	})


// one article

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
