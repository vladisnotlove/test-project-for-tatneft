import { createStore, createEffect } from "effector";
import { ArticleModel } from "./models";
import wait from "@/api/@helpers/wait";

export const getArticlesFx = createEffect(async () => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	await wait(1000);
	return articles;
});

type PostArticleBody = Pick<ArticleModel, "author" | "theme" | "title" | "text" | "publishDate">

export const postArticleFx = createEffect(async (data: PostArticleBody) => {
	// create new article
	const newArticle: ArticleModel = {
		id: Date.now(),
		...data,
		shortText: data.text.trim().split(" ").slice(0, 5).join(" "),
		commentsCount: 0,
	}
	// save to local storage
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const changedArticles = [newArticle, ...articles];
	localStorage.setItem("articles", JSON.stringify(changedArticles));
	await wait(1000);
	return newArticle;
});

type PatchArticleBody = Partial<PostArticleBody> & Pick<ArticleModel, "id">

export const patchArticleFx = createEffect(async (data: PatchArticleBody) => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const changedArticles = articles.map(article => {
		if (data.id === article.id) return {
			...article,
			...data,
		};
		return article;
	});
	localStorage.setItem("articles", JSON.stringify(changedArticles));
	const changedArticle = changedArticles.find(article => article.id === data.id);
	await wait(1000);
	return changedArticle;
});

export const deleteArticleFx = createEffect(async (id: number) => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const changedArticles = articles.filter(article => article.id !== id);
	localStorage.setItem("articles", JSON.stringify(changedArticles));
	await wait(1000);
	return id;
});

export const $articlesLoaded = createStore(false)
	.on(getArticlesFx.doneData, () => true)

export const $articles = createStore<ArticleModel[]>([])
	.on(getArticlesFx.doneData, (state, payload) => payload)
	.on(postArticleFx.doneData, (state, payload) => [payload, ...state])
	.on(patchArticleFx.doneData, (state, payload) => {
		return state.map(article => {
			if (article.id === payload.id) return payload;
			return article
		})
	})
	.on(deleteArticleFx.doneData, (state, payload) => {
		return state.filter(article => article.id !== payload)
	})

export const $themes = createStore<string[]>([])
	.on($articles, (state, payload) => {
		const allThemes = payload.map(article => article.theme);
		return [...new Set(allThemes)]; // remove duplicates
	})

export const $authors = createStore<string[]>([])
	.on($articles, (state, payload) => {
		const allAuthors = payload.map(article => article.author);
		return [...new Set(allAuthors)]; // remove duplicates
	})

