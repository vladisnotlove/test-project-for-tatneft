import React, { useState } from "react";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, styled, TextField } from "@mui/material";

type ArticleSearchProps = {
	className?: string,
	children?: React.ReactNode,
	onSubmit: (searchText: string) => void,
	defaultValue?: string,
	enableClear?: boolean,
}

const ArticleSearch: React.FC<ArticleSearchProps> = (
	{
		className,
		onSubmit,
		defaultValue,
		enableClear,
	}
) => {
	const [value, setValue] = useState(defaultValue);

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
					{enableClear &&
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
			type={"submit"}
			disabled={!value.trim()}
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
