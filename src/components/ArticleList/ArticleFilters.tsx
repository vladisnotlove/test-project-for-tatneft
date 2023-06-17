import React, { useRef } from "react";
import { Autocomplete, Button, styled, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "effector-react";
import dayjs, { Dayjs } from "dayjs";
import { $authors, $themes } from "@/components/App/state";
import { DatePicker } from "@mui/x-date-pickers";

export type FormValues = {
	themes: string[],
	authors: string[],
	publishDate: number | null,
}

const defaultValues: FormValues = {
	authors: [],
	themes: [],
	publishDate: null,
}

type ArticleFiltersProps = {
	className?: string,
	children?: React.ReactNode,
	onSubmit: (data: FormValues) => void
}

const ArticleFilters: React.FC<ArticleFiltersProps> = (
	{
		className,
		onSubmit,
	}
) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const themes = useStore($themes);
	const authors = useStore($authors);
	const {
		handleSubmit,
		control,
		reset,
	} = useForm<FormValues>({
		defaultValues: defaultValues,
		mode: "onChange"
	});

	const triggerSubmit = () => {
		buttonRef.current.click();
	}

	return <Root
		className={className}
		onSubmit={handleSubmit(onSubmit)}
	>
		<Controller
			control={control}
			name={"themes"}
			render={({field, fieldState}) => {
				return <Autocomplete<string, true>
					value={field.value || []}
					onChange={(_event, value) => {
						field.onChange(value)
						triggerSubmit();
					}}

					multiple
					options={themes}
					filterSelectedOptions
					renderInput={(params) => <TextField
						{...params}
						label="Темы"
						name={"themes"}
						variant={"filled"}
						placeholder="Выбрать тему"
						autoComplete={"off"}
						size={"small"}
					/>}
				/>
			}}
		/>
		<Controller
			control={control}
			name={"authors"}
			render={({field, fieldState}) => {
				return <Autocomplete<string, true>
					value={field.value || []}
					onChange={(_event, value) => {
						field.onChange(value);
						triggerSubmit();
					}}

					multiple
					options={authors}
					filterSelectedOptions
					renderInput={(params) => <TextField
						{...params}
						label="Авторы"
						name={"authors"}
						variant={"filled"}
						placeholder="Выбрать автора"
						autoComplete={"off"}
						size={"small"}
					/>}
				/>
			}}
		/>
		<Controller
			control={control}
			name={"publishDate"}
			render={({field, fieldState}) => {
				return <DatePicker<Dayjs>
					onChange={value => {
						const formValue = value === null ? null : value.toDate().getTime();
						field.onChange(formValue);
						triggerSubmit();
					}}
					value={field.value === null ? null : dayjs(field.value)}

					label={"Дата публикация"}
					slotProps={{
						actionBar: {
							actions: ['clear'],
						},
						textField: {
							variant: "filled",
							helperText: fieldState.error?.message,
							error: !!fieldState.error?.message,
							size: "small",
						}
					}}
					format={"DD/MM/YYYY"}
				/>
			}}
		/>
		<Actions>
			<Button
				sx={{
					display: "none"
				}}
				ref={buttonRef}
				variant={"contained"}
				type={"submit"}
			>
				Применить фильтры
			</Button>
			<Button
				variant={"contained"}
				type={"button"}
				onClick={() => {
					reset();
					onSubmit(defaultValues)
				}}
			>
				Сбросить
			</Button>
		</Actions>
	</Root>;
};

const Root = styled("form")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(2)};
`

const Actions = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(1)};
  margin-top: ${p => p.theme.spacing(1)};
`

export default ArticleFilters;
