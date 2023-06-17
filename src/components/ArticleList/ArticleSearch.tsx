import React, { useState } from "react";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, styled, TextField } from "@mui/material";

type ArticleSearchProps = {
	className?: string,
	children?: React.ReactNode,
	onSubmit: (searchText: string) => void,
}

const ArticleSearch: React.FC<ArticleSearchProps> = (
	{
		className,
		onSubmit,
	}
) => {
	const [value, setValue] = useState("");

	return <Root
		className={className}
		onSubmit={(e) => {
			e.preventDefault();
			onSubmit(value);
		}}
	>
		<TextField
			value={value}
			onChange={(event) => {
				setValue(event.target.value);
			}}

			label={"Поиск"}
			variant={"filled"}
			placeholder={"Тема или заголовок"}
			InputProps={{
				endAdornment: <InputAdornment position={"end"}>
					{value &&
						<IconButton
							onClick={() => {
								setValue("");
								onSubmit("");
							}}
						>
							<Close/>
						</IconButton>
					}
				</InputAdornment>
			}}
		/>
		<Button
			sx={{
				minWidth: "fit-content"
			}}
			variant={"contained"}
			size={"small"}
			onClick={() => {
				onSubmit(value);
			}}
		>
			<SearchIcon/>
		</Button>
	</Root>;
};

const Root = styled("form")`
  display: flex;
  flex-direction: row;
  gap: ${p => p.theme.spacing(0.5)};
`;


export default ArticleSearch;
