export type CommentModel = {
	id: number,
	articleId: number,
	author?: string,
	text: string,
	createDate: number,
}