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
	const newArticles = [...articles, newArticle];
	localStorage.setItem("articles", JSON.stringify(newArticles));
	await wait(1000);
	return newArticle;
});

export const deleteArticleFx = createEffect(async (id: number) => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const newArticles = articles.filter(article => article.id !== id);
	localStorage.setItem("articles", JSON.stringify(newArticles));
	await wait(1000);
	return id;
});

export const $articlesLoaded = createStore(false)
	.on(getArticlesFx.doneData, () => true)

export const $articles = createStore<ArticleModel[]>([])
	.on(getArticlesFx.doneData, (state, payload) => payload)
	.on(postArticleFx.doneData, (state, payload) => [...state, payload])
	.on(deleteArticleFx.doneData, (state, payload) => state.filter(article => article.id !== payload))

