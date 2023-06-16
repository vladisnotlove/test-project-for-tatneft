import React from "react";
import { styled } from "@mui/material";
import { ArticleModel } from "@/api/articles/models";
import ArticleCard from "@/components/ArticleCard";

type ArticleListProps = {
	className?: string,
	children?: React.ReactNode,
}

const ArticleList: React.FC<ArticleListProps> = (
	{
		className,
	}
) => {
	const articles: ArticleModel[] = new Array(20).fill(0).map((_item, index) => ({
		id: index,
		theme: "игры",
		author: "Николаев Владислав",
		title: "Заголовок статьи о том-то",
		shortText: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру ",
		text: "Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.\n\nПо своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
		publishDate: new Date(2023, 5, 10).getTime(),
		commentsCount: 22,
	}))

	return <Root className={className}>
		<FiltersContainer>
			filters
		</FiltersContainer>
		<ArticlesContainer>
			{articles.map(article => (
				<ArticleCard
					key={article.id}
					article={article}
				/>
			))}
		</ArticlesContainer>
		<ActionsContainer>
			actions
		</ActionsContainer>
	</Root>;
};

const Root = styled("div")`
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-areas: 
	"filters articles actions";
  gap: ${p => p.theme.spacing(5)};
  padding: ${p => p.theme.spacing(4, 2.5)};
`

const FiltersContainer = styled("div")`
  grid-area: filters;
`

const ArticlesContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-area: articles;
  gap: ${p => p.theme.spacing(3)}
`

const ActionsContainer = styled("div")`
  grid-area: actions;
`

export default ArticleList;
