export type CommentModel = {
	id: number,
	articleId: number,
	author: {
		name: string,
	}
	text: string,
	createDate: number,
}