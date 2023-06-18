import { createEffect } from "effector";
import { ArticleModel } from "./models";
import wait from "@/api/@helpers/wait";
import dayjs from "dayjs";

export type GetArticlesParams = {
	searchText?: string,
	themes?: string[],
	authors?: string[],
	publishDate?: number,
}

const normalizeString = (str: string) => {
	return str.toLowerCase().trim();
}

export const getArticlesFx = createEffect(async (params?: GetArticlesParams) => {

	// get articles
	const raw = localStorage.getItem("articles");
	let articles = raw ? JSON.parse(raw) as ArticleModel[] : [];

	// filter articles
	if (params) {
		const normalSearchText = params.searchText ? normalizeString(params.searchText) : undefined;

		articles = articles.filter(article => {
			const normalTitle = normalizeString(article.title);
			const normalTheme = normalizeString(article.theme);

			if (params.authors && params.authors.length > 0) {
				if (!params.authors.includes(article.author)) return false;
			}
			if (params.themes && params.themes.length > 0) {
				if (!params.themes.includes(article.theme)) return false;
			}
			if (params.publishDate) {
				const onlyDate = (date: number) => dayjs(date).format("DD-MM-YYYY")
				if (onlyDate(params.publishDate) !== onlyDate(article.publishDate)) return false;
			}
			if (normalSearchText) {
				if ((
					!normalTitle.includes(normalSearchText)
				) && (
					!normalTheme.includes(normalSearchText)
				)) return false;
			}
			return true;
		});
	}

	await wait(600);
	return articles;
});

export const getArticleFx = createEffect(async (id: number) => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const index = articles.findIndex(article => article.id === id);
	await wait(600);
	if (index === -1) return null;
	return articles[index];
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
	await wait(600);
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
	await wait(600);
	return changedArticle;
});

export const deleteArticleFx = createEffect(async (id: number) => {
	const raw = localStorage.getItem("articles");
	const articles = raw ? JSON.parse(raw) as ArticleModel[] : [];
	const changedArticles = articles.filter(article => article.id !== id);
	localStorage.setItem("articles", JSON.stringify(changedArticles));
	await wait(600);
	return id;
});

