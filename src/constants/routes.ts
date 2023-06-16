const routes = {
	articles: () => "/",
	article: (id: number) => `/${id}/`,
	editArticle: (id: number) => `/${id}/edit/`,
	addArticle: (id: number) => "/add/",
}

export default routes;