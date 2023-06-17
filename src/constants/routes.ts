const routePatterns = {
	articles: () => "/",
	article: () => `/:articleId/`,
	editArticle: () => `/:articleId/edit/`,
	addArticle: () => "/add/",
}

const routes = {
	articles: () => "/",
	article: (id: number) => `/${id}/`,
	editArticle: (id: number) => `/${id}/edit/`,
	addArticle: () => "/add/",
}

export default routes;
export {
	routePatterns
}