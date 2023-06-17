import dayjs from "dayjs";
import { ArticleModel } from "@/api/articles/models";
import { useMemo } from "react";

const normalizeString = (str: string) => {
	return str.toLowerCase().trim();
}

type FilterParams = {
	searchText?: string,
	themes?: string[],
	authors?: string[],
	publishedDate?: number,
}

const useFilteredArticles = (articles: ArticleModel[], params: FilterParams) => {
	return useMemo(() => {
		const normalSearchText = params.searchText ? normalizeString(params.searchText) : undefined;
		const normalSearchWords = normalSearchText ? normalSearchText.split(" ") : undefined;

		return articles.filter(article => {
			const normalTile = normalizeString(article.title);
			const normalTheme = normalizeString(article.theme);

			if (params.authors && params.authors.length > 0) {
				if (!params.authors.includes(article.author)) return false;
			}
			if (params.themes && params.themes.length > 0) {
				if (!params.themes.includes(article.theme)) return false;
			}
			if (params.publishedDate) {
				if (dayjs(params.publishedDate).diff(dayjs(article.publishDate), "d") !== 0) return false;
			}
			if (normalSearchText && normalSearchWords) {
				if ((
					!normalTile.includes(normalSearchText)
				) && (
					!normalSearchWords.includes(normalTheme)
				)) return false;
			}
			return true;
		});
	}, [articles, params]);
};

export default useFilteredArticles;